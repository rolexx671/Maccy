import SwiftUI

@main
struct MaccyApp: App {
  @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  // It's impossible to create sceneless application,
  // so we are hacking this around by creating a menubar
  // scene that is always hidden.
  @State private var hiddenMenu: Bool = false

  init() {
    // Русская сборка: интерфейс всегда на русском независимо от языка системы.
    // Значение в домене приложения перекрывает глобальное AppleLanguages,
    // в том числе для ресурсов сторонних пакетов (Settings, KeyboardShortcuts).
    UserDefaults.standard.set(["ru"], forKey: "AppleLanguages")
  }

  var body: some Scene {
    MenuBarExtra("", isInserted: $hiddenMenu) {
      EmptyView()
    }
  }
}
