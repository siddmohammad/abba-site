import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — ABBA",
  description: "ABBA Privacy Policy for automation services",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col pt-24" style={{ background: "var(--background)" }}>
      <Navbar />

      <section className="flex-1 container mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-3xl md:text-5xl font-pixel mb-16 text-center print-jitter" style={{ color: "#39FF14" }}>
          PRIVACY POLICY
        </h1>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.8 }}>
          <div>
            <p><strong>Effective Date:</strong> Upon use of services</p>
            <p><strong>Company:</strong> ABBA (Always Building Better Automation)</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>1. Overview</h2>
            <p className="mb-2">This Privacy Policy explains how ABBA collects, uses, stores, and protects data when you use our automation services.</p>
            <p className="mb-2"><strong>Who this applies to:</strong></p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-2">
              <li>Businesses (clinics, service providers, etc.) who are our clients</li>
              <li>End users (customers, patients, etc.) who interact with our clients&apos; automated systems</li>
            </ul>
            <p><strong>Our role:</strong> ABBA acts as a data processor on behalf of our clients. We handle data solely to deliver the services our clients have requested. Our clients remain the data owners and are responsible for how they use and manage their customer data.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>2. What Data We Collect</h2>
            <p className="mb-2">We collect and process the following types of data:</p>
            
            <p className="font-bold mb-1 mt-4">From Clients (Businesses):</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Business name, contact information, and billing details</li>
              <li>WhatsApp numbers, Facebook page IDs, Instagram accounts, and other channel identifiers</li>
              <li>Configuration details, messaging templates, and workflow instructions</li>
              <li>Staff login credentials and access permissions</li>
            </ul>

            <p className="font-bold mb-1 mt-4">From End Users (via Client Channels):</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Messages sent to and from the client&apos;s WhatsApp, Facebook, or Instagram accounts</li>
              <li>Phone numbers, names, and contact details provided during conversations</li>
              <li>Appointment requests, service inquiries, and other interaction content</li>
              <li>Metadata such as timestamps, message delivery status, and session data</li>
            </ul>

            <p className="font-bold mb-1 mt-4">Technical Data:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>IP addresses, device types, and browser information (for platform access)</li>
              <li>System logs, error reports, and performance metrics</li>
            </ul>
            <p>We do not collect sensitive personal information (e.g., health records, financial data, biometric data) unless it is voluntarily provided by end users during conversations with our clients. Such data remains subject to the client&apos;s own privacy obligations.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>3. How We Use Data</h2>
            <p className="mb-2">ABBA uses data solely to deliver and improve our services:</p>
            
            <p className="font-bold mb-1 mt-4">Service Delivery:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Operating automated messaging workflows</li>
              <li>Routing conversations to appropriate staff members</li>
              <li>Generating appointment confirmations and follow-ups</li>
              <li>Providing AI-assisted responses based on client-configured instructions</li>
            </ul>

            <p className="font-bold mb-1 mt-4">Support &amp; Maintenance:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Troubleshooting technical issues</li>
              <li>Setting up and configuring client accounts</li>
              <li>Responding to support requests</li>
            </ul>

            <p className="font-bold mb-1 mt-4">Reporting:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Creating summaries and analytics for clients (e.g., message volumes, response times)</li>
              <li>Generating internal performance metrics to improve platform reliability</li>
            </ul>

            <p className="font-bold mb-1 mt-4 text-red-400">We do not use client data for:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1 text-red-400">
              <li>Marketing or advertising</li>
              <li>Training shared AI models</li>
              <li>Selling or sharing with third parties outside of service delivery</li>
              <li>Cross-client analysis or benchmarking</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>4. Data Ownership</h2>
            <p className="mb-2"><strong>Clients own their data.</strong> All business information, customer conversations, patient records, and interaction history generated through ABBA belong to the client.</p>
            <p>ABBA does not claim ownership of client data. We process it only as instructed and as necessary to deliver the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>5. Data Isolation &amp; Security</h2>
            <p className="mb-2">Each client operates in a logically isolated workspace. Data is segregated by unique workspace identifiers, ensuring no cross-client access.</p>
            
            <p className="font-bold mb-1 mt-4 text-red-400">We do not:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1 text-red-400">
              <li>Share one client&apos;s data with another client</li>
              <li>Pool data across clients for analysis or model training</li>
              <li>Allow clients to access other clients&apos; data</li>
            </ul>

            <p className="font-bold mb-1 mt-4">Security measures include:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure access controls and authentication</li>
              <li>Regular security reviews and updates</li>
              <li>Restricted staff access (only authorized personnel for support and setup)</li>
            </ul>
            <p>While we implement industry-standard protections, no system is entirely immune to risk. Clients are responsible for securing their own credentials and managing staff access appropriately.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>6. AI &amp; Data Usage</h2>
            <p className="mb-2">ABBA uses AI to assist with message handling, intent detection, and automated responses.</p>
            <p className="font-bold mb-1 mt-4">Important clarifications:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>AI responses are generated session-based and configuration-driven, using instructions provided by the client</li>
              <li>We do not train AI models on your customer conversations</li>
              <li>We do not use one client&apos;s data to improve services for other clients</li>
              <li>AI models rely on pre-trained language capabilities and client-specific configurations, not on learning from live conversations</li>
            </ul>
            <p>If general platform improvements require data analysis, we will anonymize and aggregate data in ways that remove all identifying information.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>7. Access Controls</h2>
            <p className="mb-2">Authorized ABBA staff may access client systems and data only for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Initial setup and configuration</li>
              <li>Troubleshooting and debugging</li>
              <li>Responding to support requests</li>
              <li>Security monitoring and incident response</li>
            </ul>
            <p>Access is logged and limited to personnel with legitimate operational needs. We do not access data for casual browsing or unauthorized purposes.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>8. Third-Party Services</h2>
            <p className="mb-2">ABBA relies on third-party platforms to deliver services:</p>
            
            <p className="font-bold mb-1 mt-4">Messaging Platforms:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>WhatsApp Business API (Meta)</li>
              <li>Facebook Messenger (Meta)</li>
              <li>Instagram Direct Messages (Meta)</li>
            </ul>

            <p className="font-bold mb-1 mt-4">Infrastructure Providers:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Cloud hosting and database services</li>
              <li>Communication APIs (e.g., Twilio for SMS/WhatsApp)</li>
            </ul>
            <p>These providers process data solely to enable service delivery. They are not authorized to use client data for their own purposes beyond infrastructure support. Clients should review the privacy policies of these third parties, as their terms also apply.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>9. Data Retention &amp; Deletion</h2>
            <p className="mb-2"><strong>During Active Service:</strong> Data is retained as long as necessary to provide services and fulfill reporting obligations.</p>
            <p className="mb-2"><strong>Upon Termination:</strong></p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li>Services are disabled within a reasonable timeframe (typically 7–14 days)</li>
              <li>Clients may request a data export before deletion</li>
              <li>Data is permanently deleted or anonymized after a retention period of up to 90 days unless longer retention is required by law or agreed upon in writing</li>
            </ul>
            <p>We do not retain data indefinitely after termination unless explicitly requested by the client or required for legal compliance.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>10. Client Rights</h2>
            <p className="mb-2">As a client, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
              <li><strong>Access:</strong> Request copies of data we hold on your behalf</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal and operational constraints)</li>
              <li><strong>Portability:</strong> Export your data in a usable format upon request</li>
            </ul>
            <p className="mb-4">To exercise these rights, contact us at <a href="mailto:support@getabba.info" className="text-[#39FF14] hover:underline">support@getabba.info</a>.</p>
            <p><strong>For end users (customers/patients):</strong> If you have questions about how your data is used, please contact the business you interacted with. They are the data controller and responsible for responding to your privacy requests.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>11. International Data Transfers</h2>
            <p className="mb-2">ABBA operates using cloud infrastructure that may store and process data in multiple regions. If you are located in a jurisdiction with data protection laws (e.g., GDPR, Australian Privacy Principles), we take steps to ensure data is handled in accordance with applicable legal frameworks.</p>
            <p>However, by using ABBA, you acknowledge that data may be transferred to and processed in regions where data protection standards differ from your own.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>12. Changes to This Policy</h2>
            <p className="mb-2">ABBA may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or service offerings.</p>
            <p>We will notify clients of material changes via email or in-platform notification. Continued use of the service after changes take effect constitutes acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-pixel mb-4 uppercase" style={{ color: "#39FF14" }}>13. Contact Us</h2>
            <p>Email: <a href="mailto:support@getabba.info" className="text-[#39FF14] hover:underline">support@getabba.info</a></p>
            <p>Website: <a href="https://getabba.info" className="text-[#39FF14] hover:underline">https://getabba.info</a></p>
            <p className="mt-2 text-xs"><a href="/terms" className="hover:underline">View Service Agreement</a></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
