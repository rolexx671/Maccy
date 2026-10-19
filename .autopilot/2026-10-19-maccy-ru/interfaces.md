# Границы и правила

## Правила проекта
- Swift: отступ 2 пробела, SwiftLint (`.swiftlint.yml`). Стиль окружающего кода.
- Локализуемые строки: ключ — английский текст; добавлять в `en.lproj` и `ru.lproj` одной парой. Остальные языки не трогать.
- Bundle ID, имя приложения, схема `Maccy` не меняются.
- Секреты не нужны.

## Границы, решённые в спецификации
| Модуль | Владеет | Отдаёт |
|---|---|---|
| Язык (ранняя точка запуска, `MaccyApp`) | запись `AppleLanguages=["ru"]` в домен приложения | — |
| Intents | тексты команд | ключи в `Maccy/en.lproj/Localizable.strings` и `Maccy/ru.lproj/Localizable.strings` |
| Обновления (`SoftwareUpdater.swift`, `GeneralSettingsPane.swift`, Info.plist) | отключение Sparkle | — |
| Сборка (`scripts/build-dmg.sh`) | `build/Maccy.app`, `build/Maccy-ru-<версия>.dmg` | команда `./scripts/build-dmg.sh` |
| Документация | `README.md`, `docs/`, `INSTALL.ru.md`, `Designs/Copies.txt`, `.github/ISSUE_TEMPLATE/` | — |

## Что построили завершённые таски

## Стек и команды
- Swift / SwiftUI, Xcode 27.1, macOS 14.0+, схема `Maccy`, SPM-пакеты (Sparkle, Defaults, KeyboardShortcuts, Settings).
- Проверка: `xcodebuild -project Maccy.xcodeproj -scheme Maccy -configuration Release CODE_SIGN_IDENTITY=- DEVELOPMENT_TEAM= build` (+ `swiftlint` по изменённым файлам, если установлен — ставить можно: `brew install swiftlint`).
- Подписи Developer ID на машине нет — только ad-hoc (`-`).
- Не трогать: переводы на другие языки, bundle id, `LICENSE`, `appcast.xml`, `.autopilot/`, `AGENTS.md`, `CLAUDE.md`, `.gitignore`.
