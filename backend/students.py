"""学员总览：把问卷（sales 后端的库）和测试成绩（本库）按人合并。

一个人 = 同一个手机号的问卷（没有手机号时按微信名）。
测试成绩挂到人的顺序：
  1. 提交时带了 survey_id（从问卷链接进来）→ 精确挂到那份问卷的人；
  2. 否则按微信名（去空格、忽略大小写）匹配问卷里的名字；
  3. 都对不上 → 单独算一个「只做了测试」的人（按名字）。
"""
import json
import os
import re
import sqlite3

SALES_DB_PATH = os.environ.get("SALES_DB_PATH", "/opt/vocabfun/sales/submissions.db")

TEST_TYPE_LABELS = {"upgrade": "阅读", "placement": "插班", "listening": "听力"}

# 问卷字段顺序与中文名（raw_json 的 key）
SURVEY_FIELDS = [
    ("name", "微信名"),
    ("phone", "手机号"),
    ("grade", "孩子年级"),
    ("years", "英语启蒙年数"),
    ("schoolStart", "校内英语起点"),
    ("listening", "听看过的资源"),
    ("reading", "能自己认读的书"),
    ("readingMode", "认读方式"),
    ("raz", "RAZ 情况"),
    ("razSelfLevel", "RAZ 最高级别"),
    ("razMethod", "RAZ 阅读方式"),
    ("institution", "其他机构"),
    ("instDetail", "机构教材"),
    ("exams", "考试情况"),
    ("dailyTime", "每天可打卡时间"),
    ("goals", "阅读目标"),
    ("parentTime", "家长时间"),
    ("needs", "希望解决"),
    ("channel", "了解渠道"),
]

# 旧数据 raw_json 为空时，从表字段兜底
COLUMN_FALLBACK = {
    "name": "name", "phone": "phone", "grade": "grade", "years": "years",
    "listening": "listening", "reading": "reading", "raz": "raz",
    "institution": "institution", "instDetail": "inst_detail", "exams": "exams",
    "goals": "goals", "dailyTime": "daily_time", "parentTime": "parent_time",
    "needs": "needs", "channel": "channel",
}


def norm_name(name):
    return re.sub(r"\s+", "", str(name or "")).lower()


def norm_phone(phone):
    digits = re.sub(r"\D", "", str(phone or ""))
    return digits if len(digits) >= 7 else ""


def open_sales_db():
    """只读打开问卷库；不存在（如本地开发）时返回 None。"""
    if not os.path.exists(SALES_DB_PATH):
        return None
    conn = sqlite3.connect(f"file:{SALES_DB_PATH}?mode=ro", uri=True)
    conn.row_factory = sqlite3.Row
    return conn


def survey_answers(row):
    """一份问卷 → [(中文题目, 答案)]"""
    try:
        raw = json.loads(row["raw_json"] or "{}")
    except (TypeError, ValueError):
        raw = {}
    answers = []
    for key, label in SURVEY_FIELDS:
        value = raw.get(key)
        if value in (None, "") and key in COLUMN_FALLBACK:
            value = row[COLUMN_FALLBACK[key]]
        if value in (None, "", False):
            continue
        answers.append((label, str(value)))
    return answers


def load_surveys():
    conn = open_sales_db()
    if conn is None:
        return []
    try:
        rows = conn.execute("SELECT * FROM submissions ORDER BY created_at, id").fetchall()
    finally:
        conn.close()
    return [dict(r) for r in rows]


def load_survey(sid):
    conn = open_sales_db()
    if conn is None:
        return None
    try:
        row = conn.execute("SELECT * FROM submissions WHERE id = ?", (sid,)).fetchone()
    finally:
        conn.close()
    return dict(row) if row else None


def _test_summary(t):
    if not t:
        return None
    label = TEST_TYPE_LABELS.get(t.get("test_type") or "upgrade", "阅读")
    return {"score": t["score"], "level": t["level_id"], "label": label, "at": t["created_at"]}


def build_students(test_rows):
    """test_rows: 本库 submissions（dict，已按 created_at 升序）。返回按最近活动倒序的人列表。"""
    people = {}
    survey_owner = {}   # survey id → person key
    name_owner = {}     # 规范化微信名 → person key（后填的问卷覆盖先填的）

    for s in load_surveys():
        phone = norm_phone(s.get("phone"))
        key = f"p{phone}" if phone else f"n{norm_name(s.get('name'))}"
        p = people.setdefault(key, {"key": key, "surveys": [], "tests": []})
        p["surveys"].append(s)
        survey_owner[s["id"]] = key
        if norm_name(s.get("name")):
            name_owner[norm_name(s.get("name"))] = key

    for t in test_rows:
        key = None
        sid = t.get("survey_id")
        if sid and sid in survey_owner:
            key = survey_owner[sid]
        elif norm_name(t.get("student_name")) in name_owner:
            key = name_owner[norm_name(t.get("student_name"))]
        else:
            key = f"t{norm_name(t.get('student_name'))}"
            people.setdefault(key, {"key": key, "surveys": [], "tests": []})
        people[key]["tests"].append(t)

    result = []
    for p in people.values():
        latest_survey = p["surveys"][-1] if p["surveys"] else None
        reading = [t for t in p["tests"] if (t.get("test_type") or "upgrade") != "listening"]
        listening = [t for t in p["tests"] if t.get("test_type") == "listening"]
        times = [s.get("created_at") or "" for s in p["surveys"]] + [t.get("created_at") or "" for t in p["tests"]]
        p.update({
            "name": (latest_survey or {}).get("name") or (p["tests"][-1]["student_name"] if p["tests"] else ""),
            "phone": (latest_survey or {}).get("phone") or "",
            "grade": (latest_survey or {}).get("grade") or "",
            "latest_survey": latest_survey,
            "reading_latest": _test_summary(reading[-1] if reading else None),
            "reading_count": len(reading),
            "listening_latest": _test_summary(listening[-1] if listening else None),
            "listening_count": len(listening),
            "last_active": max(times) if times else "",
        })
        result.append(p)

    result.sort(key=lambda p: p["last_active"], reverse=True)
    return result


def test_detail(t):
    """一条测试记录 → 详情页展示用的 dict。"""
    try:
        wrong = json.loads(t.get("wrong_questions") or "[]")
    except (TypeError, ValueError):
        wrong = []
    try:
        weak = json.loads(t.get("weak_skills") or "[]")
    except (TypeError, ValueError):
        weak = []
    wrong_items = []
    for q in wrong:
        if not isinstance(q, dict):
            continue
        answer = q.get("correctAnswer") or q.get("answer")
        wrong_items.append(f"Q{q.get('id')}" + (f"（正确 {answer}）" if answer else ""))
    return {
        **t,
        "type_label": TEST_TYPE_LABELS.get(t.get("test_type") or "upgrade", "阅读"),
        "wrong_items": wrong_items,
        "weak_skills_list": [str(w) for w in weak],
        "total": (t.get("correct_count") or 0) + len(wrong),
    }
