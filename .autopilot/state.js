window.STATE =
{
  "version": 2,
  "slug": "maccy-ru",
  "dir": "2026-10-19-maccy-ru--wip",
  "title": "Maccy на русском + DMG",
  "mode": "semi",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-19-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "/Users/alex/.claude/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-19T23:15:30+03:00",
  "updatedAt": "2026-10-19T23:27:34+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-19T23:15:30+03:00",
      "finishedAt": "2026-10-19T23:18:06+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-19T23:18:06+03:00",
      "finishedAt": "2026-10-19T23:18:06+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-19T23:18:06+03:00",
      "finishedAt": "2026-10-19T23:20:17+03:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-19T23:20:17+03:00",
      "finishedAt": "2026-10-19T23:27:02+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-10-19T23:27:02+03:00"
    },
    {
      "id": "build",
      "status": "pending"
    },
    {
      "id": "review",
      "status": "pending"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 14,
    "done": 4,
    "inTicket": 10,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Приложение всегда по-русски, без автообновления, собирается в DMG",
      "requirements": [
        "R03",
        "R04",
        "R06",
        "R09i",
        "R10i",
        "R11i",
        "G01"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "Maccy/",
        "Maccy.xcodeproj/",
        "scripts/"
      ],
      "review": "нет",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Документация по-русски и инструкция по установке и настройке",
      "requirements": [
        "R05",
        "R07",
        "R08"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "README.md",
        "docs/",
        "Designs/Copies.txt",
        ".github/ISSUE_TEMPLATE/",
        "INSTALL.ru.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    }
  ],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 2,
    "fixed": 1,
    "deferred": 1,
    "items": [
      "«все что там есть» — комментарии в коде, логи, LICENSE, appcast, бинарные макеты не переводятся; сказано в отчёте"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-19T23:15:30+03:00",
    "2026-10-19T23:18:06+03:00",
    "2026-10-19T23:20:14+03:00",
    "2026-10-19T23:20:17+03:00",
    "2026-10-19T23:27:02+03:00",
    "2026-10-19T23:27:26+03:00",
    "2026-10-19T23:27:34+03:00"
  ],
  "rev": 15,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-10-19T23:18:06+03:00",
      "to": "2026-10-19T23:20:14+03:00"
    }
  ],
  "log": [
    {
      "t": "2026-10-19T23:15:30+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-19T23:18:06+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:18:06+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:18:06+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "4 вопроса — язык, автообновление, README, публикация"
    },
    {
      "t": "2026-10-19T23:20:14+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-19T23:20:17+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 9,
      "total": 13
    },
    {
      "t": "2026-10-19T23:20:17+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:27:02+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 2,
      "fixed": 1,
      "deferred": 1
    },
    {
      "t": "2026-10-19T23:27:02+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:27:26+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-19T23:27:26+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-19T23:27:26+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 1
    },
    {
      "t": "2026-10-19T23:27:34+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-19T23:27:34+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«установи скил https://github.com/nick-vels/skills»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«создай форк этого проекта»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«переведи на русский язык все что там есть» — интерфейс приложения",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«переведи на русский язык все что там есть» — команды Shortcuts (Intents)",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«переведи на русский язык все что там есть» — документация (README, docs)",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«упакуй в dmg»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«дай инструкцию по установке»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«и настройке»",
      "status": "in-ticket"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) приложение показывается по-русски у пользователя",
      "status": "in-ticket"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) автообновление не затирает русский форк оригиналом",
      "status": "in-ticket"
    },
    {
      "id": "R11i",
      "text": "(подразумевается) DMG открывается без Apple Developer ID",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«Node.js - установи»",
      "status": "done"
    },
    {
      "id": "R13",
      "text": "«пропиши это глобально в память»",
      "status": "done"
    },
    {
      "id": "G01",
      "text": "«push в форк, DMG локально без релиза» (ответ «ок»)",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-19T23:20:17+03:00",
      "open": 9,
      "total": 13
    },
    "G2": {
      "ok": true,
      "at": "2026-10-19T23:27:02+03:00",
      "found": 2,
      "fixed": 1,
      "deferred": 1
    },
    "G3": {
      "ok": true,
      "at": "2026-10-19T23:27:34+03:00",
      "problems": 0
    }
  },
  "result": null
}
