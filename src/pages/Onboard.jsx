import { useState } from 'react';
import useMeta from '../hooks/useMeta';
import StarBorder from '../reactbits/StarBorder';
import './Onboard.css';

const WEBHOOK_URL = 'https://n8n.getabba.info/webhook/onboarding';

const BUSINESS_TYPES = [
  'Clinic',
  'Dental Clinic',
  'Pharmacy',
  'Hospital',
  'Beauty & Wellness',
  'Other',
];

const INITIAL_FORM = {
  company_name: '',
  business_type: '',
  business_address: '',
  business_hours: '',
  owner_name: '',
  owner_email: '',
  owner_phone: '',
  ai_persona_name: '',
  custom_instructions: '',
  service_list_url: '',
};

function FieldError({ msg }) {
  if (!msg) return null;
  return <div className="onboard-field-error">{msg}</div>;
}

export default function Onboard() {
  useMeta({
    title: 'Get Started — ABBA',
    description: 'Set up your AI receptionist in about 2 minutes.',
    ogUrl: 'https://getabba.info/onboard',
  });

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function validateStep1() {
    const errs = {};
    if (!form.company_name.trim()) errs.company_name = 'Clinic name is required';
    if (!form.business_type) errs.business_type = 'Business type is required';
    if (!form.business_address.trim()) errs.business_address = 'Business address is required';
    if (!form.business_hours.trim()) errs.business_hours = 'Business hours are required';
    if (!form.owner_name.trim()) errs.owner_name = 'Owner name is required';
    if (!form.owner_email.trim()) {
      errs.owner_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.owner_email)) {
      errs.owner_email = 'Invalid email format';
    }
    if (!form.owner_phone.trim()) {
      errs.owner_phone = 'WhatsApp number is required';
    } else if (!/^\+[1-9]\d{1,14}$/.test(form.owner_phone)) {
      errs.owner_phone = 'Must be E.164 format e.g. +8801700000000';
    }
    return errs;
  }

  function handleNext(e) {
    e.preventDefault();
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setServerError('');
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      const data = await res.json();
      if (data.success === false) throw new Error(data.message || 'Provisioning failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  }

  /* ── Success Screen ── */
  if (status === 'success') {
    return (
      <section className="py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container-xxl">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="arcade-card">
                <div className="onboard-success-icon">&#x2713;</div>
                <h2 className="pixel neon-text mt-3 mb-3">You&apos;re All Set!</h2>
                <p className="mb-4">
                  Your AI receptionist is being provisioned.<br />
                  Check your email for your workspace details and next steps.
                </p>
                <a href="/" className="btn btn-neon pixel">&#x2190; BACK TO HOME</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Main Form ── */
  return (
    <>
      <header className="hero">
        <div className="container-xxl">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="pixel small neon-text mb-2" style={{ letterSpacing: '0.15em', fontSize: '0.6rem' }}>
                STEP {step} OF 2
              </p>
              <h1 className="pixel hero-title neon-text mb-2">Activate Your ABBA Bot</h1>
              <p style={{ color: 'var(--muted)' }} className="mb-0">
                {step === 1
                  ? 'Tell us about your business — takes about 2 minutes.'
                  : 'Optional AI setup — all fields can be updated later.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container-xxl">
          <div className="row justify-content-center">
            <div className="col-lg-7">

              {/* Progress Bar */}
              <div className="onboard-progress mb-4">
                <div
                  className="onboard-progress-fill"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>

              <div className="arcade-card">

                {/* ── Step 1: Business Info ── */}
                {step === 1 && (
                  <form onSubmit={handleNext} noValidate>
                    <h3 className="pixel neon-text mb-4">Business Info</h3>

                    <div className="mb-3">
                      <label className="onboard-label">Clinic / Business Name *</label>
                      <input
                        type="text"
                        name="company_name"
                        value={form.company_name}
                        onChange={handleChange}
                        className={`onboard-input${errors.company_name ? ' onboard-input--error' : ''}`}
                        placeholder="e.g. ABC Dental Clinic"
                      />
                      <FieldError msg={errors.company_name} />
                    </div>

                    <div className="mb-3">
                      <label className="onboard-label">Business Type *</label>
                      <select
                        name="business_type"
                        value={form.business_type}
                        onChange={handleChange}
                        className={`onboard-input onboard-select${errors.business_type ? ' onboard-input--error' : ''}`}
                      >
                        <option value="">Select type...</option>
                        {BUSINESS_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <FieldError msg={errors.business_type} />
                    </div>

                    <div className="mb-3">
                      <label className="onboard-label">Business Address *</label>
                      <textarea
                        name="business_address"
                        value={form.business_address}
                        onChange={handleChange}
                        className={`onboard-input${errors.business_address ? ' onboard-input--error' : ''}`}
                        rows={2}
                        placeholder="Full address including area and city"
                      />
                      <FieldError msg={errors.business_address} />
                    </div>

                    <div className="mb-4">
                      <label className="onboard-label">Business Hours *</label>
                      <input
                        type="text"
                        name="business_hours"
                        value={form.business_hours}
                        onChange={handleChange}
                        className={`onboard-input${errors.business_hours ? ' onboard-input--error' : ''}`}
                        placeholder="e.g. 9am–6pm Saturday–Thursday"
                      />
                      <FieldError msg={errors.business_hours} />
                    </div>

                    <div className="onboard-divider mb-4" />

                    <div className="mb-3">
                      <label className="onboard-label">Owner Name *</label>
                      <input
                        type="text"
                        name="owner_name"
                        value={form.owner_name}
                        onChange={handleChange}
                        className={`onboard-input${errors.owner_name ? ' onboard-input--error' : ''}`}
                        placeholder="Your full name"
                      />
                      <FieldError msg={errors.owner_name} />
                    </div>

                    <div className="mb-3">
                      <label className="onboard-label">Email Address *</label>
                      <input
                        type="email"
                        name="owner_email"
                        value={form.owner_email}
                        onChange={handleChange}
                        className={`onboard-input${errors.owner_email ? ' onboard-input--error' : ''}`}
                        placeholder="you@example.com"
                      />
                      <FieldError msg={errors.owner_email} />
                    </div>

                    <div className="mb-4">
                      <label className="onboard-label">WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="owner_phone"
                        value={form.owner_phone}
                        onChange={handleChange}
                        className={`onboard-input${errors.owner_phone ? ' onboard-input--error' : ''}`}
                        placeholder="+880XXXXXXXXXX (include country code)"
                      />
                      <FieldError msg={errors.owner_phone} />
                    </div>

                    <button type="submit" className="btn btn-neon pixel w-100">
                      NEXT: AI SETUP &#x2192;
                    </button>
                  </form>
                )}

                {/* ── Step 2: AI Setup ── */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 className="pixel neon-text mb-1">AI Setup</h3>
                    <p className="mb-4" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                      All fields optional — can be updated later from your admin panel.
                    </p>

                    <div className="mb-3">
                      <label className="onboard-label">AI Persona Name</label>
                      <input
                        type="text"
                        name="ai_persona_name"
                        value={form.ai_persona_name}
                        onChange={handleChange}
                        className="onboard-input"
                        placeholder="e.g. Mimi, Riya (leave blank for default 'Botter')"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="onboard-label">Custom AI Instructions</label>
                      <textarea
                        name="custom_instructions"
                        value={form.custom_instructions}
                        onChange={handleChange}
                        className="onboard-input"
                        rows={4}
                        placeholder="Special rules or context for your AI receptionist..."
                      />
                    </div>

                    <div className="mb-4">
                      <label className="onboard-label">Knowledge Base Drive URL</label>
                      <input
                        type="url"
                        name="service_list_url"
                        value={form.service_list_url}
                        onChange={handleChange}
                        className="onboard-input"
                        placeholder="Paste a Google Drive folder link (optional)"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="onboard-server-error mb-3">
                        {serverError}
                      </div>
                    )}

                    <div className="d-flex gap-3">
                      <button
                        type="button"
                        className="btn btn-neon pixel"
                        onClick={() => { setStep(1); setStatus('idle'); }}
                        style={{ opacity: 0.75, flexShrink: 0 }}
                      >
                        &#x2190; BACK
                      </button>
                      <StarBorder
                        as="button"
                        type="submit"
                        className="btn-neon pixel"
                        color="#39FF14"
                        disabled={status === 'submitting'}
                        style={{ flex: 1 }}
                      >
                        {status === 'submitting' ? 'ACTIVATING...' : 'ACTIVATE BOTTER'}
                      </StarBorder>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
