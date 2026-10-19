import Cocoa

class About {
  private let familyCredits = NSAttributedString(
    string: NSLocalizedString("about_family_credits", comment: ""),
    attributes: [NSAttributedString.Key.foregroundColor: NSColor.labelColor]
  )

  private var kossCredits: NSMutableAttributedString {
    let text = NSLocalizedString("about_koss_credits", comment: "")
    let string = NSMutableAttributedString(string: text,
                                           attributes: [NSAttributedString.Key.foregroundColor: NSColor.labelColor])
    addLink("https://koss.nocorp.me", to: "Sasha Koss", in: string)
    return string
  }

  private var links: NSMutableAttributedString {
    let website = NSLocalizedString("about_website", comment: "")
    let github = "GitHub"
    let support = NSLocalizedString("about_support", comment: "")
    let string = NSMutableAttributedString(string: [website, github, support].joined(separator: "│"),
                                           attributes: [NSAttributedString.Key.foregroundColor: NSColor.labelColor])
    addLink("https://maccy.app", to: website, in: string)
    addLink("https://github.com/p0deje/Maccy", to: github, in: string)
    addLink("mailto:support@maccy.app", to: support, in: string)
    return string
  }

  private var credits: NSMutableAttributedString {
    let credits = NSMutableAttributedString(string: "",
                                            attributes: [NSAttributedString.Key.foregroundColor: NSColor.labelColor])
    credits.append(links)
    credits.append(NSAttributedString(string: "\n\n"))
    credits.append(kossCredits)
    credits.append(NSAttributedString(string: "\n"))
    credits.append(familyCredits)
    credits.setAlignment(.center, range: NSRange(location: 0, length: credits.length))
    return credits
  }

  @objc
  func openAbout(_ sender: NSMenuItem?) {
    NSApp.activate(ignoringOtherApps: true)
    NSApp.orderFrontStandardAboutPanel(options: [NSApplication.AboutPanelOptionKey.credits: credits])
  }

  // Ссылка ставится на подстроку, а не на жёсткий диапазон: переводы меняют длину текста.
  private func addLink(_ url: String, to substring: String, in string: NSMutableAttributedString) {
    let range = (string.string as NSString).range(of: substring)
    guard range.location != NSNotFound else {
      return
    }

    string.addAttribute(.link, value: url, range: range)
  }
}
