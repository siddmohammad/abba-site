import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import useMeta from '../hooks/useMeta';
import SplitText from '../reactbits/SplitText';
import GlowCard from '../reactbits/GlowCard';
import Marquee from '../reactbits/Marquee';
import StarBorder from '../reactbits/StarBorder';
import TiltedCard from '../reactbits/TiltedCard';
import CountUp from '../reactbits/CountUp';
import './Botter.css';
import GhostShiftHero from '../components/GhostShiftHero';

// ─── helpers ────────────────────────────────────────────────────────────────
function T({ en, bn }) {
  const { lang } = useLang();
  return lang === 'bn' ? bn : en;
}

function Reveal({ children, delay = 0, className = '', style = {} }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

// ─── WhatsApp mock chat ──────────────────────────────────────────────────────
function WaMock({ mini = false }) {
  const messages = [
    { type: 'user', text: 'Assalamu Alaikum, kal ki appointment available ache?', time: '11:47 PM' },
    { type: 'bot',  text: 'Wa alaikum assalam! 😊 Apnar nam ta jante pari? Kon service er jonno ashben?', time: '11:47 PM' },
    { type: 'user', text: 'Ami Nadia. Hair spa nite chai', time: '11:48 PM' },
    { type: 'bot',  text: 'Nadia Apa, আমরা Saturday থেকে available আছি। Apnar preferred time konta?', time: '11:48 PM' },
  ];

  const subset = mini ? messages.slice(0, 3) : messages;

  return (
    <div className={mini ? 'wa-mock-mini' : 'wa-mock'}>
      {!mini && (
        <div className="wa-mock-header">
          <div className="wa-avatar">B</div>
          <div>
            <div className="wa-clinic-name">Business Assistant</div>
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
          <span>Business was closed.</span> Botter captured the booking.
        </div>
      )}
    </div>
  );
}

// ─── Promo Banner ────────────────────────────────────────────────────────────
function PromoBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('promo-dismissed') === '1'
  );
  if (dismissed) return null;

  return (
    <div className="ramadan-banner">
      <T
        en="⚡ Limited Time — Start your FREE 14-day trial today. No credit card required."
        bn="⚡ সীমিত সময় — আজই শুরু করুন ১৪ দিনের ফ্রি ট্রায়াল। কোনো কার্ড লাগবে না।"
      />
      <button
        className="close-btn"
        onClick={() => { sessionStorage.setItem('promo-dismissed', '1'); setDismissed(true); }}
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
    title: 'Botter by ABBA — Your Business Never Misses a Lead',
    description: 'Off-hours AI agent for any business. Botter replies to every customer on WhatsApp, Facebook & Instagram — 24/7, in natural Bangla.',
    ogUrl: 'https://getabba.info/',
  });

  return (
    <div className="botter-page">

      {/* ── Promo Banner ── */}
      <PromoBanner />

      {/* ══ GHOST SHIFT HERO ══ */}
      <GhostShiftHero />

      {/* All sections below the pinned hero need a solid wrapper so they
          paint above the hero's z-index:20 and the fixed background layers */}
      <div className="botter-sections-wrap">

      {/* ══ SECTION 2 — PAIN ══ */}
      <section className="botter-pain">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('THE PROBLEM', 'সমস্যাটা কী')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Every Night, You\'re Losing Customers You Already Had.', 'প্রতি রাতে আপনার customer অন্য জায়গায় চলে যাচ্ছে।')}
            </h2>
          </Reveal>

          <div className="row g-3">
            {[
              {
                icon: '🌙',
                en_title: '10 PM Message. Gone by Morning.',
                bn_title: 'রাতে message, সকালে gone',
                en_body: 'A customer messages at 10pm. By morning, they\'ve already booked with the business that replied first.',
                bn_body: 'রাত ১০টায় একজন customer message করে। সকালে দেখেন — সে অন্য জায়গায় চলে গেছে।',
              },
              {
                icon: '📵',
                en_title: 'Weekend Closed = Lost Leads',
                bn_title: 'শুক্রবার বন্ধ = lead হারানো',
                en_body: 'Your business is closed on weekends and holidays. But customers don\'t stop looking. They message 2–3 places — whoever replies first wins.',
                bn_body: 'ছুটির দিনে ব্যবসা বন্ধ। কিন্তু customer তো থামে না। তারা ২-৩ জায়গায় message করে — যে আগে reply দেয়, সে জেতে।',
              },
              {
                icon: '👤',
                en_title: "Staff Can't Reply 24/7",
                bn_title: 'Staff সবসময় থাকে না',
                en_body: 'Your staff go home. After that, every after-hours message is a lead you\'re gambling with.',
                bn_body: 'আপনার staff বাড়ি চলে যায়। তারপর যত message আসে — সব জুয়া।',
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
              {t('Botter Is Your Always-On Front Desk.', 'Botter হলো আপনার সবসময়-চালু front desk।')}
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
                en_title: 'Customer Sends a Message',
                bn_title: 'Customer message পাঠায়',
                en_body: 'They DM your business on WhatsApp, Facebook, or Instagram — any time, day or night.',
                bn_body: 'Customer আপনার business-এ WhatsApp, Facebook বা Instagram-এ message করে — যেকোনো সময়।',
              },
              {
                num: '02',
                en_title: 'Botter Replies Instantly',
                bn_title: 'Botter সাথে সাথে reply দেয়',
                en_body: 'In natural Bangla. Collects their name, the service they need, and their preferred time. No robotic responses.',
                bn_body: 'স্বাভাবিক Bangla-তে। customer-এর নাম, কী সেবা দরকার, কখন আসতে চান — সব নেয়। Robot-এর মতো না।',
              },
              {
                num: '03',
                en_title: 'Your Staff Confirms in the Morning',
                bn_title: 'সকালে আপনার staff confirm করে',
                en_body: 'You arrive to a clean list of qualified leads. Your team confirms the booking. Human touch stays. No customer slips through.',
                bn_body: 'সকালে এসে দেখেন ready list। আপনার team booking confirm করে। মানবিক স্পর্শ থাকে। কোনো customer হারায় না।',
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
            <div className="section-label">{t('WHY BUSINESSES TRUST BOTTER', 'ব্যবসাগুলো কেন Botter বিশ্বাস করে')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Built for Any Business That Can\'t Afford to Miss a Lead.', 'যে business একটা lead-ও miss করতে পারে না, তাদের জন্য।')}
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
                    'Not translated English. Real Banglish that your customers actually use. They won\'t know it\'s a bot.',
                    'Translated English না। আসল Banglish যেটা আপনার customer-রা ব্যবহার করে। তারা বুঝতেই পারবে না এটা bot।'
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

      {/* ══ SECTION 4.5 — THE ABBA DIFFERENCE ══ */}
      <section className="botter-why" id="why">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('THE ABBA DIFFERENCE', 'কেন ABBA আলাদা')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Zero New Software. Your Channels, Supercharged.', 'কোনো নতুন software নেই। আপনার সব channel, supercharged।')}
            </h2>
            <p className="section-sub mt-2" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
              {t(
                'Your competitors adopted a new dashboard. You didn\'t have to.',
                'আপনার competitor নতুন dashboard নিয়েছে। আপনি নেননি।'
              )}
            </p>
          </Reveal>

          <div className="row g-3">
            {[
              {
                icon: '🔌',
                en_title: 'The Invisible Layer',
                bn_title: 'অদৃশ্য layer',
                en_body: 'ABBA sits inside your existing WhatsApp, Facebook, and Instagram. No new app, no new login. Customers talk to you exactly as before — the AI handles it 24/7.',
                bn_body: 'ABBA আপনার existing WhatsApp, Facebook, আর Instagram-এর ভেতরে কাজ করে। নতুন app নেই, নতুন login নেই। Customer আগের মতোই message করে — AI ২৪/৭ handle করে।',
              },
              {
                icon: '🗣️',
                en_title: 'Hyper-Local AI',
                bn_title: 'স্থানীয় ভাষায় AI',
                en_body: 'Flawless Bangla, English, and Banglish — including local slang. Your customers feel like they\'re talking to a real person, not a foreign chatbot.',
                bn_body: 'নির্ভুল বাংলা, English, আর Banglish — স্থানীয় slang সহ। আপনার customer মনে করবে একজন মানুষের সাথে কথা বলছে।',
              },
              {
                icon: '🎓',
                en_title: 'No Training Required',
                bn_title: 'কোনো training দরকার নেই',
                en_body: 'Your staff doesn\'t learn anything new. They keep doing what they do. We handle setup, integration, and maintenance — you just approve and go live.',
                bn_body: 'আপনার staff-কে কিছু শিখতে হবে না। তারা আগের মতোই কাজ করবে। Setup, integration, আর maintenance আমরা করি।',
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
        </div>
      </section>

      {/* ══ SECTION 4.6 — SOCIAL PROOF ══ */}
      <section className="botter-results" id="results">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('SOCIAL PROOF', 'বাস্তব ফলাফল')}</div>
            <h2 className="section-headline pixel neon-text">
              {t('Real Results. Real Businesses.', 'বাস্তব ফলাফল। বাস্তব ব্যবসা।')}
            </h2>
          </Reveal>

          {/* Metrics */}
          <div className="row g-3 mb-4 text-center">
            {[
              { to: 90, suffix: '%', en_label: 'AI Automation Rate', bn_label: 'AI handle করা inquiries', static: false },
              { to: 3,  suffix: 'x', en_label: 'Faster Lead Response', bn_label: 'দ্রুত lead reply', static: false },
              { to: null, suffix: '24/7', en_label: 'Always On', bn_label: 'সবসময় চালু', static: true },
            ].map((m, i) => (
              <div key={i} className="col-md-4">
                <Reveal delay={i * 0.1}>
                  <GlowCard>
                    <div className="results-metric-num neon-text pixel">
                      {m.static
                        ? m.suffix
                        : <><CountUp from={0} to={m.to} duration={1.5} separator="," />{m.suffix}</>
                      }
                    </div>
                    <div className="results-metric-label">{t(m.en_label, m.bn_label)}</div>
                  </GlowCard>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="row g-3">
            {[
              {
                en_quote: 'ABBA turned our WhatsApp into a 24/7 desk. Weekend leads got answers fast — and more of them converted.',
                bn_quote: 'ABBA আমাদের WhatsApp-কে ২৪/৭ desk বানিয়ে দিয়েছে। Weekend-এ lead গুলো দ্রুত উত্তর পেয়েছে — এবং আরও বেশি convert হয়েছে।',
                name: 'Ratul Zaman',
              },
              {
                en_quote: 'Daily sales digests and clean logging mean zero copy-paste. Team focuses on closing, not admin.',
                bn_quote: 'Daily sales digest আর clean logging মানে শূন্য copy-paste। team closing-এ মনোযোগ দেয়, admin-এ না।',
                name: 'Goutam Banik',
              },
            ].map((t_item, i) => (
              <div key={i} className="col-md-6">
                <Reveal delay={i * 0.1}>
                  <GlowCard>
                    <p className="testimonial-quote">"{t(t_item.en_quote, t_item.bn_quote)}"</p>
                    <div className="testimonial-name neon-text">— {t_item.name}</div>
                  </GlowCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — PRICING ══ */}
      <section className="botter-pricing" id="pricing">
        <div className="container-xxl">
          <Reveal className="text-center mb-4">
            <div className="section-label">{t('PRICING', 'মূল্য')}</div>
            <h2 className="section-headline pixel neon-text">
              {t(
                "Your Staff Can't Be Everywhere at Once. Botter Can.",
                'আপনার staff একসাথে সব জায়গায় থাকতে পারে না। কিন্তু Botter পারে।'
              )}
            </h2>
            <p className="section-sub mt-2" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              {t(
                'When WhatsApp, Facebook, and Instagram are all buzzing at the same time, something gets missed — and that "something" is usually a new customer. Botter absorbs every message instantly so your team can focus on the work in front of them, not the phone in their hand.',
                'একই সময়ে যখন WhatsApp, Facebook, এবং Instagram-এ মেসেজ আসতে থাকে, তখন কোনো না কোনো মেসেজ মিস হয়েই যায়—আর সেই মিস হওয়া মেসেজটি হয়তো একজন নতুন customer। Botter প্রতিটা মেসেজ মুহূর্তেই সামলে নেয়, যাতে আপনার team সামনের কাজে মনোযোগ দিতে পারে, হাতের ফোনে না।'
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
                  <p className="mt-2">{t('Basic automation for small businesses getting started.', 'ছোট business-এর জন্য basic automation।')}</p>
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
                  <p className="mt-2">{t('Full multi-platform agent for growing businesses.', 'বড় business-এর জন্য full multi-platform agent।')}</p>
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
                  <p className="mt-2">{t('Advanced multi-channel automation tailored to your business.', 'আপনার business-এর জন্য custom multi-channel automation।')}</p>
                  <ul className="text-start mt-4 flex-grow-1">
                    <li>{t('Everything in Standard, plus:', 'Standard-এর সব, আরও:')}</li>
                    <li>{t('Custom business workflows', 'Custom business workflows')}</li>
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

          {/* Limited time promo note */}
          <Reveal>
            <div className="ramadan-inline mt-4">
              <T
                en="⚡ Limited Time — 14-day free trial included. No credit card required."
                bn="⚡ সীমিত সময় — ১৪ দিনের ফ্রি ট্রায়াল পাবেন। কোনো কার্ড লাগবে না।"
              />
            </div>
          </Reveal>
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
                en_q: "Will customers know they're talking to a bot?",
                bn_q: 'Customers কি বুঝবে যে এটা bot?',
                en_a: "Botter is designed to feel human — natural Banglish, context-aware replies. Most customers won't notice. And if they ask directly, Botter answers honestly and offers to connect them with your team.",
                bn_a: 'Botter মানুষের মতো কথা বলে — স্বাভাবিক Banglish, প্রসঙ্গ বুঝে reply দেয়। বেশিরভাগ customer বুঝবে না। যদি সরাসরি জিজ্ঞেস করে, Botter সৎভাবে বলে এবং আপনার team-এর সাথে connect করে দেয়।',
              },
              {
                en_q: 'What if a customer has a complex question?',
                bn_q: 'জটিল প্রশ্ন করলে কী হবে?',
                en_a: 'Botter handles standard inquiries and FAQs. For complex queries, it captures the details and flags it for your team to follow up — no customer gets left hanging.',
                bn_a: 'Botter সাধারণ inquiry আর FAQ handle করে। জটিল প্রশ্নের জন্য সব তথ্য নিয়ে রাখে এবং আপনার team-কে জানায় — কোনো customer অসম্পূর্ণ থাকে না।',
              },
              {
                en_q: 'How long does setup take?',
                bn_q: 'Setup করতে কতক্ষণ লাগে?',
                en_a: "Once you complete our onboarding form (5 min), just provide us with your services & prices, your standard FAQs, and a general document about your business. That's all we need — we go live within 24 hours.",
                bn_a: 'আমাদের onboarding form (৫ মিনিট) পূরণ করার পর, শুধু দিন: আপনার সেবা ও মূল্যের তালিকা, আপনার business-এর সাধারণ FAQ, আর আপনার business সম্পর্কে একটা general document। ব্যস — ২৪ ঘণ্টায় live।',
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

      </div>{/* end .botter-sections-wrap */}

    </div>
  );
}
