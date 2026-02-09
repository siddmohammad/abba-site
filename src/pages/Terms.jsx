import { Link } from 'react-router-dom';
import useMeta from '../hooks/useMeta';
import '../styles/legal.css';

export default function Terms() {
  useMeta({
    title: 'Service Agreement — ABBA',
    description: 'ABBA Service Agreement and Terms of Use',
    ogUrl: 'https://getabba.info/terms',
  });

  return (
    <div className="content-wrapper">
      <h1 className="pixel neon-text page-title">SERVICE AGREEMENT</h1>
      <div className="legal-content">
        <p><strong>Effective Date:</strong> Upon acceptance of services</p>
        <p><strong>Between:</strong> ABBA (Always Building Better Automation) (&ldquo;ABBA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and you, the client (&ldquo;Client&rdquo;, &ldquo;you&rdquo;)</p>

        <h2 className="legal-section-title pixel">1. Introduction &amp; Acceptance</h2>
        <p>This Service Agreement governs your use of ABBA&apos;s automation services. By signing up, submitting a registration form, making a payment, or using our services, you agree to these terms.</p>
        <p>ABBA provides automation-as-a-service for WhatsApp Business, Facebook Messenger, Instagram Direct Messages, and other messaging platforms. We help businesses automate customer communication, route appointments, and capture leads.</p>

        <h2 className="legal-section-title pixel">2. Services Provided</h2>
        <p>ABBA provides the following services:</p>
        <ul>
          <li>Setup and operation of automated messaging workflows for your business</li>
          <li>Connection of AI-assisted chat and voice handling to your approved channels</li>
          <li>Message routing, lead capture, and appointment coordination</li>
          <li>Internal reporting and conversation summaries where applicable</li>
          <li>Technical support for setup, configuration, and troubleshooting</li>
        </ul>
        <p>Services are delivered through our platform using third-party messaging infrastructure (e.g., WhatsApp, Meta platforms) and cloud services.</p>

        <h2 className="legal-section-title pixel">3. Client Responsibilities</h2>
        <p>You are responsible for:</p>
        <ul>
          <li>Providing accurate business information, messaging content, and configuration details</li>
          <li>Ensuring you have legal authority to connect and operate the WhatsApp numbers and social media accounts you provide to us</li>
          <li>Obtaining necessary consents from your customers or patients where required by law</li>
          <li>Making authorized staff available for setup, training, and support</li>
          <li>Ensuring your use of the service complies with applicable laws and platform terms of service</li>
        </ul>
        <p>You acknowledge that ABBA is not responsible for content you choose to send, how you use customer data, or compliance with your industry-specific regulations.</p>

        <h2 className="legal-section-title pixel">4. Authorization</h2>
        <p>By using ABBA, you explicitly authorize us to:</p>
        <ul>
          <li>Connect automation to your WhatsApp Business account, Facebook page, Instagram account, or other messaging channels you designate</li>
          <li>Send and receive messages on your behalf as part of the automated workflows</li>
          <li>Access conversation history and metadata necessary to deliver the service</li>
        </ul>
        <p>You may revoke this authorization at any time by terminating the service.</p>

        <h2 className="legal-section-title pixel">5. Fees &amp; Payment</h2>
        <p>ABBA services are billed on a monthly recurring basis unless otherwise agreed in writing. Fees are charged in advance for each billing period.</p>
        <p>If payment is not received, we may pause or suspend services until payment is made. Continued non-payment may result in termination and data deletion as described in our Privacy Policy.</p>
        <p>Fees are subject to change with reasonable notice and will not apply retroactively. No refunds are provided for partial months or early termination.</p>

        <h2 className="legal-section-title pixel">6. Data Ownership &amp; Privacy</h2>
        <p><strong>You own your data.</strong> All business information, customer conversations, and patient data you provide or generate through the service remains your property.</p>
        <p>ABBA acts as a data processor on your behalf. We process data solely to deliver the services you&apos;ve requested. We do not sell, share, or reuse your data for other clients.</p>
        <p>Data handling, retention, and deletion are detailed in our <Link to="/privacy">Privacy Policy</Link>. By using ABBA, you also agree to the terms of that policy.</p>

        <h2 className="legal-section-title pixel">7. Limitations of Liability</h2>
        <p>ABBA is an automation platform, not a substitute for human judgment. We do not provide:</p>
        <ul>
          <li>Medical advice, diagnosis, or treatment recommendations</li>
          <li>Emergency response or crisis intervention services</li>
          <li>Legal, financial, or professional advice of any kind</li>
        </ul>
        <p><strong>ABBA is not liable for:</strong></p>
        <ul>
          <li>Lost revenue, missed appointments, or business outcomes</li>
          <li>Errors in content you provide or configure</li>
          <li>Third-party platform outages (e.g., WhatsApp downtime, Meta API changes)</li>
          <li>Unauthorized access resulting from your failure to secure credentials</li>
          <li>Decisions made by your staff or customers based on automated responses</li>
        </ul>
        <p>To the fullest extent permitted by law, ABBA&apos;s total liability for any claim arising from this agreement is limited to the fees you paid in the three (3) months prior to the claim.</p>

        <h2 className="legal-section-title pixel">8. Service Availability</h2>
        <p>We aim to provide reliable service but do not guarantee uninterrupted access. Scheduled maintenance, third-party outages, and force majeure events may cause temporary disruptions.</p>
        <p>ABBA is not responsible for limitations, suspensions, or restrictions imposed by third-party platforms such as WhatsApp, Meta, or cloud infrastructure providers.</p>

        <h2 className="legal-section-title pixel">9. Termination</h2>
        <p>Either party may terminate this agreement with written notice.</p>
        <p>Upon termination:</p>
        <ul>
          <li>Services will be disabled within a reasonable timeframe</li>
          <li>You may request export of your data</li>
          <li>Data will be deleted or anonymized after a retention period as described in the Privacy Policy</li>
          <li>Outstanding fees remain due</li>
        </ul>
        <p>ABBA reserves the right to terminate this agreement immediately if you violate these terms, engage in fraudulent activity, or use the service in a manner that harms ABBA or third parties.</p>

        <h2 className="legal-section-title pixel">10. Modifications</h2>
        <p>ABBA may update this Service Agreement from time to time. We will notify you of material changes via email or in-platform notification. Continued use of the service after changes take effect constitutes acceptance of the updated terms.</p>

        <h2 className="legal-section-title pixel">11. General Terms</h2>
        <p><strong>Entire Agreement:</strong> This agreement, together with the Privacy Policy, constitutes the entire agreement between you and ABBA.</p>
        <p><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
        <p><strong>No Waiver:</strong> Failure to enforce any right does not waive that right.</p>
        <p><strong>Assignment:</strong> You may not assign this agreement without written consent. ABBA may assign it in connection with a merger, acquisition, or asset sale.</p>
        <p><strong>Governing Principles:</strong> This agreement is governed by principles of good faith, fair dealing, and mutual benefit.</p>

        <h2 className="legal-section-title pixel">12. Contact</h2>
        <p>
          Email: <a href="mailto:support@getabba.info">support@getabba.info</a><br />
          Website: <a href="https://getabba.info">https://getabba.info</a>
        </p>
      </div>
    </div>
  );
}
