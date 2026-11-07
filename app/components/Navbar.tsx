
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { language, setLanguage, messages } = useLanguage();
  const navigation = [
    { name: messages.nav.home, href: "#home" },
    { name: messages.nav.about, href: "#about" },
    { name: messages.nav.services, href: "#services" },
    { name: messages.nav.portfolio, href: "#portfolio" },
    { name: messages.nav.team, href: "#team" },
    { name: messages.nav.contact, href: "#contact" },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <img
          src="/images/logo.png"
          alt="Rivona4 Media Logo"
          className="brand-logo"
        />

        <span className="brand-name">RIVONA MEDIA</span>
      </Link>

      <nav className="main-nav">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <div className="language-switch" aria-label="Language">
          <button
            type="button"
            className={language === "en" ? "selected" : ""}
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={language === "ar" ? "selected" : ""}
            aria-pressed={language === "ar"}
            onClick={() => setLanguage("ar")}
          >
            AR
          </button>
        </div>

        <Link href="#contact" className="header-contact">
          {messages.nav.getInTouch}
        </Link>

        <Link
          href="#contact"
          className="profile-icon"
          aria-label={messages.nav.contactUs}
        >
          ♙
        </Link>
      </div>
    </header>
  );
}