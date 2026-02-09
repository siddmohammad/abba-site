import useMeta from '../hooks/useMeta';
import useScrollToHash from '../hooks/useScrollToHash';
import CountUp from '../reactbits/CountUp';
import TiltedCard from '../reactbits/TiltedCard';
import StarBorder from '../reactbits/StarBorder';

export default function Pricing() {
  useScrollToHash();
  useMeta({
    title: 'Pricing — ABBA',
    description: 'Simple pricing for AI sales & support bots, bookings, and CRM automations.',
    ogUrl: 'https://getabba.info/pricing',
  });

  return (
    <>
      <header className="hero">
        <div className="container-xxl">
          <div className="row align-items-center g-4">
            <div className="col-lg-12 text-center">
              <h1 className="pixel hero-title neon-text mb-3">Simple, Transparent Pricing</h1>
              <p className="text-success-50 mb-4">No hidden fees. Choose the plan that matches your business needs.</p>
              <a className="btn btn-neon pixel" href="#plans">VIEW PLANS</a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5" id="plans">
        <div className="container-xxl">
          <div className="row g-4">
            {/* Lite Plan */}
            <div className="col-md-6 col-lg-4">
              <TiltedCard className="arcade-card h-100 d-flex flex-column">
                <h2 className="pixel">Lite</h2>
                <p className="price neon-text">&#2547;<CountUp from={0} to={12200} duration={2} separator="," /> <span className="fs-6">/ month</span></p>
                <p className="mt-2">Basic WhatsApp automation for small businesses getting started.</p>
                <ul className="text-start mt-4 flex-grow-1">
                  <li>One Platform auto-replies</li>
                  <li>Customer Info Capture</li>
                  <li>Appointment routing</li>
                  <li>Bangla + English support</li>
                  <li>Email notifications</li>
                </ul>
                <div className="mt-4">
                  <StarBorder as="a" href="mailto:hamoody@getabba.info" className="btn-neon pixel w-100" color="#39FF14">
                    GET STARTED
                  </StarBorder>
                </div>
              </TiltedCard>
            </div>

            {/* Standard Plan */}
            <div className="col-md-6 col-lg-4">
              <TiltedCard className="arcade-card h-100 d-flex flex-column">
                <h2 className="pixel">Standard</h2>
                <p className="price neon-text">&#2547;<CountUp from={0} to={18600} duration={2} delay={0.3} separator="," /> <span className="fs-6">/ month</span></p>
                <p className="mt-2">Full WhatsApp agent with multi-platform support.</p>
                <ul className="text-start mt-4 flex-grow-1">
                  <li>Everything in Lite, plus:</li>
                  <li>Multi-platform messaging (WhatsApp + FB + IG)</li>
                  <li>Appointment booking workflows</li>
                  <li>Daily Report Botter</li>
                  <li>Priority setup &amp; support</li>
                  <li>Custom conversation flows</li>
                  <li>Direct Staff notifications</li>
                  <li>Advanced lead qualification</li>
                </ul>
                <div className="mt-4">
                  <StarBorder as="a" href="mailto:hamoody@getabba.info" className="btn-neon pixel w-100" color="#39FF14">
                    GET STARTED
                  </StarBorder>
                </div>
              </TiltedCard>
            </div>

            {/* Premium Plan */}
            <div className="col-md-12 col-lg-4">
              <TiltedCard className="arcade-card h-100 d-flex flex-column">
                <h2 className="pixel">Premium</h2>
                <p className="price neon-text">Contact Us</p>
                <p className="mt-2">Advanced multi-channel automation tailored to your clinic&apos;s needs.</p>
                <ul className="text-start mt-4 flex-grow-1">
                  <li>Everything in Standard, plus:</li>
                  <li>Custom clinic workflows</li>
                  <li>Voice Botter support</li>
                  <li>Advanced integrations</li>
                  <li>Dedicated success manager</li>
                  <li>Tailored reporting &amp; analytics</li>
                  <li>Priority 24/7 support</li>
                </ul>
                <div className="mt-4">
                  <StarBorder as="a" href="mailto:hamoody@getabba.info" className="btn-neon pixel w-100" color="#39FF14">
                    CONTACT US
                  </StarBorder>
                </div>
              </TiltedCard>
            </div>
          </div>

          {/* Included in All Plans */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="arcade-card">
                <h3 className="pixel neon-text mb-3">Included in All Plans</h3>
                <div className="row g-3 small">
                  <div className="col-12 col-md-6 col-lg-3">&#10004; Setup &amp; onboarding session</div>
                  <div className="col-12 col-md-6 col-lg-3">&#10004; Basic playbook &amp; SOPs</div>
                  <div className="col-12 col-md-6 col-lg-3">&#10004; Email/WhatsApp reports</div>
                  <div className="col-12 col-md-6 col-lg-3">&#10004; Team notifications &amp; handover</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ + Ready to Play */}
          <div className="row mt-4 g-4" id="demo">
            <div className="col-12 col-lg-8">
              <div className="arcade-card">
                <h4 className="pixel">FAQ</h4>
                <details className="mb-2">
                  <summary className="pixel">Is there any setup fee?</summary>
                  <p className="mt-2 small">No separate setup fee. Complex customizations can be quoted if needed.</p>
                </details>
                <details className="mb-2">
                  <summary className="pixel">Does price include WhatsApp/Facebook charges?</summary>
                  <p className="mt-2 small">Platform conversation fees are billed by their providers. We keep your plan simple and flat. If volumes grow significantly, we&apos;ll suggest optimizations.</p>
                </details>
                <details className="mb-2">
                  <summary className="pixel">How does ABBA help my business?</summary>
                  <p className="mt-2 small">It saves time by instantly answering FAQs, qualifying buyers, creating quotes, and sending daily sales reports — so your team can focus on closing deals, not copy-pasting answers.</p>
                </details>
                <details className="mb-2">
                  <summary className="pixel">Do I need technical skills to use it?</summary>
                  <p className="mt-2 small">No. We handle setup, integration with Google Sheets/CRM, and training. You and your staff just use WhatsApp or Messenger as usual.</p>
                </details>
                <details className="mb-2">
                  <summary className="pixel">How do I book a demo?</summary>
                  <p className="mt-2 small">Click the &ldquo;Book a Demo&rdquo; button or email us at <a href="mailto:hamoody@getabba.info">hamoody@getabba.info</a>. We&apos;ll show you a live walkthrough.</p>
                </details>
                <details className="mb-2">
                  <summary className="pixel">Can I upgrade or downgrade plans?</summary>
                  <p className="mt-2 small">Yes. You can change plans anytime with notice. We&apos;ll help you migrate smoothly.</p>
                </details>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="arcade-card text-center">
                <h4 className="pixel neon-text">Ready to Play?</h4>
                <p className="small text-success-50">Book a live demo and see how fast ABBA delivers.</p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <StarBorder as="a" href="https://wa.me/8801337411069" className="btn-neon pixel" color="#39FF14">
                    Contact Us
                  </StarBorder>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
