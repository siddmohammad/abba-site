import useMeta from '../hooks/useMeta';

export default function About() {
  useMeta({
    title: 'About — ABBA — Always Building Better Automations',
    description: 'ABBA prevents customer loss from slow replies, missed messages, and poor follow-up. A WhatsApp-first front-desk system we run with you — built for Bangladesh.',
    ogUrl: 'https://getabba.info/about',
  });

  return (
    <main>
      {/* Hero */}
      <section className="py-5" id="about">
        <div className="container-xxl">
          <h1 className="display-5 mb-3 pixel">ABBA stops customers from slipping away</h1>
          <p className="lead">
            Businesses don&apos;t lose customers because they&apos;re bad — they lose them because replies are late, messages are missed, and follow-ups don&apos;t happen.
            ABBA runs your WhatsApp front desk so every inquiry gets handled fast, correctly, and handed over to staff when needed.
          </p>
        </div>
      </section>

      {/* What we solve */}
      <section className="py-5 border-top border-2 border-success-subtle" id="problems">
        <div className="container-xxl">
          <h2 className="section-title pixel mb-4">What we solve</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Instant Replies</h3>
                <p className="mb-0 small">24/7 answers on WhatsApp, Facebook, and Instagram so customers never wait. Escalates to staff when needed.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Clean Handover</h3>
                <p className="mb-0 small">Captures key details (service + time window + contact) and alerts staff with full context so no serious inquiry gets lost.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Appointment Booking</h3>
                <p className="mb-0 small">Automated scheduling workflows handle confirmations and reminders without manual coordination.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Leak Visibility</h3>
                <p className="mb-0 small">Daily or weekly summaries showing inquiries received, handled, and missed — so you can fix leaks before revenue drops.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How ABBA works */}
      <section className="py-5 border-top border-2 border-success-subtle" id="platform">
        <div className="container-xxl">
          <h2 className="section-title pixel mb-4">How ABBA works</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Multi-Platform Coverage</h3>
                <p className="mb-0 small">WhatsApp, Facebook Messenger, and Instagram DMs. ABBA operates across all platforms with Bangla, English, and Banglish support. Human handover and staff alerts are included.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Central Logging</h3>
                <p className="mb-0 small">Every inquiry is logged into a clean system your staff can access anytime — useful for follow-ups, accountability, and operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ABBA */}
      <section className="py-5 border-top border-2 border-success-subtle" id="why">
        <div className="container-xxl">
          <h2 className="section-title pixel mb-4">Why ABBA</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Bangla-first</h3>
                <p className="mb-0 small">Natural Bangla and Banglish for Bangladeshi customers, with smooth English when needed.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Built for ROI</h3>
                <p className="mb-0 small">Pricing designed around time saved and revenue lift, not arbitrary feature limits.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Quality Control</h3>
                <p className="mb-0 small">Internal testing, client UAT, and error monitoring mean fewer surprises in production.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="arcade-card h-100">
                <h3 className="h6 pixel">Ongoing Support</h3>
                <p className="mb-0 small">We don&apos;t disappear after launch. We monitor performance and keep improving.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-5 border-top border-2 border-success-subtle" id="video">
        <div className="container-xxl">
          <h2 className="section-title pixel mb-4">Video Demo</h2>
          <div className="ratio ratio-16x9 rounded-4 shadow-sm">
            <video controls autoPlay muted loop playsInline className="w-100 rounded-4 shadow-sm" preload="none">
              <source src="/videos/DemoBookings.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-3 text-muted small">
            This is the live demo of ABBA Botter — showcasing WhatsApp automation in action.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 border-top border-2 border-success-subtle" id="testimonials">
        <div className="container-xxl">
          <h2 className="section-title pixel mb-4">Testimonials</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="arcade-card h-100">
                <p className="mb-1">&ldquo;ABBA turned our WhatsApp into a 24/7 desk. Weekend leads got answers fast—and more of them converted.&rdquo;</p>
                <div className="small text-muted">— Ratul Zaman</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="arcade-card h-100">
                <p className="mb-1">&ldquo;Daily sales digests and clean Sheets logging mean zero copy-paste. Team focuses on closing, not admin.&rdquo;</p>
                <div className="small text-muted">— Goutam Banik</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a className="btn btn-neon pixel" href="https://wa.me/8801337411069">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
