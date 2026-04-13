import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Service Agreement — ABBA",
  description: "ABBA Service Agreement and Terms of Use",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24" style={{ background: "var(--background)" }}>
      <Navbar />

      <section className="flex-1 container mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-3xl md:text-5xl font-pixel mb-16 text-center print-jitter" style={{ color: "#39FF14" }}>
          SERVICE AGREEMENT
        </h1>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.8 }}>
          <div>
            <p><strong>Effective Date:</strong> Upon acceptance of services</p>
            <p><strong>Between:</strong> ABBA (Always Building Better Automation) (&ldquo;ABBA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and you, the client (&ldquo;Client&rdquo;, &ldquo;you&rdquo;)</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>1. Introduction &amp; Acceptance</h2>
            <p className="mb-2">This Service Agreement governs your use of ABBA&apos;s automation services. By signing up, submitting a registration form, making a payment, or using our services, you agree to these terms.</p>
            <p>ABBA provides automation-as-a-service for WhatsApp Business, Facebook Messenger, Instagram Direct Messages, and other messaging platforms. We help businesses automate customer communication, route appointments, and capture leads.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>2. Services Provided</h2>
            <p className="mb-2">ABBA provides the following services:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Setup and operation of automated messaging workflows for your business</li>
              <li>Connection of AI-assisted chat and voice handling to your approved channels</li>
              <li>Message routing, lead capture, and appointment coordination</li>
              <li>Internal reporting and conversation summaries where applicable</li>
              <li>Technical support for setup, configuration, and troubleshooting</li>
            </ul>
            <p>Services are delivered through our platform using third-party messaging infrastructure (e.g., WhatsApp, Meta platforms) and cloud services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>3. Client Responsibilities</h2>
            <p className="mb-2">You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Providing accurate business information, messaging content, and configuration details</li>
              <li>Ensuring you have legal authority to connect and operate the WhatsApp numbers and social media accounts you provide to us</li>
              <li>Obtaining necessary consents from your customers or patients where required by law</li>
              <li>Making authorized staff available for setup, training, and support</li>
              <li>Ensuring your use of the service complies with applicable laws and platform terms of service</li>
            </ul>
            <p>You acknowledge that ABBA is not responsible for content you choose to send, how you use customer data, or compliance with your industry-specific regulations.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>4. Authorization</h2>
            <p className="mb-2">By using ABBA, you explicitly authorize us to:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Connect automation to your WhatsApp Business account, Facebook page, Instagram account, or other messaging channels you designate</li>
              <li>Send and receive messages on your behalf as part of the automated workflows</li>
              <li>Access conversation history and metadata necessary to deliver the service</li>
            </ul>
            <p>You may revoke this authorization at any time by terminating the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>5. Fees &amp; Payment</h2>
            <p className="mb-2">ABBA services are billed on a monthly recurring basis unless otherwise agreed in writing. Fees are charged in advance for each billing period.</p>
            <p className="mb-2">If payment is not received, we may pause or suspend services until payment is made. Continued non-payment may result in termination and data deletion as described in our Privacy Policy.</p>
            <p>Fees are subject to change with reasonable notice and will not apply retroactively. No refunds are provided for partial months or early termination.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>6. Data Ownership &amp; Privacy</h2>
            <p className="mb-2"><strong>You own your data.</strong> All business information, customer conversations, and patient data you provide or generate through the service remains your property.</p>
            <p className="mb-2">ABBA acts as a data processor on your behalf. We process data solely to deliver the services you&apos;ve requested. We do not sell, share, or reuse your data for other clients.</p>
            <p>Data handling, retention, and deletion are detailed in our <a href="/privacy" className="text-[#39FF14] hover:underline">Privacy Policy</a>. By using ABBA, you also agree to the terms of that policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>7. Limitations of Liability</h2>
            <p className="mb-2">ABBA is an automation platform, not a substitute for human judgment. We do not provide:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Medical advice, diagnosis, or treatment recommendations</li>
              <li>Emergency response or crisis intervention services</li>
              <li>Legal, financial, or professional advice of any kind</li>
            </ul>
            <p className="font-bold mb-1 mt-4 text-red-400">ABBA is not liable for:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1 text-red-400">
              <li>Lost revenue, missed appointments, or business outcomes</li>
              <li>Errors in content you provide or configure</li>
              <li>Third-party platform outages (e.g., WhatsApp downtime, Meta API changes)</li>
              <li>Unauthorized access resulting from your failure to secure credentials</li>
              <li>Decisions made by your staff or customers based on automated responses</li>
            </ul>
            <p>To the fullest extent permitted by law, ABBA&apos;s total liability for any claim arising from this agreement is limited to the fees you paid in the three (3) months prior to the claim.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>8. Service Availability</h2>
            <p className="mb-2">We aim to provide reliable service but do not guarantee uninterrupted access. Scheduled maintenance, third-party outages, and force majeure events may cause temporary disruptions.</p>
            <p>ABBA is not responsible for limitations, suspensions, or restrictions imposed by third-party platforms such as WhatsApp, Meta, or cloud infrastructure providers.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>9. Termination</h2>
            <p className="mb-2">Either party may terminate this agreement with written notice.</p>
            <p className="mb-2">Upon termination:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Services will be disabled within a reasonable timeframe</li>
              <li>You may request export of your data</li>
              <li>Data will be deleted or anonymized after a retention period as described in the Privacy Policy</li>
              <li>Outstanding fees remain due</li>
            </ul>
            <p>ABBA reserves the right to terminate this agreement immediately if you violate these terms, engage in fraudulent activity, or use the service in a manner that harms ABBA or third parties.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>10. Modifications</h2>
            <p>ABBA may update this Service Agreement from time to time. We will notify you of material changes via email or in-platform notification. Continued use of the service after changes take effect constitutes acceptance of the updated terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>11. General Terms</h2>
            <p className="mb-2"><strong>Entire Agreement:</strong> This agreement, together with the Privacy Policy, constitutes the entire agreement between you and ABBA.</p>
            <p className="mb-2"><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
            <p className="mb-2"><strong>No Waiver:</strong> Failure to enforce any right does not waive that right.</p>
            <p className="mb-2"><strong>Assignment:</strong> You may not assign this agreement without written consent. ABBA may assign it in connection with a merger, acquisition, or asset sale.</p>
            <p><strong>Governing Principles:</strong> This agreement is governed by principles of good faith, fair dealing, and mutual benefit.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>12. Contact</h2>
            <p>Email: <a href="mailto:support@getabba.info" className="text-[#39FF14] hover:underline">support@getabba.info</a></p>
            <p>Website: <a href="https://getabba.info" className="text-[#39FF14] hover:underline">https://getabba.info</a></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
