import { useState, useEffect } from 'react';
import '../../styles/splash.css';

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem('abba-entered') !== '1';
  });
  const [off, setOff] = useState(false);

  const handleEnter = () => {
    setOff(true);
    sessionStorage.setItem('abba-entered', '1');
    setTimeout(() => {
      setVisible(false);
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  if (!visible) return null;

  return (
    <div className={`splash ${off ? 'off' : ''}`} role="dialog" aria-label="Welcome screen">
      <div className="splash-inner">
        <img alt="Botter mascot" className="splash-botter" src="/assets/botter-mascot.webp" />
        <h1 className="pixel neon-text mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>
          WELCOME
        </h1>
        <div className="text-center mb-3">
          <button className="btn btn-neon pixel" onClick={handleEnter}>
            PRESS START
          </button>
        </div>
        <div className="splash-card">
          <h2 className="pixel neon-text mb-2">About</h2>
          <p className="mb-2">ABBA stops customers from slipping away due to slow replies and missed follow-ups.</p>
          <ul className="mb-0 small">
            <li>No missed messages — replies delivered instantly</li>
            <li>No forgotten follow-ups — customers get reminders</li>
            <li>Daily/weekly reports so you know exactly what&apos;s happening</li>
            <li>Multilingual support &bull; Works 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
