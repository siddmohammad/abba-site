import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          </ul>
        </div>
      </div>
    </nav>
  );
}
