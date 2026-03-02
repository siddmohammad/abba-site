import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './GhostShiftHero.css';

// ─── helpers ────────────────────────────────────────────────────────────────
const formatClock = (m) => {
  const h24 = Math.floor(m / 60) % 24;
  const mins = m % 60;
  const h12 = h24 % 12 || 12;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  return `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
};

const CHATS = [
  { side: 'patient', text: 'Apnader ki kal shokale khola thakbe?' },
  { side: 'abba',    text: 'Ji, amra shokal 10ta theke khola. Apni ki appointment nite chan?' },
  { side: 'patient', text: 'Haa, Dr. Kamal er appointment lagbe.' },
  { side: 'abba',    text: 'Done! Kal 11:30 AM e apnar booking confirm kora holo. ✔️' },
];

// ─── Phone UI ────────────────────────────────────────────────────────────────
function PhoneScreen({ clockRef, visibleChats, chipLabel, showOverlay, isOnline }) {
  return (
    <div className="ghost-phone-inner">
      {/* Header bar */}
      <div className="ghost-phone-header">
        <div className="ghost-clock pixel" ref={clockRef}>{formatClock(1410)}</div>
        <motion.div
          className="ghost-status-badge"
          animate={{
            backgroundColor: isOnline ? '#39FF14' : '#ff3a3a',
            boxShadow: isOnline
              ? '0 0 8px #39FF14, 0 0 16px rgba(57,255,20,0.4)'
              : '0 0 8px #ff3a3a, 0 0 16px rgba(255,58,58,0.4)',
          }}
          transition={{ duration: 0.6 }}
        >
          <span className="ghost-badge-dot" />
          {isOnline ? 'Online' : 'Clinic Closed'}
        </motion.div>
      </div>

      {/* Chat area */}
      <div className="ghost-chat-area">
        <AnimatePresence>
          {CHATS.slice(0, visibleChats).map((msg, i) => (
            <motion.div
              key={i}
              className={`ghost-chat-row ghost-chat-${msg.side}`}
              initial={{ opacity: 0, x: msg.side === 'patient' ? -30 : 30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className={`ghost-bubble ghost-bubble-${msg.side}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Notification chips */}
        <AnimatePresence>
          {chipLabel && (
            <motion.div
              key={chipLabel}
              className="ghost-notif-chip"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              ✓ {chipLabel}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Morning overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="ghost-overlay"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="ghost-overlay-content">
                <div className="ghost-overlay-morning pixel">Good Morning.</div>
                <div className="ghost-overlay-count">
                  <span className="ghost-count-num neon-text">14</span>
                  <span className="ghost-count-label">Patient Inquiries Handled<br />While You Slept.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Typing indicator while clinic is "closed" and chats are loading */}
      {visibleChats > 0 && visibleChats < 4 && (
        <div className="ghost-typing">
          <span /><span /><span />
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function GhostShiftHero() {
  const [visibleChats, setVisibleChats] = useState(0);
  const [chipLabel, setChipLabel]       = useState(null);
  const [showOverlay, setShowOverlay]   = useState(false);
  const [isOnline, setIsOnline]         = useState(false);

  const clockRef     = useRef(null);
  const timers       = useRef([]);
  const clockInterval = useRef(null);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (clockInterval.current) {
      clearInterval(clockInterval.current);
      clockInterval.current = null;
    }
  };

  const addTimer = (fn, delay) => {
    timers.current.push(setTimeout(fn, delay));
  };

  const runSequence = () => {
    clearAll();

    // t=0: reset — write clock directly to DOM, no React state
    if (clockRef.current) clockRef.current.textContent = formatClock(1410);
    setVisibleChats(0);
    setChipLabel(null);
    setShowOverlay(false);
    setIsOnline(false);

    // t=1000: start clock timelapse (23:30 → 6:00 AM, 390 ticks × 10ms = 3.9s)
    // DOM write only — zero React re-renders during the timelapse
    addTimer(() => {
      let m = 1410;
      clockInterval.current = setInterval(() => {
        m = (m + 1) % 1440;
        if (clockRef.current) clockRef.current.textContent = formatClock(m);
        if (m === 360) {
          clearInterval(clockInterval.current);
          clockInterval.current = null;
        }
      }, 10);
    }, 1000);

    addTimer(() => setVisibleChats(1), 1500);

    // Chat 2 + chip 1
    addTimer(() => setVisibleChats(2), 2300);
    addTimer(() => setChipLabel('Availability Checked'), 2500);
    addTimer(() => setChipLabel(null), 3600);

    addTimer(() => setVisibleChats(3), 3100);

    // Chat 4 + chip 2
    addTimer(() => setVisibleChats(4), 3900);
    addTimer(() => setChipLabel('Appointment Set'), 4100);
    addTimer(() => setChipLabel(null), 5000);

    // t=5200: resolution — 8:00 AM, status online
    addTimer(() => {
      clearInterval(clockInterval.current);
      clockInterval.current = null;
      if (clockRef.current) clockRef.current.textContent = formatClock(480); // 8:00 AM
      setIsOnline(true);
      setChipLabel(null);
    }, 5200);

    // t=5800: show overlay
    addTimer(() => setShowOverlay(true), 5800);

    // t=7200: hide overlay, pause
    addTimer(() => setShowOverlay(false), 7200);

    // t=8200: loop
    addTimer(runSequence, 8200);
  };

  useEffect(() => {
    runSequence();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="ghost-hero">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* ── LEFT: Copy ── */}
          <div className="col-lg-6 ghost-copy-col">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="ghost-eyebrow">
                <span className="ghost-dot" />
                Night Shift — Always On
              </div>

              <h1 className="ghost-headline pixel">
                Become The Clinic<br />
                That <span className="neon-text">Never Closes.</span>
              </h1>

              <p className="ghost-subtext">
                While you sleep, ABBA handles every patient message — booking serials,
                answering questions, and filling your schedule. 24/7, zero missed appointments.
              </p>

              <div className="ghost-stats">
                <div className="ghost-stat">
                  <span className="ghost-stat-num neon-text">24/7</span>
                  <span className="ghost-stat-label">Availability</span>
                </div>
                <div className="ghost-stat-divider" />
                <div className="ghost-stat">
                  <span className="ghost-stat-num neon-text">~45s</span>
                  <span className="ghost-stat-label">Response Time</span>
                </div>
                <div className="ghost-stat-divider" />
                <div className="ghost-stat">
                  <span className="ghost-stat-num neon-text">0</span>
                  <span className="ghost-stat-label">Missed Bookings</span>
                </div>
              </div>

              <div className="ghost-cta-row">
                <a href="/onboard" className="btn-neon ghost-cta-btn pixel">
                  Start Free 14-Day Trial &nbsp;→
                </a>
                <p className="ghost-cta-note">No credit card required · Setup in 24 hrs · WhatsApp support</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Phone ── */}
          <div className="col-lg-6 ghost-phone-col">
            <motion.div
              className="ghost-phone-perspective"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <motion.div
                className="ghost-phone"
                style={{ rotateX: 12, rotateY: -22, rotateZ: 4 }}
                animate={{ rotateY: [-22, -18, -22], rotateZ: [4, 3, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneScreen
                  clockRef={clockRef}
                  visibleChats={visibleChats}
                  chipLabel={chipLabel}
                  showOverlay={showOverlay}
                  isOnline={isOnline}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
