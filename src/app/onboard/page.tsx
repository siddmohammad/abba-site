"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./onboard.css";

const WEBHOOK_URL = 'https://n8n.getabba.info/webhook/onboarding';

const BUSINESS_TYPES = [
  'Clinic',
  'Dental Clinic',
  'Aesthetic Clinic',
  'Pharmacy',
  'Hospital',
  'Beauty & Wellness',
  'Other',
];

const INITIAL_FORM = {
  company_name: '',
  business_type: '',
  business_type_other: '',
  business_address: '',
  business_hours: '',
  opening_time: '',
  closing_time: '',
  open_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  owner_name: '',
  owner_email: '',
  owner_phone: '',
  ai_persona_name: '',
  custom_instructions: '',
  service_list_url: '',
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="onboard-field-error">{msg}</div>;
}

export default function OnboardPage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function toggleDay(day: string) {
    setForm(f => ({
      ...f,
      open_days: f.open_days.includes(day)
        ? f.open_days.filter(d => d !== day)
        : [...f.open_days, day],
    }));
  }

  function validateStep1() {
    const errs: Record<string, string> = {};
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

  function handleNext(e: React.FormEvent) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setServerError('');
    try {
      const resolvedBusinessType = form.business_type === 'Other'
        ? (form.business_type_other.trim() || 'Other')
        : form.business_type;
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          open_days: form.open_days.join(','),
          business_type: resolvedBusinessType,
        }),
      });
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      const data = await res.json();
      if (data.success === false) throw new Error(data.message || 'Provisioning failed');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  }

  /* ── Success Screen ── */
  if (status === 'success') {
    return (
      <main className="min-h-screen flex flex-col pt-24" style={{ background: "var(--background)" }}>
        <Navbar />
        <section className="flex-1 flex items-center justify-center py-20 px-6">
          <div className="onboard-card-override text-center max-w-lg w-full">
            <div className="onboard-success-icon mb-6">&#x2713;</div>
            <h2 className="text-2xl font-pixel mb-4 uppercase print-jitter" style={{ color: "#39FF14" }}>You&apos;re All Set!</h2>
            <p className="mb-8 text-sm" style={{ color: "var(--foreground)", opacity: 0.8 }}>
              Your AI receptionist is being provisioned.<br />
              Check your email for your workspace details and next steps.
            </p>
            <a href="/" className="inline-block px-6 py-3 font-pixel text-xs tracking-widest text-[#0D0D0D] transition-transform hover:scale-105" style={{ background: "#39FF14" }}>
              &#x2190; BACK TO HOME
            </a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  /* ── Main Form ── */
  return (
    <main className="min-h-screen flex flex-col pt-24" style={{ background: "var(--background)" }}>
      <Navbar />
      
      <header className="container mx-auto max-w-3xl px-6 text-center pt-10 pb-8">
        <p className="font-pixel text-[10px] tracking-widest mb-4" style={{ color: "#39FF14" }}>
          STEP {step} OF 2
        </p>
        <h1 className="text-3xl md:text-5xl font-pixel mb-4 print-jitter" style={{ color: "var(--foreground)" }}>Activate Your ABBA Bot</h1>
        <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.6 }}>
          {step === 1
            ? 'Tell us about your business — takes about 2 minutes.'
            : 'Optional AI setup — all fields can be updated later.'}
        </p>
      </header>

      <section className="flex-1 container mx-auto max-w-2xl px-6 pb-24">
        {/* Progress Bar */}
        <div className="onboard-progress mb-8">
          <div
            className="onboard-progress-fill"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>

        <div className="onboard-card-override">
          {/* ── Step 1: Business Info ── */}
          {step === 1 && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="font-pixel text-xl mb-8 uppercase" style={{ color: "#39FF14" }}>Business Info</h3>

              <div className="mb-6">
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

              <div className="mb-6">
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
                {form.business_type === 'Other' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="business_type_other"
                      value={form.business_type_other}
                      onChange={handleChange}
                      className="onboard-input"
                      placeholder="Please describe your business type"
                    />
                  </div>
                )}
                <FieldError msg={errors.business_type} />
              </div>

              <div className="mb-6">
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

              <div className="mb-6">
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

              {/* Structured open hours for bot-silence logic */}
              <div className="mb-8">
                <label className="onboard-label">Business Open Hours</label>
                <p className="text-xs mb-4" style={{ color: "var(--foreground)", opacity: 0.5, fontFamily: "'IBM Plex Mono', monospace" }}>
                  ABBA stays silent during these hours so your team handles messages directly.
                  Leave blank for 24/7 ABBA coverage.
                </p>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="onboard-label" style={{ fontSize: '0.55rem' }}>Opens at</label>
                    <input
                      type="time"
                      name="opening_time"
                      value={form.opening_time}
                      onChange={handleChange}
                      className="onboard-input"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="onboard-label" style={{ fontSize: '0.55rem' }}>Closes at</label>
                    <input
                      type="time"
                      name="closing_time"
                      value={form.closing_time}
                      onChange={handleChange}
                      className="onboard-input"
                    />
                  </div>
                </div>
                <label className="onboard-label" style={{ fontSize: '0.55rem', marginBottom: '0.75rem' }}>Open Days</label>
                <div className="onboard-days-grid">
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                    <button
                      key={day}
                      type="button"
                      className={`onboard-day-btn${form.open_days.includes(day) ? ' onboard-day-btn--active' : ''}`}
                      onClick={() => toggleDay(day)}
                    >
                      {day.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="onboard-divider mb-8" />

              <div className="mb-6">
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

              <div className="mb-6">
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

              <div className="mb-8">
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

              <button type="submit" className="w-full px-6 py-4 font-pixel text-xs tracking-widest text-[#0D0D0D] border-2 transition-transform hover:scale-105" style={{ background: "#39FF14", borderColor: "#39FF14" }}>
                NEXT: AI SETUP &#x2192;
              </button>
            </form>
          )}

          {/* ── Step 2: AI Setup ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-pixel text-xl mb-2 uppercase" style={{ color: "#39FF14" }}>AI Setup</h3>
              <p className="mb-8 text-sm" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                All fields optional — can be updated later from your admin panel.
              </p>

              <div className="mb-6">
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

              <div className="mb-6">
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

              <div className="mb-8">
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
                <div className="onboard-server-error mb-6">
                  {serverError}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-6 py-4 font-pixel text-xs tracking-widest border transition-colors hover:bg-[rgba(255,255,255,0.05)]"
                  style={{ borderColor: "var(--card-border)", color: "var(--foreground)" }}
                  onClick={() => { setStep(1); setStatus('idle'); }}
                >
                  &#x2190; BACK
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 px-6 py-4 font-pixel text-xs tracking-widest text-[#0D0D0D] transition-transform"
                  style={{
                    background: status === 'submitting' ? "rgba(57,255,20,0.5)" : "#39FF14",
                    cursor: status === 'submitting' ? "not-allowed" : "pointer",
                    transform: status === 'submitting' ? "none" : "scale(1)",
                  }}
                >
                  {status === 'submitting' ? 'ACTIVATING...' : 'ACTIVATE BOTTER'}
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
