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


# ── 问卷导出（按「帮你定位原版英语阅读问题.xlsx」的列）─────────────────────────

MAIN_LEVELS = ["A", "D", "G", "K", "O"]

EXPORT_HEADER = [
    "报名", "分", "等级", "测试分数", "填写者", "Stacey备注", "提交时间", "年级", "手机号",
    "启蒙时间", "具体启蒙年数", "校内英语起点", "特殊起点时间", "听力能力", "认读能力",
    "是否读RAZ", "最高级别", "地区", "RAZ读法", "RAZ读法补充", "机构调查", "教材", "线上机构",
    "考级情况", "剑少级别", "KPF分数", "其他考级", "时间富余", "目标", "其他目标", "家长时间",
    "解决什么问题", "来源", "朋友营号", "来源补充",
    "A得分", "D得分", "G得分", "K得分", "O得分",
    # 模板之后追加：
    "R得分", "插班得分", "听力得分", "问卷预估级别", "阶段", "推荐测试", "问卷编号",
]
EXPORT_WIDTHS = [
    6.9, 4.3, 7.7, 10.3, 17.2, 17.2, 16.4, 13.8, 15.5, 13.8, 23.2, 13.8, 23.2, 23.2, 23.2,
    6.9, 14.6, 12.9, 18.9, 23.2, 18.1, 15.5, 24.1, 13.8, 13.8, 17.2, 23.2, 13.8, 25.0, 23.2,
    13.8, 18.9, 18.9, 23.2, 23.2, 13.8, 13.8, 13.8, 13.8, 13.8,
    13.8, 18.9, 13.8, 13.8, 13.8, 23.2, 10.0,
]


def _raw(s):
    try:
        return json.loads(s.get("raw_json") or "{}")
    except (TypeError, ValueError):
        return {}


def _latest_by(tests, pred):
    hits = [t for t in tests if pred(t)]
    return hits[-1] if hits else None


def survey_export_row(s, tests):
    """一份问卷 + 这个人的测试记录（按时间升序）→ 导出表的一行。"""
    raw = _raw(s)
    g = lambda k, col=None: raw.get(k) if raw.get(k) not in (None, "") else (s.get(col) if col else "")  # noqa: E731

    years = g("years", "years") or ""
    years_option = raw.get("yearsOption") or re.sub(r"（.*）$", "", years)

    raz_text = g("raz", "raz") or ""
    raz_level = str(raw.get("razSelfLevel") or "")
    has_level = bool(re.fullmatch(r"AA|[A-Z]", raz_level.strip().upper()))
    read_raz = "有" if has_level or raz_text.startswith("读过") else ("没有" if raz_text else "")

    methods = [m for m in str(raw.get("razMethod") or "").split("、") if m and m != "未选择"]
    method_main = "、".join("其他" if m.startswith("其他") else m for m in methods)
    method_note = "、".join(m.split(":", 1)[1] for m in methods if m.startswith("其他:"))

    exams = g("exams", "exams") or ""
    exam_type = raw.get("examType") or next(
        (k for k in ("剑少", "KET", "PET", "没有参加过", "其他") if exams.startswith(k)), exams)
    exam_levels = raw.get("examLevels") or (re.search(r"剑少（(.*?)）", exams) or [None, ""])[1]
    exam_other = raw.get("examOther") or (exams if exam_type == "其他" else "")

    parent_time = g("parentTime", "parent_time") or ""
    if raw.get("parentTimeNote"):
        parent_time += "：" + raw["parentTimeNote"]

    reading_tests = [t for t in tests if (t.get("test_type") or "upgrade") != "listening"]
    latest_reading = reading_tests[-1] if reading_tests else None
    test_summary = ""
    if latest_reading:
        label = TEST_TYPE_LABELS.get(latest_reading.get("test_type") or "upgrade", "阅读")
        test_summary = f"{latest_reading['level_id']}{label} {latest_reading['score']}"

    def upgrade_score(level):
        t = _latest_by(tests, lambda t: (t.get("test_type") or "upgrade") == "upgrade"
                       and str(t.get("level_id")).upper() == level)
        return t["score"] if t else ""

    def per_level(test_type):
        latest = {}
        for t in tests:
            if t.get("test_type") == test_type:
                latest[t["level_id"]] = t["score"]
        return "；".join(f"{lv}:{sc}" for lv, sc in latest.items())

    return [
        "", "", "", test_summary, g("name", "name"), "", s.get("created_at") or "",
        g("grade", "grade"), g("phone", "phone"),
        years_option, raw.get("yearsNumber") or "", raw.get("schoolStart") or "", "",
        g("listening", "listening"), g("reading", "reading"),
        read_raz, raz_level if has_level else "", "", method_main, method_note,
        g("institution", "institution"), g("instDetail", "inst_detail"), "",
        exam_type, exam_levels, raw.get("examScore") or "", exam_other,
        g("dailyTime", "daily_time"), g("goals", "goals"), "", parent_time,
        g("needs", "needs"), g("channel", "channel"), raw.get("channelFriend") or "", raw.get("channelNote") or "",
        *[upgrade_score(lv) for lv in MAIN_LEVELS],
        upgrade_score("R"), per_level("placement"), per_level("listening"),
        raw.get("reportRazLevel") or "", raw.get("reportStage") or "", raw.get("reportTests") or "",
        s.get("id"),
    ]


def survey_export_rows(people):
    """所有问卷，最新在上；同一个人的多份问卷各占一行，测试成绩共用。"""
    rows = []
    for p in people:
        for s in p["surveys"]:
            rows.append((s.get("created_at") or "", s.get("id") or 0, survey_export_row(s, p["tests"])))
    rows.sort(key=lambda r: (r[0], r[1]), reverse=True)
    return [r[2] for r in rows]


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
