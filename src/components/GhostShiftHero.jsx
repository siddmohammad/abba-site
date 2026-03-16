import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import VortexCanvas from './VortexCanvas';
import './GhostShiftHero.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Phase 1: chaos messages ─────────────────────────────────────────────────
const CHAOS_MSGS = [
  'Hi, price for 500 polo shirt?',
  'Hello! Are you open now? 🙏',
  'I want to place a bulk order',
  'Quotation for embroidery please',
  'Your delivery time?',
  'Custom printing available?',
  'Price list deben please 🙏',
  'Urgent — need by Friday!',
  'Min order quantity koto?',
  'Can I visit your showroom?',
  'Instagram-e dekhsi, price koto?',
  'Wholesale rate available?',
  'Reply please, urgent 😰',
  'Hello? Anyone there?',
  'Still waiting... 😔',
];

// ─── Phase 3: morning briefing ────────────────────────────────────────────────
const MORNING_MSG =
  'Good morning Boss! 🌅<br><br>' +
  'You had <strong>18 inquiries</strong> last night.<br>' +
  'I handled all of them.<br><br>' +
  'Hot lead waiting 👇';

// ─── Phone screens ────────────────────────────────────────────────────────────
function PhoneFront() {
  return (
    <div className="gh-phone-screen gh-front-screen">
      <div className="gh-statusbar">
        <span className="gh-status-time">2:14 AM</span>
        <span className="gh-status-icons">📶 🔋</span>
      </div>
      <div className="gh-chat-header">
        <div className="gh-chat-avatar">YB</div>
        <div className="gh-chat-info">
          <div className="gh-chat-name">Your Business</div>
          <div className="gh-chat-sub">online</div>
        </div>
      </div>
      <div className="gh-chaos-bubbles" id="gh-chaos-scroll">
        {CHAOS_MSGS.map((text, i) => (
          <div key={i} className="gh-chaos-bubble">{text}</div>
        ))}
      </div>
      <div className="gh-phone-input-bar">
        <span className="gh-input-placeholder">Type a message</span>
      </div>
    </div>
  );
}

function PhoneBack({ typingRef }) {
  return (
    <div className="gh-phone-screen gh-back-screen">
      <div className="gh-statusbar gh-statusbar-morning">
        <span className="gh-status-time">7:23 AM</span>
        <span className="gh-status-icons">📶 🔋</span>
      </div>
      <div className="gh-chat-header gh-morning-header">
        <div className="gh-chat-avatar gh-bot-avatar">🤖</div>
        <div className="gh-chat-info">
          <div className="gh-chat-name">Botter Assistant</div>
          <div className="gh-chat-sub gh-sub-delivered">✓✓ Handled 18 overnight</div>
        </div>
      </div>
      <div className="gh-morning-body">
        <div className="gh-bot-bubble">
          <div ref={typingRef} className="gh-typing-text" />
          <span className="gh-cursor">|</span>
        </div>
        <div className="gh-lead-card">
          <div className="gh-lead-tag">🔥 HOT LEAD</div>
          <div className="gh-lead-name">Rafiq Ahmed</div>
          <div className="gh-lead-detail">500 pcs polo shirt · Advance ready</div>
          <a href="/onboard" className="gh-lead-cta btn-neon">📞 Call Rafiq Now</a>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function GhostShiftHero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const phoneWrapRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const phone = phoneWrapRef.current;

    // ── Set initial hidden states ───────────────────────────────────────────
    gsap.set('.gh-line-inner', { y: '105%' });
    gsap.set(['.gh-sub', '.gh-cta-row'], { opacity: 0, y: 18 });
    gsap.set('.gh-chaos-bubble', { opacity: 0, y: 10 });
    gsap.set('.gh-back-screen', { opacity: 0 });
    gsap.set('.gh-lead-card', { opacity: 0, y: 16 });

    // ── Phase 1: intro animations ──────────────────────────────────────────
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .to('.gh-line-inner', { y: '0%', duration: 0.9, stagger: 0.12 }, 0)
      .to('.gh-sub', { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
      .to('.gh-cta-row', { opacity: 1, y: 0, duration: 0.5 }, '-=0.35');

    // ── Phase 1: chaos bubbles stagger in ─────────────────────────────────
    const chatEl = document.getElementById('gh-chaos-scroll');
    gsap.to('.gh-chaos-bubble', {
      opacity: 1, y: 0,
      duration: 0.2,
      stagger: {
        each: 0.18,
        onComplete() { if (chatEl) chatEl.scrollTop = chatEl.scrollHeight; },
      },
      ease: 'power2.out',
      delay: 0.6,
    });

    // ── Phase 2 + 3: ScrollTrigger (Desktop) or Loop (Mobile) ──────────────
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let st;

    if (isMobile) {
      // On mobile, play as a repeating loop with no scroll trigger.
      st = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // We still need to drive the vortex canvas speed
      st.to({}, {
        duration: 4,
        onUpdate() {
          if (!canvasRef.current) return;
          const p = this.progress();
          let speed;
          if (p < 0.1) speed = 1;
          else if (p < 0.35) speed = 1 + (p - 0.1) / 0.25 * 10;
          else if (p < 0.55) speed = 11 - (p - 0.35) / 0.2 * 10;
          else speed = 1;
          canvasRef.current.setSpeed(speed);
        }
      }, 0);

    } else {
      // On desktop, use the original scrolled animation
      st = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=20%',
          pin: true,
          scrub: 4,
          anticipatePin: 1,
          onUpdate(self) {
            if (!canvasRef.current) return;
            const p = self.progress;
            let speed;
            if (p < 0.1) speed = 1;
            else if (p < 0.35) speed = 1 + (p - 0.1) / 0.25 * 10; // 1→11
            else if (p < 0.55) speed = 11 - (p - 0.35) / 0.2 * 10; // 11→1
            else speed = 1;
            canvasRef.current.setSpeed(speed);
          },
        },
      });
    }

    st
      // Phase 2: fade chaos, warm background
      .to('.gh-chaos-bubbles', { opacity: 0, duration: isMobile ? 0.5 : 0.15 }, 0)
      .to(hero, { backgroundColor: '#07100d', duration: isMobile ? 1.0 : 0.3 }, 0)

      // Phone squish-swap (no CSS 3D)
      .to('.gh-front-screen', { opacity: 0, duration: isMobile ? 0.3 : 0.08 }, isMobile ? 0.6 : 0.18)
      .to(phone, { scaleX: 0, duration: isMobile ? 0.25 : 0.07, ease: 'power2.in' }, isMobile ? 0.7 : 0.22)
      .to('.gh-back-screen', { opacity: 1, duration: isMobile ? 0.05 : 0.01 }, isMobile ? 0.95 : 0.29)
      .to(phone, { scaleX: 1, duration: isMobile ? 0.35 : 0.09, ease: 'power2.out' }, isMobile ? 1.0 : 0.30)

      // Phase 3: type morning message
      .fromTo(typingRef.current, { text: { value: '', delimiter: '' } }, {
        text: { value: MORNING_MSG, delimiter: '' },
        duration: isMobile ? 1.5 : 0.38,
        ease: 'none',
      }, isMobile ? 1.5 : 0.44)

      // Lead card reveal
      .to('.gh-cursor', { opacity: 0, duration: isMobile ? 0.2 : 0.04 }, isMobile ? 3.0 : 0.84)
      .to('.gh-lead-card', { opacity: 1, y: 0, duration: isMobile ? 0.4 : 0.1 }, isMobile ? 3.0 : 0.84);

    return () => {
      intro.kill();
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="gh-hero" ref={heroRef}>
      <VortexCanvas ref={canvasRef} />

      <div className="container gh-container">
        <div className="row align-items-center gh-row">

          {/* ── LEFT: Copy ── */}
          <div className="col-lg-5 gh-left">
            <div className="gh-eyebrow">
              <span className="gh-live-dot" />
              AI Customer Agent &nbsp;·&nbsp; Always On
            </div>

            <h1 className="gh-headline pixel">
              <div className="gh-line-mask">
                <div className="gh-line-inner">Become The</div>
              </div>
              <div className="gh-line-mask">
                <div className="gh-line-inner">Business That</div>
              </div>
              <div className="gh-line-mask">
                <div className="gh-line-inner">
                  <span className="neon-text">Never Closes.</span>
                </div>
              </div>
            </h1>

            <p className="gh-sub">
              While you sleep, Botter handles every WhatsApp, Facebook, and
              Instagram message — qualifying leads, answering questions, and
              filling your pipeline. 24/7.
            </p>

            <div className="gh-cta-row">
              <a href="/onboard" className="btn-neon pixel gh-cta-btn">
                Start Free 14-Day Trial &nbsp;→
              </a>
              <p className="gh-cta-note">
                No credit card &nbsp;·&nbsp; Setup in 24 hrs &nbsp;·&nbsp; WhatsApp support
              </p>
            </div>
          </div>

          {/* ── RIGHT: Phone (GSAP scaleX flip — no CSS 3D) ── */}
          <div className="col-lg-7 gh-right">
            <div className="gh-phone-scene">
              <div className="gh-phone-glow">
                <div className="gh-phone-wrapper" ref={phoneWrapRef}>
                  <PhoneFront />
                  <PhoneBack typingRef={typingRef} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
