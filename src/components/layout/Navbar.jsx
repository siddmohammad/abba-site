import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isBotterPage = location.pathname === '/';
  const { lang, toggleLang } = useLang();

  return (
    <nav className="navbar navbar-expand-md px-3">
      <div className="container-xxl">
        <Link className="navbar-brand brand-mark" to="/">
          <span className="brand-logo-text">ABBA</span>
        </Link>

        <button
          className="navbar-toggler text-success border-success"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {isBotterPage ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-success" href="#hiw" onClick={() => setMenuOpen(false)}>
                    {lang === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-success" href="#pricing" onClick={() => setMenuOpen(false)}>
                    {lang === 'bn' ? 'মূল্য' : 'Pricing'}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-success" href="#faq" onClick={() => setMenuOpen(false)}>
                    {lang === 'bn' ? 'প্রশ্ন' : 'FAQ'}
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-success" to="/" onClick={() => setMenuOpen(false)}>
                    Botter
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-success" to="/about" onClick={() => setMenuOpen(false)}>
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/#features" onClick={() => setMenuOpen(false)}>
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-success" to="/pricing" onClick={() => setMenuOpen(false)}>
                    Pricing
                  </NavLink>
                </li>
              </>
            )}

            {isBotterPage && (
              <li className="nav-item">
                <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
                  {lang === 'en' ? 'বাংলা' : 'English'}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
