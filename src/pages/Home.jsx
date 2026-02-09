import SplashScreen from '../components/layout/SplashScreen';
import useScrollToHash from '../hooks/useScrollToHash';
import useMeta from '../hooks/useMeta';
import SplitText from '../reactbits/SplitText';
import TiltedCard from '../reactbits/TiltedCard';
import StarBorder from '../reactbits/StarBorder';

export default function Home() {
  useScrollToHash();
  useMeta({
    title: 'ABBA — Always Building Better Automation',
    description: 'Retro-arcade landing for ABBA.ai — sales agent for Bangladeshi businesses. Press Start to enter.',
    ogUrl: 'https://getabba.info/',
  });

  return (
    <>
      <SplashScreen />
      <main id="home">
        {/* Hero */}
        <header className="hero">
          <div className="container-xxl">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <h1 className="pixel section-title neon-text mb-3">
                  {['Always', 'Building', 'Better', 'Automations'].map((word, i) => (
                    <span className="d-block" key={word}>
                      <SplitText
                        text={word}
                        splitType="chars"
                        delay={0.3 + i * 0.25}
                        staggerTime={0.05}
                        from={{ opacity: 0, y: 40, scale: 0.8 }}
                        to={{ opacity: 1, y: 0, scale: 1 }}
                      />
                    </span>
                  ))}
                </h1>
                <p className="text-success-50 mb-4">
                  ABBA helps businesses automate growth — from sales and lead capture to follow-ups, bookings, and reports — in any language, 24/7.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <a className="btn btn-neon pixel" href="#cta">Stop Losing Customers</a>
                </div>
                <div className="mt-4 channel-logos d-flex gap-3 align-items-center">
                  <img alt="WhatsApp" src="https://cdn.simpleicons.org/whatsapp/39FF14" title="WhatsApp" />
                  <img alt="Facebook" src="https://cdn.simpleicons.org/facebook/39FF14" title="Facebook" />
                  <img alt="Instagram" src="https://cdn.simpleicons.org/instagram/39FF14" title="Instagram" />
                  <img alt="Google Sheets" src="https://cdn.simpleicons.org/googlesheets/39FF14" title="Google Sheets" />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="arcade-card text-center">
                  <div className="pixel neon-text mb-2">botter says hi!</div>
                  <img
                    alt="Botter head"
                    className="splash-botter img-fluid"
                    src="/assets/botter-head.png"
                    style={{ width: '100%', maxWidth: '260px', filter: 'drop-shadow(0 0 12px rgba(57,255,20,.6))' }}
                  />
                  <div className="small text-success-50">Not just an average bot &bull; its botter</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stop Losing Customers */}
        <section className="py-4" id="about">
          <div className="container-xxl">
            <div className="row g-3">
              <div className="text-center">
                <div className="pixel neon-text section-heading mb-1">STOP LOSING CUSTOMERS</div>
              </div>
              <div className="col-md-4">
                <div className="arcade-card h-100">
                  <div className="pixel">&#10060; Customers message but no one replies fast enough.</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="arcade-card h-100">
                  <div className="pixel">&#10060; Staff forget to follow up and customers slip away.</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="arcade-card h-100">
                  <div className="pixel">&#10060; Competitors close deals faster, even if their product/service is worse.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features — Power Ups */}
        <section className="py-5 feature-powerups" id="features">
          <div className="container-xxl">
            <div className="text-center">
              <div className="pixel neon-text section-heading mb-1">FEATURES — POWER UPS</div>
            </div>
            <div className="marquee"></div>
            <div className="row g-4 mt-1 power-grid">
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#9889;</div>
                  <h3 className="pixel">Instant Lead Capture</h3>
                  <p className="text-success-50 mb-0">Every DM = a lead. Logged to your sheet in seconds.</p>
                </TiltedCard>
              </div>
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#128222;</div>
                  <h3 className="pixel">Auto Follow-Ups</h3>
                  <p className="text-success-50 mb-0">Smart reminders keep conversations warm. Gentle nudges convert more customers without manual chasing.</p>
                </TiltedCard>
              </div>
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#128221;</div>
                  <h3 className="pixel">Content Auto-Pilot</h3>
                  <p className="text-success-50 mb-0">
                    Done-for-you social posts, captions, and schedules —
                    fresh content without lifting a finger. Keep your pages active,
                    consistent, and always on-brand.
                  </p>
                </TiltedCard>
              </div>
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#128202;</div>
                  <h3 className="pixel">Sales Reports</h3>
                  <p className="text-success-50 mb-0">Weekly &amp; monthly summaries with leads, response times, and conversion highlights. Delivered to WhatsApp/email.</p>
                </TiltedCard>
              </div>
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#128736;&#65039;</div>
                  <h3 className="pixel">Custom Workflows</h3>
                  <p className="text-success-50 mb-0">
                    Every business runs differently. ABBA designs automations
                    around your exact processes — from lead capture to
                    bookings — so your operations run seamlessly.
                  </p>
                </TiltedCard>
              </div>
              <div className="col-md-6 col-lg-4">
                <TiltedCard className="power-card h-100">
                  <div className="icon-pill">&#128225;</div>
                  <h3 className="pixel">Multi-Channel Mode</h3>
                  <p className="text-success-50 mb-0">
                    One agent, every arena. WhatsApp, Facebook, Instagram, email—
                    ABBA handles them all without context loss or extra setup.
                  </p>
                </TiltedCard>
              </div>
            </div>
            <div className="marquee"></div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5" id="cta">
          <div className="container-xxl text-center">
            <h2 className="pixel section-title neon-text">Stop Losing Customers.</h2>
            <h2 className="pixel section-title neon-text">Start Automating.</h2>
            <p className="text-success-50">Book a demo and see how ABBA captures and follows up on your leads.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <StarBorder as="a" href="mailto:hamoody@getabba.info" className="btn-neon pixel" color="#39FF14">
                Join the Game
              </StarBorder>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
