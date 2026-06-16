import React, { useState, useEffect } from "react";
import "../../App.css";
import Toogle from "../Toogle";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/#home",    label: "Home",         icon: "uil-estate",   id: "#home" },
    { href: "/#about",   label: "Ketentuan",    icon: "uil-clipboard-notes", id: "#about" },
    { href: "/#size",    label: "Size",          icon: "uil-ruler",    id: "#size" },
    { href: "/#payment", label: "Pembayaran",    icon: "uil-wallet",   id: "#payment" },
    { href: "/#contact", label: "Daftar",        icon: "uil-file-alt", id: "#contact" },
  ];

  return (
    <header className={`header${scrolled ? " scroll-header" : ""}`}>
      <nav className="nav container">

        {/* Logo */}
        <Link to="/" className="nav__logo">
          <div>
            <div className="nav__logo-text">RUN FOR NATION</div>
            <div className="nav__logo-sub">Spirit of Culture 2026</div>
          </div>
        </Link>

        {/* Nav links */}
        <div className={`nav__menu${menuOpen ? " show-menu" : ""}`}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={`nav__link${activeNav === item.id ? " active-link" : ""}`}
                  onClick={() => { setActiveNav(item.id); setMenuOpen(false); }}
                >
                  <i className={`uil ${item.icon} nav__icon`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <i
            className="uil uil-times nav__close"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Right controls */}
        <div className="nav__right">
          <Toogle />
          <div
            className="nav__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className="uil uil-apps"></i>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;
