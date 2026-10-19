window.STATE =
{
  "version": 2,
  "slug": "maccy-ru",
  "dir": "2026-10-19-maccy-ru",
  "title": "Maccy на русском + DMG",
  "mode": "semi",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-19-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "/Users/alex/.claude/skills/autopilot",
  "baseCommit": "42cc6e0",
  "startedAt": "2026-10-19T23:15:30+03:00",
  "updatedAt": "2026-10-19T23:44:38+03:00",
  "finishedAt": "2026-10-19T23:44:38+03:00",
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
      "status": "done",
      "startedAt": "2026-10-19T23:27:02+03:00",
      "finishedAt": "2026-10-19T23:27:45+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-19T23:27:45+03:00",
      "finishedAt": "2026-10-19T23:35:05+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-19T23:35:05+03:00",
      "finishedAt": "2026-10-19T23:41:00+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-19T23:41:00+03:00",
      "finishedAt": "2026-10-19T23:44:38+03:00"
    }
  ],
  "requirements": {
    "total": 14,
    "done": 14,
    "inTicket": 0,
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
      "status": "done",
      "startedAt": "2026-10-19T23:27:45+03:00",
      "finishedAt": "2026-10-19T23:35:05+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "Intents на английской macOS — по-английски; нужны русские значения в en.lproj для ключей Intents"
      ],
      "tests": {
        "passed": 1,
        "failed": 0
      },
      "commit": "05f2e1b"
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
      "status": "done",
      "startedAt": "2026-10-19T23:27:45+03:00",
      "finishedAt": "2026-10-19T23:30:29+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 22,
        "failed": 0
      },
      "commit": "9ffc7da"
    },
    {
      "id": "F1",
      "title": "Правки по код-ревью ветки",
      "requirements": [
        "R06",
        "R09i",
        "R07"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "scripts/",
        "MaccyUITests/",
        "Maccy/MaccyApp.swift",
        "INSTALL.ru.md"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-19T23:38:04+03:00",
      "finishedAt": "2026-10-19T23:41:00+03:00",
      "tests": {
        "passed": 1,
        "failed": 0
      },
      "commit": "4e49576"
    }
  ],
  "tests": {
    "passed": 1,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [
      "Bundle ID org.p0deje.Maccy сохранён — нельзя держать рядом оригинальный Maccy"
    ],
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
  "concerns": [
    "INSTALL.ru.md — пути в Системных настройках macOS 27 не сверены на живой системе",
    "INSTALL.ru.md — раздел «Быстрые команды» сверить с ru-строками таска 01",
    "Hardened runtime выключен в DMG-сборке — ad-hoc подпись несовместима с Sparkle.framework",
    "Sparkle слинкован, но не запускается; mach-lookup исключения в entitlements оставлены"
  ],
  "blind": {
    "checked": 13,
    "matched": 11,
    "mismatches": [
      "G01 push в форк — ещё не сделан, делается при сдаче",
      "R01 источник скилла не виден в файлах — установлен npx skills add nick-vels/skills, копия без .git"
    ]
  },
  "beats": [
    "2026-10-19T23:15:30+03:00",
    "2026-10-19T23:18:06+03:00",
    "2026-10-19T23:20:14+03:00",
    "2026-10-19T23:20:17+03:00",
    "2026-10-19T23:27:02+03:00",
    "2026-10-19T23:27:26+03:00",
    "2026-10-19T23:27:34+03:00",
    "2026-10-19T23:27:42+03:00",
    "2026-10-19T23:27:45+03:00",
    "2026-10-19T23:30:29+03:00",
    "2026-10-19T23:33:49+03:00",
    "2026-10-19T23:35:05+03:00",
    "2026-10-19T23:38:04+03:00",
    "2026-10-19T23:40:13+03:00",
    "2026-10-19T23:41:00+03:00",
    "2026-10-19T23:43:43+03:00",
    "2026-10-19T23:44:38+03:00"
  ],
  "rev": 34,
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
    },
    {
      "t": "2026-10-19T23:27:45+03:00",
      "k": "stage",
      "id": "build",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:27:45+03:00",
      "k": "ticket",
      "ids": [
        "01",
        "02"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-19T23:30:29+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done",
      "tests": {
        "passed": 22,
        "failed": 0
      }
    },
    {
      "t": "2026-10-19T23:30:29+03:00",
      "k": "add",
      "key": "concerns",
      "n": 2
    },
    {
      "t": "2026-10-19T23:33:49+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "repair",
      "note": "Intents на английской macOS — по-английски; нужны русские значения в en.lproj для ключей Intents"
    },
    {
      "t": "2026-10-19T23:35:05+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 1,
        "failed": 0
      }
    },
    {
      "t": "2026-10-19T23:35:05+03:00",
      "k": "add",
      "key": "concerns",
      "n": 2
    },
    {
      "t": "2026-10-19T23:35:05+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-19T23:35:05+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:38:04+03:00",
      "k": "tickets",
      "n": 3
    },
    {
      "t": "2026-10-19T23:38:04+03:00",
      "k": "add",
      "key": "report",
      "n": 5
    },
    {
      "t": "2026-10-19T23:38:04+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-19T23:40:13+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-19T23:41:00+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 1,
        "failed": 0
      }
    },
    {
      "t": "2026-10-19T23:41:00+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:43:43+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 13,
      "matched": 11
    },
    {
      "t": "2026-10-19T23:44:38+03:00",
      "k": "tests",
      "passed": 1,
      "failed": 0
    },
    {
      "t": "2026-10-19T23:44:38+03:00",
      "k": "finish",
      "result": "Maccy всегда по-русски, без автообновления, DMG Maccy-ru-2.7.1.dmg, инструкция INSTALL.ru.md"
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
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«переведи на русский язык все что там есть» — команды Shortcuts (Intents)",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«переведи на русский язык все что там есть» — документация (README, docs)",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«упакуй в dmg»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«дай инструкцию по установке»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«и настройке»",
      "status": "done"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) приложение показывается по-русски у пользователя",
      "status": "done"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) автообновление не затирает русский форк оригиналом",
      "status": "done"
    },
    {
      "id": "R11i",
      "text": "(подразумевается) DMG открывается без Apple Developer ID",
      "status": "done"
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
      "status": "done"
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
    },
    "G4": {
      "ok": false,
      "at": "2026-10-19T23:43:43+03:00",
      "checked": 13,
      "matched": 11
    }
  },
  "result": "Maccy всегда по-русски, без автообновления, DMG Maccy-ru-2.7.1.dmg, инструкция INSTALL.ru.md",
  "report": [
    "Hardened runtime в DMG-сборке выключен: без платной подписи Apple с ним приложение не запускается",
    "В песочнице остались разрешения для служб обновления Sparkle — они не запускаются, риск ничтожный",
    "Пути в «Системных настройках» в инструкции не сверены на живой macOS 27",
    "Язык ru записан в настройки приложения: если вернуться к оригинальному Maccy, он тоже останется русским, пока не удалить ~/Library/Containers/org.p0deje.Maccy",
    "Быстрые команды на macOS с языком не en и не ru (например, украинском) покажут названия действий по-английски"
  ]
}
