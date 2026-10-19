# Заметки по Maccy (разведка перед русификацией)

Всё проверено чтением кода; полная сборка не запускалась. Пути относительно /Users/alex/Project/Maccy.

## 1. Где живёт локализация

- 44 каталога `*.lproj` в трёх местах, у каждого языка (en, ru, uk, de, ... zh-Hans, zh-Hant, pt-BR) один и тот же набор:
  - `Maccy/<lang>.lproj/Localizable.strings` — основной стол (меню-футер, подсказки, accessibility, алерт очистки).
  - `Maccy/Settings/<lang>.lproj/{General,Appearance,Storage,Ignore,Advanced,Pins}Settings.strings` — по таблице на панель.
  - `Maccy/Views/<lang>.lproj/PreviewItemView.strings`.
- Формат только legacy `.strings`. НЕТ `.xcstrings`, `InfoPlist.strings`, `.xib`, `.storyboard`, AppShortcuts. Сборка: `LOCALIZATION_PREFERS_STRING_CATALOGS=NO`, `SWIFT_EMIT_LOC_STRINGS=NO`.
- `knownRegions` в project.pbxproj:1021-1055 уже содержит `ru`. Development region = `en` (pbxproj:1019, Info.plist `CFBundleDevelopmentRegion`=en).
- Ключи в `.strings` — символические идентификаторы (`search_placeholder`, `PopupAtCursor`), не английский текст. Исключение: Intents (там ключ = английский текст, см. ниже).

Как Swift ссылается на строки (примеры):
- `NSLocalizedString("status_item_accessibility_label", comment: "")` — AppDelegate.swift:25, :27.
- `NSLocalizedString("PopupAtCursor", tableName: "AppearanceSettings", comment: "")` — PopupPosition.swift:17; аналогично SearchVisibility.swift:13, HighlightMatch.swift:15, Sorter.swift:17 (StorageSettings), PinsPosition.swift:13, Search.swift:17 (GeneralSettings).
- `Text("TurnOff", tableName: "AdvancedSettings")` — Settings/AdvancedSettingsPane.swift:8; так же во всех Settings/*Pane.swift и Settings/IgnoreSettingsPane/*.swift.
- `String(localized: "ActiveScreen", table: "AppearanceSettings")` — Settings/AppearanceSettingsPane.swift:242.
- `NSLocalizedString("Title", tableName: "GeneralSettings", ...)` и т.д. для заголовков вкладок — Observables/AppState.swift:116-120.
- `LocalizedStringKey`: Observables/FooterItem.swift:6-8 (`message/comment/confirm`), Views/SearchFieldView.swift:4 (`placeholder`); значения-ключи задаются в Observables/Footer.swift:30-80 (`"clear"`, `"clear_alert_message"`, `"about_tooltip"` ...). `Text(LocalizedStringKey(item.title))` — Views/FooterItemView.swift:16.
- `Text("search_clear_accessibility_label")` без tableName (стол Localizable) — Views/SearchFieldView.swift:41; Views/ToolbarView.swift:180; Views/HistoryItemView.swift:65,68.
- Хелпер с динамическим столом: Views/ToolbarView.swift:13-22 (`NSLocalizedString(key, tableName: tableName, ...)` с подстановкой `{shortcut}`).
- `NSLocalizedString(... value: "Text contains paragraphs...")` с fallback — Views/ItemEditorView.swift:86-91 (ключ в en и ru есть).
- Формат-строки: `String(format: NSLocalizedString("history_item_selected_accessibility_value", ...))` — Observables/HistoryItemDecorator.swift:107; GeneralSettingsPane.swift:100 (`Modifiers`).

Полнота ru.lproj (проверено скриптом по ключам):
- Во всех 7 `.strings`-таблицах ru содержит ВСЕ ключи en, пропусков нет. Английских значений в ru нет (все значения содержат кириллицу; «Maccy» остаётся латиницей в `status_item_accessibility_label`).
- В `ru.lproj/Localizable.strings` 7 лишних ключей, которых нет в en и которые НЕ используются в Swift (grep пуст): `key_used_error`, `active_screen`, `screen`, `system_settings_name`, `system_settings_pane`, `system_preferences_name`, `system_preferences_pane`. Мёртвый груз, можно не трогать.
- Опечатки в ru, стоит исправить: `clear_alert_message` «дейстительно» → «действительно»; `active_screen` «Активынй экран» (ключ неиспользуемый). Тон `clear_tooltip`: «Выберите нажав ⇧ ...» — корявая фраза. Качество остальных значений не вычитывалось построчно.

## 2. Захардкоженный английский (мимо локализации)

Intents (нет никакого .strings под них; `LocalizedStringResource` литералы ищутся в Localizable.strings main bundle по ключу = английский текст; xcstrings нет — нужно добавлять ключи в `Maccy/ru.lproj/Localizable.strings` и проверять, что Shortcuts подхватывает; при необходимости рассмотреть `AppShortcuts.strings`/xcstrings, сам AppShortcutsProvider отсутствует):
- Intents/AppIntentError.swift:8 `"Clipboard item not found"`
- Intents/Clear.swift:7 title `"Clear Clipboard History"`; :8 description `"Clears all Maccy clipboard history except for pinned items."`; :11 Summary `"Clear Clipboard History"`
- Intents/Delete.swift:7 `"Delete Item from Clipboard History"`; :8 `"Deletes an item from Maccy clipboard history."`; :10 `@Parameter(title: "Number")`; :14 Summary `"Delete \(\.$number) Item from Clipboard History"`
- Intents/Get.swift:17 `"Get Item from Clipboard History"`; :18-21 description (многострочная: «Gets an item from Maccy clipboard history. The returned item can be used to access its plain/rich/HTML text, image contents or file location.»); :23 `"Selected"`; :26 `"Number"`
- Intents/Select.swift:7 `"Select Item in Clipboard History"`; :8-11 description («Selects an item in Maccy clipboard history. Depending on Maccy settings, it might trigger pasting of the selected item.»); :14 Summary `"Select \(\.$number) Item in Clipboard History"`; :17 `@Parameter(title: "Number", ..., requestValueDialog: "What is the number of the item?")`
- Intents/HistoryItemAppEntity.swift:5 `"Clipboard item"` (typeDisplayRepresentation); :7 `"File"`; :10 `"HTML"`; :13 `"Image"`; :16 `"Rich Text"`; :19 `"Text"`; :23 `DisplayRepresentation(title: "Clipboard item")`
- (номера строк Intents приблизительные ±1; перед правкой сверить.)

About / прочее:
- About.swift:5 `"Special thank you to Tonia, Anna & Guy! ❤️"`
- About.swift:10 `"Kudos to Sasha Koss for help! 🏂"` — ссылка по `NSRange(location: 9, length: 10)` (слова «Sasha Koss»): при переводе пересчитать диапазон!
- About.swift:15 `"Website│GitHub│Support"` — три ссылки по диапазонам (0,7), (8,6), (15,7): при переводе пересчитать (разделитель `│`, длины слов изменятся). Строки пишутся в attributed string, а не в .strings; нужен либо NSLocalizedString + вычисление диапазонов через `range(of:)`, либо ручной ru-текст.
- Views/ListHeaderView.swift:17 `Text("Maccy")` — это бренд-название; в .strings ключа "Maccy" нет, Text("Maccy") ищет ключ в Localizable (не найдёт — выведет «Maccy»). Можно оставить.
- Info.plist: `NSHumanReadableCopyright` «Copyright © Alexey Rodionov» (Info.plist, показывается в стандартной панели About); `UTTypeDescription` «Maccy Pin Reorder Type» (внутренний тип, пользователю не виден); `CFBundleName` = $(PRODUCT_NAME). Usage descriptions (NS*UsageDescription) ОТСУТСТВУЮТ. InfoPlist.strings нет (при желании добавить `Maccy/ru.lproj/InfoPlist.strings` для копирайта).
- Notifier.swift: свой текст не содержит; body = `item.title` (контент буфера) — Clipboard.swift:117, Observables/History.swift:192. Заголовка нет.
- Алертов NSAlert нет; подтверждение очистки — SwiftUI ConfirmationView (ключи уже в Localizable). Меню NSMenu/MainMenu/xib/storyboard нет (LSUIElement=true, приложение в статус-баре; MaccyApp.swift — пустой MenuBarExtra).
- Settings-заголовки панелей идут из `Title` в каждой таблице (AppState.swift:116-120) — переведены.
- Пустые `""` (TextField("", ...), Picker("", ...), Button("", systemImage:)) — не видимый текст, но проверить accessibility, добавляются `.accessibilityLabel` в большинстве мест.
- Не пользовательское (не трогать): NSLog/логи, "Index out of bounds" (ConcatenatedCollection.swift:17), "Apple Web Archive pasteboard type" (Extensions/NSPasteboard.PasteboardType+Types.swift:32 — идентификатор), Defaults-ключи.
- Даты в PreviewItemView (`Text(date, style: .date)`) форматируются по Locale.current — при форсе языка через AppleLanguages регион/формат дат может остаться системным (en_US); если нужно полностью русское — также задать `AppleLocale = ru_RU`.

## 3. Сторонние пакеты (SPM, project.pbxproj:1952-2040; Package.resolved)
Defaults 9.0.9, fuse-swift 1.4.0, KeyboardShortcuts 3.1.0 (minimum 3.1.0 upToNextMinor), LaunchAtLogin-Modern 1.1.0, Sauce 2.5.2, Settings (sindresorhus) 3.1.2, Sparkle 2.10.0, swift-log 1.15.1, SwiftHEXColors 1.4.1 (+ swift-syntax 604.0.0 транзитивно).
- KeyboardShortcuts: свои локализации, `Sources/KeyboardShortcuts/Localization/ru.lproj` ЕСТЬ (17 языков), defaultLocalization en.
- Settings: `Resources/Localizable.xcstrings`, ключ "ru" в файле встречается (проверено грепом; полноту не проверял).
- LaunchAtLogin-Modern: ru.lproj не найден (в UI используется наш `Text("LaunchAtLogin", ...)`, свой текст).
- Sparkle: `Sparkle/ru.lproj` есть (диалоги обновления русские) — но обновление всё равно отключаем.
- Ресурсы пакетов выбирают язык по `Bundle.main.preferredLocalizations`/AppleLanguages процесса, поэтому форс через AppleLanguages (п. 6) покрывает и их.
- Пакеты скачаны в ~/Library/Developer/Xcode/DerivedData/Maccy-bqtffkttcuizndezdufndeomnbsd/SourcePackages (оффлайн-сборка возможна с `-clonedSourcePackagesDirPath` или просто тем же DerivedData).

## 4. Sparkle: как подключён
- Maccy/SoftwareUpdater.swift (весь файл, 39 строк): `@Observable class SoftwareUpdater`, `SPUStandardUpdaterController(startingUpdater: true, ...)` :14-18; свойство `automaticallyChecksForUpdates` :5; `checkForUpdates()` :36.
- Maccy/Settings/GeneralSettingsPane.swift:18 `@State private var updater = SoftwareUpdater()`; :26-29 `Toggle(isOn: $updater.automaticallyChecksForUpdates) { Text("CheckForUpdates", ...) }`; :29-32 `Button(action: { updater.checkForUpdates() }, label: { Text("CheckNow", ...) })`. Оба внутри `Settings.Section(title: "", bottomDivider: true)` :22 вместе с `LaunchAtLogin.Toggle` :23 — удалять только Toggle+Button+@State, секцию с LaunchAtLogin оставить.
- Ключи ru: `CheckForUpdates`, `CheckNow` в Settings/ru.lproj/GeneralSettings.strings (можно удалить вместе с UI).
- AppDelegate.swift:3 `import Sparkle`; :40-48 блок `#if DEBUG if Self.isTesting { SPUUpdater(...).automaticallyChecksForUpdates = false ... }` — только для тестов Debug, на Release не влияет. Если убирать Sparkle из линковки — убрать этот блок и import.
- Info.plist: `SUFeedURL` = https://raw.githubusercontent.com/p0deje/Maccy/master/appcast.xml; `SUEnableDownloaderService`=true; `SUEnableInstallerLauncherService`=true. Нет SUPublicEDKey/SUEnableAutomaticChecks. Для отключения: удалить SUFeedURL (без фида Sparkle не будет проверять и покажет ошибку только при ручной проверке), либо `SUEnableAutomaticChecks`=false.
- Maccy/Maccy.entitlements: `com.apple.security.app-sandbox`=true, `files.user-selected.read-only`, mach-lookup exceptions `$(PRODUCT_BUNDLE_IDENTIFIER)-spks` и `-spki` (XPC-сервисы Sparkle). Если убрать Sparkle — эти исключения не нужны.
- Прочее: `appcast.xml` в корне репо (фид оригинала, 2.7.1); Sparkle-пакет в pbxproj: 27 (BuildFile), 630 (Frameworks), 975, 1061, 1961-1967, 2033-2036.
- Минимальный путь: удалить SoftwareUpdater.swift (+ ссылки в pbxproj PBXFileReference/BuildFile/Sources) и UI в GeneralSettingsPane; либо оставить файл и убрать только UI + SUFeedURL. Первое чище, но правка pbxproj рискованнее.

## 5. Сборка
- Project: Maccy.xcodeproj. Targets: Maccy, MaccyTests, MaccyUITests. Схемы: `Maccy` (общая; BuildableName Maccy.app), а также KeyboardShortcuts, Preferences (пакетные). Configurations: Debug, Release. Test plan: Maccy.xctestplan.
- Bundle ID: `org.p0deje.Maccy` (тесты: org.p0deje.MaccyTests / MaccyUITests). MARKETING_VERSION 2.7.1, CURRENT_PROJECT_VERSION 62, MACOSX_DEPLOYMENT_TARGET 14.0, SWIFT_VERSION 6.0, ARCHS arm64+x86_64 (ONLY_ACTIVE_ARCH=NO в Release).
- Подпись (pbxproj:1847-1891): `CODE_SIGN_STYLE=Automatic`, `CODE_SIGN_IDENTITY="Apple Development"` (+ `[sdk=macosx*]`), `DEVELOPMENT_TEAM=MN3X4648SC`, `ENABLE_HARDENED_RUNTIME=YES`, `CODE_SIGN_ENTITLEMENTS=Maccy/Maccy.entitlements` (песочница ВКЛЮЧЕНА через entitlements; build setting ENABLE_APP_SANDBOX=NO не используется). В системе 0 кодподписных identity (`security find-identity -v -p codesigning` пусто).
- Info.plist: `INFOPLIST_FILE=Maccy/Info.plist`, категория productivity, LSUIElement=true.
- Рекомендуемая команда (ad-hoc, без team):
  ```
  xcodebuild -project Maccy.xcodeproj -scheme Maccy -configuration Release \
    -derivedDataPath build/DD -destination 'generic/platform=macOS' \
    CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=- DEVELOPMENT_TEAM= \
    PROVISIONING_PROFILE_SPECIFIER= CODE_SIGNING_REQUIRED=YES CODE_SIGNING_ALLOWED=YES \
    ONLY_ACTIVE_ARCH=NO build
  ```
  Результат: `build/DD/Build/Products/Release/Maccy.app`. Если подпись `-` всё равно ломает Sparkle XPC или entitlements — fallback: `CODE_SIGNING_ALLOWED=NO`, затем вручную `codesign --force --deep --sign - --entitlements Maccy/Maccy.entitlements --options runtime Maccy.app` (для ad-hoc hardened runtime обычно можно убрать: `ENABLE_HARDENED_RUNTIME=NO`). Для локального запуска на своём Mac убрать карантин: `xattr -cr Maccy.app` (на чужих Mac — правый клик → Открыть).
  Для сборки только своей архитектуры ускорить: `ARCHS=arm64 ONLY_ACTIVE_ARCH=YES`.
- `xcodebuild -list` выдаёт предупреждения CoreSimulator out of date (безвредно для macOS-сборки).
- DMG: `hdiutil create -volname Maccy -srcfolder <dir с Maccy.app и симлинком /Applications> -ov -format UDZO Maccy.dmg` (create-dmg/brew не проверялись).
- Тесты: CI-переменная и `enable-testing` аргумент в Maccy.xctestplan; AppDelegate.isTesting :7 — используется только в Debug.

## 6. Как принудительно включить русский
Точка входа: `@main struct MaccyApp: App` — Maccy/MaccyApp.swift:3-4; AppDelegate подключён через `@NSApplicationDelegateAdaptor` (MaccyApp.swift:5). main.swift нет. Самые ранние места:
1. Добавить `init()` в `MaccyApp` (MaccyApp.swift после :5) и там: `UserDefaults.standard.set(["ru"], forKey: "AppleLanguages")` (опц. `AppleLocale`=`ru_RU`). Срабатывает до `applicationWillFinishLaunching` (AppDelegate.swift:34) и до создания UI. Риск: CFBundle уже мог закэшировать preferred localizations на старте процесса — на практике смена в `init()` @main-приложения обычно успевает, но надёжность проверять запуском с `defaults delete org.p0deje.Maccy AppleLanguages` и системным английским.
2. Более надёжный вариант: класс-обёртка/`static let` не нужны — достаточно заменить `@main` на `main.swift` с `UserDefaults.standard.set(["ru"], forKey:"AppleLanguages")` до `MaccyApp.main()`; либо подменить `Bundle.main` класс (method swizzle `localizedString(forKey:value:table:)`).
3. Декларативно (без кода, затрагивает только fallback): `CFBundleDevelopmentRegion`=ru в Info.plist + `developmentRegion = ru` (pbxproj:1019) и/или `CFBundleLocalizations`=[ru] + удалить остальные *.lproj из Copy Resources. Если у пользователя нет подходящего языка, берётся development region. Но при системном английском сработает en.lproj (en входит в список) — поэтому недостаточно, если en.lproj остаётся; надёжно только вместе с вариантом 1 либо удалением en.lproj (ключи в en — символические, так что нельзя оставлять без ru-fallback).
- Рекомендация: вариант 1 (+ при необходимости `AppleLocale`), плюс CFBundleDevelopmentRegion=ru как страховка.
- Тесты (MaccyTests/UITests) могут зависеть от английских строк — проверить, прежде чем менять dev region.

## 7. README.md и docs
- README.md: 8245 байт, 170 строк. Секции: логотип `<img src=https://maccy.app/img/maccy/Logo.png>` (строка 4), заголовок `# [Maccy](https://maccy.app)` :6, бейджи Downloads и Build Status :8-9 (shields.io), TOC (vim-markdown-toc, строки ~11-35, ссылки-якоря на заголовки — после перевода пересоздать якоря), Features :37, Install :45 (brew/релизы/App Store), Usage :53, Advanced :68 (Ignore Copied Items :70, Ignore Custom Copy Types :82, Speed up Clipboard Check Interval :107), FAQ :116 (5 вопросов :118,:123,:131,:143,:148), Translations :152 (виджет Weblate :157), Motivation :159, License :168. Локальных изображений нет, только внешние URL.
- docs/keyboard-shortcut-password-fields.md: 3201 байт, 82 строки. Разделы: Problem Description, Root Cause, Easy Solution, Detailed Solution (Karabiner-Elements подраздел :19), Alternative Solutions :68, Verification :73. README ссылается на него в FAQ (:148).
- Других md: AGENTS.md (autopilot-блок, уже русский), CLAUDE.md (11 байт). LICENSE (MIT) не переводить. Каталог Designs/ — исходники иконок/скриншотов, не код.
- Для форка в README стоит править ссылки на релизы/brew/Weblate/support@maccy.app (указывают на оригинал), добавить инструкцию «установка без Developer ID» (R07/R08).

## 8. Конвенции
- Отступ Swift: 2 пробела, K&R-скобки. Строки .strings: `"Key" = "Значение";` по одной на строку, UTF-8 (en/ru без BOM не проверялось).
- `.swiftlint.yml`: отключены `multiple_closures_with_trailing_closure`, `non_optional_string_data_conversion`, `todo`; `line_length: ignores_comments: true` (лимит по умолчанию 120). В коде встречаются `// swiftlint:disable:this function_body_length` (AppDelegate.swift:34, Footer.swift:28).
- `.bartycrouch.toml`: BartyCrouch (interfaces/translate/normalize, DeepL, secret-плейсхолдер), lint на duplicateKeys и emptyValues — ключи в .strings не дублировать и не оставлять пустыми. `.periphery.yml` — поиск мёртвого кода.
- Репозиторий: git, fork rolexx671/Maccy (см. manifest). Коммиты по правилам AGENTS.md (заголовок «что», трейлер `Requirements: Rxx`).

## Короткий список рисков
1. About.swift: ссылки по жёстким NSRange ломаются при переводе.
2. Intents не имеют таблицы переводов — механизм подхвата в Shortcuts нужно проверить (нужен ru Localizable.strings с английскими ключами; без xcstrings возможны ограничения).
3. Ad-hoc подпись + песочница + Sparkle XPC mach-lookup: проверить, что приложение запускается; Sparkle лучше убрать целиком.
4. Форс AppleLanguages может не затронуть форматы дат/чисел без AppleLocale.
5. Мёртвые/опечатанные ключи в ru (см. п. 1).
