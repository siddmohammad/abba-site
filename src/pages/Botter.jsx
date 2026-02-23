import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLang } from '../context/LangContext';
import useMeta from '../hooks/useMeta';
import SplitText from '../reactbits/SplitText';
import GlowCard from '../reactbits/GlowCard';
import Marquee from '../reactbits/Marquee';
import StarBorder from '../reactbits/StarBorder';
import TiltedCard from '../reactbits/TiltedCard';
import CountUp from '../reactbits/CountUp';
import './Botter.css';

// ─── helpers ────────────────────────────────────────────────────────────────
function T({ en, bn }) {
  const { lang } = useLang();
  return lang === 'bn' ? bn : en;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Reveal({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: fadeUp.hidden, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}
    >
      {children}
    </motion.div>
  );
}

// ─── WhatsApp mock chat ──────────────────────────────────────────────────────
function WaMock({ mini = false }) {
  const messages = [
    { type: 'user', text: 'Assalamu Alaikum, ami kal appointment nite chai', time: '11:47 PM' },
    { type: 'bot',  text: 'Wa alaikum assalam! 😊 Apnar nam ta jante pari? Kon service er jonno ashben?', time: '11:47 PM' },
    { type: 'user', text: 'Ami Farida. Laser hair removal', time: '11:48 PM' },
    { type: 'bot',  text: 'Farida Apa, আমরা Saturday থেকে available আছি। Apnar preferred time konta?', time: '11:48 PM' },
  ];

  const subset = mini ? messages.slice(0, 3) : messages;

  return (
    <div className={mini ? 'wa-mock-mini' : 'wa-mock'}>
      {!mini && (
        <div className="wa-mock-header">
          <div className="wa-avatar">B</div>
          <div>
            <div className="wa-clinic-name">Clinic Assistant</div>
            <div className="wa-status"><span className="online">● </span>Botter is on</div>
          </div>
        </div>
      )}
      <div className="wa-messages">
        {subset.map((msg, i) => (
          <div key={i} className={`wa-row ${msg.type}`}>
            <div className={`wa-bubble ${msg.type === 'bot' ? 'bot-bubble' : 'user-bubble'}`}>{msg.text}</div>
            <div className="wa-meta">
              {msg.type === 'bot' && <span className="wa-sender">BOTTER ✓✓</span>}
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      {!mini && (
        <div className="wa-mock-footer">
          <span>Clinic was closed.</span> Botter captured the booking.
        </div>
      )}
    </div>
  );
}

// ─── Ramadan Banner ──────────────────────────────────────────────────────────
function RamadanBanner() {
  // REMOVE AFTER RAMADAN 2026
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('ramadan-dismissed') === '1'
  );
  const isExpired = new Date() > new Date('2026-04-30');
  if (isExpired || dismissed) return null;

  return (
    <div className="ramadan-banner">
      <T
        en="🌙 Ramadan Special — First 14 Days Free. Start this week, pay nothing until Eid."
        bn="🌙 রমজান স্পেশাল — প্রথম ১৪ দিন ফ্রি। এই সপ্তাহে শুরু করুন, ঈদের আগে কোনো টাকা নেই।"
      />
      <button
        className="close-btn"
        onClick={() => { sessionStorage.setItem('ramadan-dismissed', '1'); setDismissed(true); }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

// ─── FAQ item ────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  return (
    <details className="faq-item">
      <summary>
        <span>{q}</span>
        <span className="faq-icon">+</span>
      </summary>
      <p className="faq-body">{a}</p>
    </details>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function Botter() {
  const { lang } = useLang();
  const t = (en, bn) => lang === 'bn' ? bn : en;

  useMeta({
    title: 'Botter by ABBA — Your Clinic Never Closes',
    description: 'Off-hours AI booking agent for clinics in Dhaka. Botter replies to every patient on WhatsApp, Facebook & Instagram — 24/7, in natural Bangla.',
    ogUrl: 'https://getabba.info/',
  });

  return (
    <div className="botter-page">

      {/* ── Ramadan Banner ── */}
      <RamadanBanner />

      {/* ══ SECTION 1 — HERO ══ */}
      <header className="botter-hero">
        <div className="container-xxl">
          <div className="row align-items-center g-4 g-lg-5">

            {/* Left */}
            <div className="col-lg-6">
              <span className="botter-eyebrow">
                {t('AI RECEPTIONIST FOR CLINICS', 'ক্লিনিকের জন্য AI রিসেপশনিস্ট')}
              </span>

              <h1 className="botter-hero-headline pixel neon-text">
                <span className="d-block">
                  <SplitText
                    text={t('Become The Clinic', 'সেই ক্লিনিক হয়ে উঠুন')}
                    splitType="words"
                    delay={0.2}
                    staggerTime={0.12}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </span>
                <motion.span
                  className="d-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  {t('That Never Closes.', 'যে কখনো বন্ধ হয় না।')}
                </motion.span>
              </h1>

              <motion.p
                className="botter-hero-sub"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                {t(
                  'Botter replies to every patient inquiry on WhatsApp, Facebook, and Instagram — instantly, 24/7. So you never lose a booking to a competitor who just replied faster.',
                  'রাতে বা ছুটির দিনে রোগী message করলে Botter সাথে সাথে reply দেয় — WhatsApp, Facebook, Instagram-এ। আপনার আগে কেউ reply দিতে পারবে না।'
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                <StarBorder as={Link} to="/onboard" className="btn-neon pixel" color="#39FF14">
                  {t('Start Your Free 14-Day Trial', '১৪ দিন ফ্রি ট্রায়াল শুরু করুন')}
                </StarBorder>
                <p className="botter-reassurance">
                  {t(
                    'No commitment. Cancel anytime. Setup in 24 hours.',
                    'কোনো চুক্তি নেই। যেকোনো সময় বাতিল করুন। ২৪ ঘণ্টায় চালু।'
                  )}
                </p>
              </motion.div>
            </div>

            {/* Right — WA mock */}
            <div className="col-lg-6">
              <Reveal className="wa-mock-wrap">
                <WaMock />
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ══ SECTION 2 — PAIN ══ */}
      <section className="botter-pain">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('THE PROBLEM', 'সমস্যাটা কী')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Every Night, You\'re Losing Patients You Already Had.', 'প্রতি রাতে আপনার রোগী অন্য ক্লিনিকে চলে যাচ্ছে।')}
            </h2>
          </Reveal>

          <div className="row g-3">
            {[
              {
                icon: '🌙',
                en_title: '10 PM Message. Gone by Morning.',
                bn_title: 'রাতে message, সকালে gone',
                en_body: 'A patient messages at 10pm asking about an appointment. By morning, they\'ve already booked at the clinic that replied first.',
                bn_body: 'রাত ১০টায় একজন রোগী appointment চেয়ে message করে। সকালে দেখেন — সে অন্য ক্লিনিকে চলে গেছে।',
              },
              {
                icon: '📵',
                en_title: 'Friday Closed = Lost Patients',
                bn_title: 'শুক্রবার বন্ধ = রোগী হারানো',
                en_body: 'Your clinic is closed Friday. But patients don\'t stop looking. They message 2–3 places — whoever replies first wins.',
                bn_body: 'শুক্রবার ক্লিনিক বন্ধ। কিন্তু রোগী তো থামে না। তারা ২-৩ জায়গায় message করে — যে আগে reply দেয়, সে জেতে।',
              },
              {
                icon: '👤',
                en_title: "Staff Can't Reply 24/7",
                bn_title: 'Staff সবসময় থাকে না',
                en_body: 'Your receptionist goes home. After that, every inquiry that comes in is a patient you\'re gambling with.',
                bn_body: 'আপনার receptionist বাড়ি চলে যায়। তারপর যত message আসে — সব জুয়া।',
              },
            ].map((card, i) => (
              <div key={i} className="col-md-4">
                <Reveal delay={i * 0.1}>
                  <GlowCard>
                    <span className="pain-icon">{card.icon}</span>
                    <h3 className="pixel" style={{ fontSize: '0.7rem', marginBottom: '0.6rem', color: 'var(--text)' }}>
                      {t(card.en_title, card.bn_title)}
                    </h3>
                    <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                      {t(card.en_body, card.bn_body)}
                    </p>
                  </GlowCard>
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal>
            <p className="pain-statement">
              {t(
                'The leak isn\'t in your service. It\'s in your response time.',
                'সমস্যা আপনার সেবায় না। সমস্যা reply দিতে দেরি হওয়ায়।'
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 3 — HOW IT WORKS ══ */}
      <section className="botter-hiw" id="hiw">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('HOW IT WORKS', 'কীভাবে কাজ করে')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Botter Is Your Night Shift Receptionist.', 'Botter হলো আপনার নাইট শিফট রিসেপশনিস্ট।')}
            </h2>
            <p className="section-sub mt-2" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
              {t(
                'Set it up once. It works every night, every weekend, every holiday. Forever.',
                'একবার set করুন। তারপর প্রতি রাতে, প্রতি ছুটিতে নিজেই কাজ করবে।'
              )}
            </p>
          </Reveal>

          <div className="row g-3 mb-4">
            {[
              {
                num: '01',
                en_title: 'Patient Sends a Message',
                bn_title: 'রোগী message পাঠায়',
                en_body: 'They DM your clinic on WhatsApp, Facebook, or Instagram — any time, day or night.',
                bn_body: 'রোগী আপনার clinic-এ WhatsApp, Facebook বা Instagram-এ message করে — যেকোনো সময়।',
              },
              {
                num: '02',
                en_title: 'Botter Replies Instantly',
                bn_title: 'Botter সাথে সাথে reply দেয়',
                en_body: 'In natural Bangla. Collects their name, the service they need, and their preferred time. No robotic responses.',
                bn_body: 'স্বাভাবিক Bangla-তে। রোগীর নাম, কী সেবা দরকার, কখন আসতে চান — সব নেয়। Robot-এর মতো না।',
              },
              {
                num: '03',
                en_title: 'Your Staff Confirms in the Morning',
                bn_title: 'সকালে আপনার staff confirm করে',
                en_body: 'You arrive to a clean list of qualified leads. Your team confirms the slot. Human touch stays. No patient slips through.',
                bn_body: 'সকালে এসে দেখেন ready list। আপনার team slot confirm করে। মানবিক স্পর্শ থাকে। কোনো রোগী হারায় না।',
              },
            ].map((step, i) => (
              <div key={i} className="col-md-4">
                <Reveal delay={i * 0.12}>
                  <GlowCard>
                    <span className="step-number">{step.num}</span>
                    <h3 className="step-title">{t(step.en_title, step.bn_title)}</h3>
                    <p className="step-body">{t(step.en_body, step.bn_body)}</p>
                  </GlowCard>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Channel marquee */}
          <Reveal>
            <p className="channels-label">{t('Works on:', 'যেখানে কাজ করে:')}</p>
            <Marquee speed={25} gap="3rem">
              {['WhatsApp', 'Facebook Messenger', 'Instagram DM'].map((name, i) => {
                const icons = [
                  'https://cdn.simpleicons.org/whatsapp/39FF14',
                  'https://cdn.simpleicons.org/facebook/39FF14',
                  'https://cdn.simpleicons.org/instagram/39FF14',
                ];
                return (
                  <span key={i} className="channel-marquee-item">
                    <img src={icons[i]} alt={name} />
                    <span>{name}</span>
                    <span className="channel-dot">·</span>
                  </span>
                );
              })}
            </Marquee>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 4 — FEATURES BENTO ══ */}
      <section className="botter-features">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('WHY CLINICS TRUST BOTTER', 'ক্লিনিকগুলো কেন Botter বিশ্বাস করে')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Built Specifically for Clinics.', 'ক্লিনিকের জন্যই তৈরি।')}
            </h2>
          </Reveal>

          <div className="bento-grid">
            {/* Large card */}
            <Reveal className="bento-large">
              <GlowCard large style={{ height: '100%' }}>
                <div className="feature-card-title" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  {t('Speaks Natural Bangla', 'স্বাভাবিক বাংলায় কথা বলে')}
                </div>
                <p className="feature-card-body">
                  {t(
                    'Not translated English. Real Banglish that your patients actually use. Patients won\'t know it\'s a bot.',
                    'Translated English না। আসল Banglish যেটা আপনার রোগীরা ব্যবহার করে। রোগীরা বুঝতেই পারবে না এটা bot।'
                  )}
                </p>
                <WaMock mini />
              </GlowCard>
            </Reveal>

            {/* Small cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Reveal delay={0.1} style={{ flex: 1 }}>
                <GlowCard style={{ height: '100%' }}>
                  <div className="icon-pill mb-2">🛠️</div>
                  <div className="feature-card-title">{t('No Tech Skills Needed', 'কোনো tech দরকার নেই')}</div>
                  <p className="feature-card-body">
                    {t(
                      "You don't touch any code. We set everything up for you in 24 hours. You just approve and go live.",
                      'আপনাকে কিছু করতে হবে না। আমরা ২৪ ঘণ্টায় সব set up করে দিই। আপনি শুধু approve করুন।'
                    )}
                  </p>
                </GlowCard>
              </Reveal>

              <Reveal delay={0.2} style={{ flex: 1 }}>
                <GlowCard style={{ height: '100%' }}>
                  <div className="icon-pill mb-2">🎮</div>
                  <div className="feature-card-title">{t('Your Staff Stay in Control', 'আপনার staff-ই নিয়ন্ত্রণে থাকে')}</div>
                  <p className="feature-card-body">
                    {t(
                      'At any point your staff can take over a conversation with a simple command. Botter steps aside instantly.',
                      'যেকোনো সময় আপনার staff একটা command দিয়ে conversation নিজে handle করতে পারবে। Botter সরে যাবে।'
                    )}
                  </p>
                </GlowCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — PRICING ══ */}
      <section className="botter-pricing" id="pricing">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('PRICING', 'মূল্য')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Less Than One Part-Time Hire.', 'একজন Part-Time Staff-এর চেয়ে কম খরচ।')}
            </h2>
            <p className="section-sub mt-2" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              {t(
                'A part-time receptionist costs BDT 8,000–12,000/month. Botter works 24/7 for less.',
                'একজন part-time receptionist-এর বেতন ৮,০০০–১২,০০০ টাকা। Botter সারারাত কাজ করে তার চেয়ে কম দামে।'
              )}
            </p>
          </Reveal>

          <div className="row g-4">
            {/* Lite */}
            <div className="col-md-6 col-lg-4">
              <Reveal delay={0}>
                <TiltedCard className="arcade-card h-100 d-flex flex-column">
                  <h2 className="pixel">Lite</h2>
                  <p className="price neon-text">
                    &#2547;<CountUp from={0} to={12200} duration={2} separator="," />
                    <span className="fs-6"> / month</span>
                  </p>
                  <p className="mt-2">{t('Basic automation for clinics to get started.', 'ক্লিনিকের জন্য basic automation।')}</p>
                  <ul className="text-start mt-4 flex-grow-1">
                    <li>{t('Facebook + Instagram instant replies', 'Facebook + Instagram instant reply')}</li>
                    <li>{t('Appointment routing', 'Appointment routing')}</li>
                    <li>{t('Bangla + English support', 'বাংলা + English support')}</li>
                    <li>{t('Customer info capture', 'Customer info capture')}</li>
                    <li>{t('Direct staff notifications', 'Direct staff notifications')}</li>
                  </ul>
                  <div className="mt-4">
                    <StarBorder as={Link} to="/onboard" className="btn-neon pixel w-100" color="#39FF14">
                      {t('START FREE 14-DAY TRIAL', '১৪ দিন ফ্রি শুরু করুন')}
                    </StarBorder>
                    <p className="pricing-reassurance text-center mt-2">
                      {t('No credit card. No contract.', 'কোনো card না। কোনো চুক্তি না।')}
                    </p>
                  </div>
                </TiltedCard>
              </Reveal>
            </div>

            {/* Standard */}
            <div className="col-md-6 col-lg-4">
              <Reveal delay={0.1}>
                <TiltedCard className="arcade-card h-100 d-flex flex-column">
                  <h2 className="pixel">Standard</h2>
                  <p className="price neon-text">
                    &#2547;<CountUp from={0} to={18600} duration={2} delay={0.3} separator="," />
                    <span className="fs-6"> / month</span>
                  </p>
                  <p className="mt-2">{t('Full multi-platform agent for growing clinics.', 'বড় ক্লিনিকের জন্য full multi-platform agent।')}</p>
                  <ul className="text-start mt-4 flex-grow-1">
                    <li>{t('Everything in Lite, plus:', 'Lite-এর সব, আরও:')}</li>
                    <li>{t('WhatsApp + Facebook + Instagram', 'WhatsApp + Facebook + Instagram')}</li>
                    <li>{t('Appointment booking workflows', 'Appointment booking workflows')}</li>
                    <li>{t('Daily booking summary report', 'Daily booking summary report')}</li>
                    <li>{t('Staff takeover command', 'Staff takeover command')}</li>
                    <li>{t('Priority setup & support', 'Priority setup & support')}</li>
                  </ul>
                  <div className="mt-4">
                    <StarBorder as="a" href="https://wa.me/8801328446600" className="btn-neon pixel w-100" color="#39FF14">
                      CONTACT US
                    </StarBorder>
                  </div>
                </TiltedCard>
              </Reveal>
            </div>

            {/* Premium */}
            <div className="col-md-12 col-lg-4">
              <Reveal delay={0.2}>
                <TiltedCard className="arcade-card h-100 d-flex flex-column">
                  <h2 className="pixel">Premium</h2>
                  <p className="price neon-text">{t('Contact Us', 'যোগাযোগ করুন')}</p>
                  <p className="mt-2">{t('Advanced multi-channel automation tailored to your clinic.', 'আপনার ক্লিনিকের জন্য custom multi-channel automation।')}</p>
                  <ul className="text-start mt-4 flex-grow-1">
                    <li>{t('Everything in Standard, plus:', 'Standard-এর সব, আরও:')}</li>
                    <li>{t('Custom clinic workflows', 'Custom clinic workflows')}</li>
                    <li>{t('Advanced integrations', 'Advanced integrations')}</li>
                    <li>{t('Dedicated success manager', 'Dedicated success manager')}</li>
                    <li>{t('Tailored reporting & analytics', 'Tailored reporting & analytics')}</li>
                    <li>{t('Priority 24/7 support', 'Priority 24/7 support')}</li>
                  </ul>
                  <div className="mt-4">
                    <StarBorder as="a" href="https://wa.me/8801328446600" className="btn-neon pixel w-100" color="#39FF14">
                      CONTACT US
                    </StarBorder>
                  </div>
                </TiltedCard>
              </Reveal>
            </div>
          </div>

          {/* Ramadan inline banner */}
          {/* REMOVE AFTER RAMADAN 2026 */}
          {new Date() <= new Date('2026-04-30') && (
            <Reveal>
              <div className="ramadan-inline mt-4">
                <T
                  en="🌙 Ramadan Special — First 14 Days Free. Start this week, pay nothing until Eid."
                  bn="🌙 রমজান স্পেশাল — প্রথম ১৪ দিন ফ্রি। এই সপ্তাহে শুরু করুন, ঈদের আগে কোনো টাকা নেই।"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ SECTION 6 — FAQ ══ */}
      <section className="botter-faq" id="faq">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('COMMON QUESTIONS', 'সাধারণ প্রশ্ন')}</div>
          </Reveal>

          <div className="faq-list">
            {[
              {
                en_q: "Will patients know they're talking to a bot?",
                bn_q: 'রোগীরা কি বুঝবে যে এটা bot?',
                en_a: "Botter is designed to feel human — natural Banglish, context-aware replies. Most patients won't notice. And if they ask directly, Botter answers honestly and offers to connect them with staff.",
                bn_a: 'Botter মানুষের মতো কথা বলে — স্বাভাবিক Banglish, প্রসঙ্গ বুঝে reply দেয়। বেশিরভাগ রোগী বুঝবে না। যদি সরাসরি জিজ্ঞেস করে, Botter সৎভাবে বলে এবং staff-এর সাথে connect করে দেয়।',
              },
              {
                en_q: 'What if a patient has a complex question?',
                bn_q: 'জটিল প্রশ্ন করলে কী হবে?',
                en_a: 'Botter handles standard booking and FAQs. For complex queries, it captures the details and flags it for your staff to follow up — no patient gets left hanging.',
                bn_a: 'Botter সাধারণ booking আর FAQ handle করে। জটিল প্রশ্নের জন্য সব তথ্য নিয়ে রাখে এবং আপনার staff-কে জানায় — কোনো রোগী অসম্পূর্ণ থাকে না।',
              },
              {
                en_q: 'How long does setup take?',
                bn_q: 'Setup করতে কতক্ষণ লাগে?',
                en_a: "Once you complete our onboarding form (5 min), just provide us with the clinic's services & prices, your standard FAQs, and a general document about your clinic. That's all we need — we go live within 24 hours.",
                bn_a: 'আমাদের onboarding form (৫ মিনিট) পূরণ করার পর, শুধু দিন: আপনার সেবা ও মূল্যের তালিকা, ক্লিনিকের সাধারণ FAQ, আর ক্লিনিক সম্পর্কে একটা general document। ব্যস — ২৪ ঘণ্টায় live।',
              },
              {
                en_q: 'Can my staff override Botter at any time?',
                bn_q: 'Staff কি যেকোনো সময় control নিতে পারবে?',
                en_a: 'Yes. Any staff member can type a simple command to take over any conversation instantly. Botter steps back until they hand it back.',
                bn_a: 'হ্যাঁ। যেকোনো staff member একটা simple command দিয়ে যেকোনো conversation নিজে নিতে পারবে। Botter সরে যাবে যতক্ষণ না তারা ফিরিয়ে দেয়।',
              },
              {
                en_q: 'Is there a long-term contract?',
                bn_q: 'দীর্ঘমেয়াদী চুক্তি আছে?',
                en_a: 'No. Month to month. Cancel any time with zero penalty.',
                bn_a: 'না। মাসে মাসে। যেকোনো সময় বিনা জরিমানায় বাতিল করুন।',
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <FaqItem
                  q={t(faq.en_q, faq.bn_q)}
                  a={t(faq.en_a, faq.bn_a)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — FINAL CTA ══ */}
      <section className="botter-final-cta">
        <div className="container-xxl">
          <Reveal>
            <h2 className="final-cta-headline pixel neon-text">
              <span className="d-block">{t('Sleep Well.', 'নিশ্চিন্তে ঘুমান।')}</span>
              <span className="d-block">{t("Botter's Got the Night.", 'রাতটা Botter-এর হাতে।')}</span>
            </h2>
            <StarBorder as={Link} to="/onboard" className="btn-neon pixel" color="#39FF14">
              {t('Start Free 14-Day Trial →', '১৪ দিন ফ্রি শুরু করুন →')}
            </StarBorder>

            <p className="final-cta-meta">
              {t(
                'No credit card required · Setup in 24 hrs · WhatsApp support',
                'কোনো card লাগবে না · ২৪ ঘণ্টায় setup · WhatsApp support'
              )}
            </p>

            <div className="final-cta-contact">
              <p className="mb-2" style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                {t('Questions?', 'প্রশ্ন আছে?')}
              </p>
              <a
                href="https://wa.me/8801328446600"
                target="_blank"
                rel="noreferrer"
                className="btn-neon pixel"
                style={{ display: 'inline-block', padding: '0.55rem 1.4rem', border: '1px solid var(--neon)', color: 'var(--neon)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.05em' }}
              >
                {t('CONTACT US ON WHATSAPP', 'WhatsApp-এ যোগাযোগ করুন')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
