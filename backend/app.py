import csv
import io
import json
import os
import sqlite3
from datetime import datetime
from functools import wraps

from flask import (Flask, jsonify, redirect, render_template, request,
                   send_file, session, url_for)
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "raz-stacey-secret-key-2024")

# Allow React dev server on any localhost port
CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
], supports_credentials=True)

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "stacey2024")
DB_PATH = os.environ.get(
    "RAZ_DB_PATH",
    os.path.join(os.path.dirname(__file__), "submissions.db"),
)


# ── Database ─────────────────────────────────────────────────────────────────

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS submissions (
            id             INTEGER PRIMARY KEY AUTOINCREMENT,
            submitted_at   TEXT,
            student_name   TEXT,
            level_id       TEXT,
            score          INTEGER,
            correct_count  INTEGER,
            wrong_questions TEXT,
            passed         INTEGER,
            weak_skills    TEXT,
            fiction_wrong  INTEGER,
            nonfiction_wrong INTEGER,
            notes          TEXT,
            created_at     TEXT DEFAULT (datetime('now','localtime'))
        )
    """)
    existing_columns = {
        row["name"] for row in conn.execute("PRAGMA table_info(submissions)").fetchall()
    }
    if "duration_seconds" not in existing_columns:
        conn.execute("ALTER TABLE submissions ADD COLUMN duration_seconds INTEGER")
    if "duration_text" not in existing_columns:
        conn.execute("ALTER TABLE submissions ADD COLUMN duration_text TEXT")
    conn.commit()
    conn.close()


# ── Auth helper ───────────────────────────────────────────────────────────────

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated


# ── API (called by React frontend) ────────────────────────────────────────────

@app.route("/api/submit", methods=["POST"])
def api_submit():
    data = request.get_json(silent=True) or {}
    conn = get_db()
    conn.execute("""
        INSERT INTO submissions
          (submitted_at, student_name, level_id, score, correct_count,
           wrong_questions, passed, weak_skills, fiction_wrong, nonfiction_wrong,
           duration_seconds, duration_text, notes)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        data.get("submittedAt"),
        data.get("studentName"),
        data.get("levelId"),
        data.get("score"),
        data.get("correctCount"),
        json.dumps(data.get("wrongQuestions", []), ensure_ascii=False),
        1 if data.get("passed") else 0,
        json.dumps(data.get("weakSkills", []), ensure_ascii=False),
        data.get("fictionWrong", 0),
        data.get("nonfictionWrong", 0),
        data.get("durationSeconds"),
        data.get("durationText"),
        data.get("notes", ""),
    ))
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


# ── Admin login / logout ───────────────────────────────────────────────────────

@app.route("/admin/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        if request.form.get("password") == ADMIN_PASSWORD:
            session["logged_in"] = True
            return redirect(url_for("admin"))
        error = "密码错误，请重试"
    return render_template("login.html", error=error)


@app.route("/admin/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ── Admin dashboard ────────────────────────────────────────────────────────────

@app.route("/admin")
@login_required
def admin():
    level  = request.args.get("level", "")
    search = request.args.get("search", "")
    sort   = request.args.get("sort", "created_at")
    order  = request.args.get("order", "desc")

    ALLOWED_SORTS = {"created_at", "score", "correct_count", "student_name", "submitted_at"}
    if sort not in ALLOWED_SORTS:
        sort = "created_at"
    if order not in ("asc", "desc"):
        order = "desc"

    sql = "SELECT * FROM submissions WHERE 1=1"
    params = []
    if level:
        sql += " AND level_id = ?"
        params.append(level)
    if search:
        sql += " AND student_name LIKE ?"
        params.append(f"%{search}%")
    sql += f" ORDER BY {sort} {order.upper()}"

    conn = get_db()
    rows = [dict(r) for r in conn.execute(sql, params).fetchall()]
    levels = [r[0] for r in conn.execute(
        "SELECT DISTINCT level_id FROM submissions ORDER BY level_id"
    ).fetchall()]

    # Stats
    all_rows = [dict(r) for r in conn.execute("SELECT score, passed FROM submissions").fetchall()]
    conn.close()

    for r in rows:
        r["wrong_questions"] = json.loads(r["wrong_questions"] or "[]")
        r["weak_skills"]     = json.loads(r["weak_skills"] or "[]")

    total      = len(all_rows)
    avg_score  = round(sum(r["score"] for r in all_rows) / total, 1) if total else 0
    pass_count = sum(1 for r in all_rows if r["passed"])
    pass_rate  = round(pass_count / total * 100, 1) if total else 0

    return render_template("admin.html",
        rows=rows, levels=levels,
        current_level=level, search=search, sort=sort, order=order,
        total=total, avg_score=avg_score, pass_rate=pass_rate,
    )


# ── Export CSV ─────────────────────────────────────────────────────────────────

@app.route("/admin/export")
@login_required
def export_csv():
    level  = request.args.get("level", "")
    search = request.args.get("search", "")

    sql = "SELECT * FROM submissions WHERE 1=1"
    params = []
    if level:
        sql += " AND level_id = ?"
        params.append(level)
    if search:
        sql += " AND student_name LIKE ?"
        params.append(f"%{search}%")
    sql += " ORDER BY created_at DESC"

    conn = get_db()
    rows = conn.execute(sql, params).fetchall()
    conn.close()

    output = io.StringIO()
    w = csv.writer(output)
    w.writerow(["提交时间","微信名","级别","分数","答对题数","用时","错题","是否通过","薄弱能力","虚构错题","非虚构错题","备注"])
    for r in rows:
        wq = json.loads(r["wrong_questions"] or "[]")
        ws = json.loads(r["weak_skills"] or "[]")
        w.writerow([
            r["submitted_at"], r["student_name"], r["level_id"],
            r["score"], r["correct_count"],
            r["duration_text"] or "",
            " ".join(f"Q{q['id']}" for q in wq),
            "通过" if r["passed"] else "未通过",
            " / ".join(ws),
            r["fiction_wrong"], r["nonfiction_wrong"],
            r["notes"] or "",
        ])

    buf = io.BytesIO(("﻿" + output.getvalue()).encode("utf-8"))
    fname = f"RAZ测试记录_{datetime.now().strftime('%Y%m%d')}.csv"
    return send_file(buf, mimetype="text/csv", as_attachment=True, download_name=fname)


# ── Delete record ──────────────────────────────────────────────────────────────

@app.route("/admin/delete/<int:rid>", methods=["POST"])
@login_required
def delete_record(rid):
    conn = get_db()
    conn.execute("DELETE FROM submissions WHERE id = ?", (rid,))
    conn.commit()
    conn.close()
    return redirect(request.referrer or url_for("admin"))


# ── Clear all ──────────────────────────────────────────────────────────────────

@app.route("/admin/clear", methods=["POST"])
@login_required
def clear_all():
    conn = get_db()
    conn.execute("DELETE FROM submissions")
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


# ── Entry point ────────────────────────────────────────────────────────────────

init_db()

if __name__ == "__main__":
    print("\n✅ RAZ 后台已启动")
    print("   管理员入口: http://localhost:8000/admin/login")
    print("   默认密码:   stacey2024  (可在启动前设置环境变量 ADMIN_PASSWORD 修改)\n")
    app.run(host="0.0.0.0", port=8000, debug=True)
