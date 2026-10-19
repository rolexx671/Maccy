<!-- autopilot:start -->
# Maccy (русский форк)

## Команды

- `./scripts/build-dmg.sh` — `build/Maccy.app` (ad-hoc) и `build/Maccy-ru-2.7.1.dmg`, ~45 с
- `xcodebuild -project Maccy.xcodeproj -scheme Maccy -configuration Release CODE_SIGN_IDENTITY=- DEVELOPMENT_TEAM= build` — проверка сборки
- `xcodebuild -project Maccy.xcodeproj -scheme Maccy -configuration Debug CODE_SIGN_IDENTITY=- DEVELOPMENT_TEAM= build-for-testing` — собрать тесты (прогон не проверялся)

## Где что

- `Maccy/MaccyApp.swift` — точка входа, принудительный язык `ru` в `init()`
- `Maccy/AppDelegate.swift` — запуск, панель, статус-айтем
- `Maccy/Observables/` — состояние (`AppState`, `History`); `Maccy/Storage.swift` — SwiftData в `~/Library/Application Support/Maccy/Storage.sqlite` (внутри контейнера песочницы)
- `Maccy/Intents/` — Быстрые команды; `Maccy/Views/`, `Maccy/Settings/` — SwiftUI-экраны
- `Maccy/<язык>.lproj/Localizable.strings` — строки; свои есть также в `Views/` и `Settings/`
- `MaccyTests/`, `MaccyUITests/` — тесты; `Maccy.xctestplan` — план
- `INSTALL.ru.md` — установка для пользователя; `scripts/build-dmg.sh` — вся сборка DMG

## Подводные камни

- Язык `ru` пишется в `AppleLanguages` в `MaccyApp.init`, кроме запуска с аргументом `-AppleLanguages` (так делают UI-тесты, `MaccyUITests/MaccyUITests.swift`)
- В `Maccy/en.lproj/Localizable.strings` ключи Intents намеренно с русскими значениями: Быстрые команды берут язык системы
- Новая строка — пара `en.lproj` + `ru.lproj` в одном месте; остальные языки не трогать
- В `build-dmg.sh` выключены hardened runtime (иначе dyld не грузит `Sparkle.framework` при ad-hoc) и `get-task-allow`; не возвращать
- Sparkle слинкован, но обновления отключены (`SUEnableAutomaticChecks=false` в `Maccy/Info.plist`); `SoftwareUpdater` удалён, `SPUUpdater` остался только в `#if DEBUG` для тестов
- Bundle id `org.p0deje.Maccy` общий с оригиналом: тот же контейнер `~/Library/Containers/org.p0deje.Maccy`, история и настройки смешиваются
- Developer ID нет: только ad-hoc, при установке Gatekeeper ругается (см. `INSTALL.ru.md`)
- Не трогать: `appcast.xml`, `LICENSE`, `.autopilot/`, `AGENTS.md`/`CLAUDE.md` вне меток; `build/` в `.gitignore`

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Требование из `manifest.md` может снять
только пользователь. Прерванную сборку продолжает «продолжи автопилот».

### Правка без автопилота

Мелкий баг или доводка после сборки — обычная сессия, без прогона.

Сначала прочитай:
1. `.autopilot/PROGRESS.md` — что не доделано, известные баги, о чём договорились с пользователем.
2. Что правили после последней сборки — первая строка таблицы в «История git».
3. Только если правка их касается: почему сделано так — `docs/adr/`; что значат слова — `CONTEXT.md`;
   что именно просили — `manifest.md` в папке сборки (указана в начале `PROGRESS.md`).

После правки:
- коммит — по правилам из «История git»;
- строка в «Правки без автопилота» в `PROGRESS.md`: дата — что — почему;
- починенный пункт из «Не доделано» или «Известные баги» — удали;
- договорились с пользователем о том, что следующая сборка не должна пересматривать, —
  строка в «Договорились», его словами.

### История git

Целиком не читай — бери срез под вопрос:

| Вопрос | Команда |
|---|---|
| что правили после последней сборки | `git log --oneline "$(git log -1 --format=%h --grep='^Autopilot: сборка сдана')"..HEAD -- . ':(exclude).autopilot'` |
| всё, что делали ради требования | `git log --oneline --grep="R02"` |
| история файла | `git log --oneline -10 -- <файл>` |
| когда появился или исчез код | `git log --oneline -S "<фрагмент>"` |
| почему строка такая | `git blame -L <с>,<по> <файл>`, затем `git show <sha>` |
| что внутри коммита | `git show --stat <sha>` |

Срез длиннее ~30 коммитов — отдай его субагенту и возьми выжимку в десять строк.

Коммит: заголовок — что (`fix: даты в одном формате`), тело — почему, трейлер
`--trailer "Requirements: R02"`, если правка касается требования из `manifest.md`.
Заголовок `Autopilot: сборка сдана` пишет только автопилот — по нему находят последнюю сборку.
<!-- autopilot:end -->
