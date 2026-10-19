#!/bin/bash
# Собирает русскую сборку Maccy без Developer ID (ad-hoc подпись) и упаковывает её в DMG.
# Результат: build/Maccy.app и build/Maccy-ru-<версия>.dmg.
# Нужны только Xcode (xcodebuild) и стандартные утилиты macOS (codesign, hdiutil).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$ROOT/build"
DERIVED_DATA="$BUILD_DIR/DerivedData"
APP_NAME="Maccy"
APP="$BUILD_DIR/$APP_NAME.app"

cd "$ROOT"

# Hardened runtime выключен: с ad-hoc подписью он включает проверку библиотек,
# и dyld отказывается грузить встроенный Sparkle.framework («different Team IDs»).
# Песочница (entitlements) сохраняется.
echo "==> Сборка Release (ad-hoc подпись)"
xcodebuild \
  -project "$APP_NAME.xcodeproj" \
  -scheme "$APP_NAME" \
  -configuration Release \
  -derivedDataPath "$DERIVED_DATA" \
  -destination 'generic/platform=macOS' \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY=- \
  DEVELOPMENT_TEAM= \
  PROVISIONING_PROFILE_SPECIFIER= \
  ENABLE_HARDENED_RUNTIME=NO \
  build | tail -20

BUILT_APP="$DERIVED_DATA/Build/Products/Release/$APP_NAME.app"
if [ ! -d "$BUILT_APP" ]; then
  echo "Ошибка: не найден $BUILT_APP" >&2
  exit 1
fi

rm -rf "$APP"
ditto "$BUILT_APP" "$APP"

echo "==> Проверка подписи"
codesign --verify --deep --strict "$APP"

VERSION="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$APP/Contents/Info.plist")"
DMG="$BUILD_DIR/$APP_NAME-ru-$VERSION.dmg"

echo "==> Упаковка $DMG"
STAGING="$(mktemp -d "$BUILD_DIR/dmg.XXXXXX")"
trap 'rm -rf "$STAGING"' EXIT
ditto "$APP" "$STAGING/$APP_NAME.app"
ln -s /Applications "$STAGING/Applications"

rm -f "$DMG"
hdiutil create \
  -volname "$APP_NAME" \
  -srcfolder "$STAGING" \
  -fs HFS+ \
  -format UDZO \
  -ov \
  "$DMG" >/dev/null
hdiutil verify "$DMG" >/dev/null

echo "Готово:"
echo "  $APP"
echo "  $DMG"
