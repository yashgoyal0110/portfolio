import { useState } from 'react'
import { AlertCircle, Check, Loader2, Send } from 'lucide-react'
import { profile } from '@/config/profile'
import { socials, email } from '@/config/socials'
import { Section } from '@/components/ui/Section'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Hands the message off to the visitor's mail client. Last-resort fallback. */
function openMailClient(form: { name: string; email: string; message: string }) {
  const subject = encodeURIComponent(`Portfolio: message from ${form.name || 'a recruiter'}`)
  const body = encodeURIComponent(
    `${form.message}\n\n${form.name}${form.email ? ` (${form.email})` : ''}`,
  )
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  /**
   * Delivers straight to the inbox via Web3Forms (same key as the visitor
   * ping), so the button works even when the visitor has no mail client set
   * up. Falls back to mailto: if the key is missing or the request fails.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
    if (!accessKey) {
      openMailClient(form)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio: message from ${form.name || 'a visitor'}`,
          from_name: 'Portfolio contact form',
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '', // Web3Forms honeypot, leave empty
        }),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.message ?? 'send failed')

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<span className="text-gradient">Let's build something reliable.</span>}
      intro={`${profile.availability} remote/on-site. Drop a message and I'll get back to you.`}
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* terminal form */}
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-ink-700/60 bg-ink-900/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-mist-500">~/contact — yash@portfolio</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <Field label="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Ada Lovelace" required />
            <Field label="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="ada@company.com" required />
            <div>
              <label className="mb-1.5 block font-mono text-xs text-mist-500">$ message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role or project…"
                className="w-full resize-none rounded-xl border border-ink-700/70 bg-ink-900/60 px-4 py-3 text-sm text-mist-100 outline-none transition-colors placeholder:text-mist-600 focus:border-accent-400/60"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full disabled:opacity-70"
            >
              {status === 'sending' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              )}
              {status === 'sent' && (
                <>
                  <Check className="h-4 w-4" /> Message sent
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  <Send className="h-4 w-4" /> Send message
                </>
              )}
            </button>

            {status === 'sent' && (
              <p className="flex items-center gap-2 text-xs text-emerald-400">
                <Check className="h-3.5 w-3.5 shrink-0" />
                Thanks, it landed in my inbox. I'll reply to {form.email || 'you'} shortly.
              </p>
            )}

            {status === 'error' && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mist-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#febc2e]" />
                That didn't go through.
                <button
                  type="button"
                  onClick={() => openMailClient(form)}
                  className="cursor-pointer text-accent-300 underline underline-offset-2"
                >
                  Send it by email instead
                </button>
              </p>
            )}
          </form>
        </div>

        {/* channels */}
        <div className="space-y-3">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              download={s.id === 'resume' ? 'Yash-Goyal-Resume.pdf' : undefined}
              className="card group flex items-center gap-4 p-4 transition-colors hover:border-accent-400/40"
            >
              <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent-300">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-mist-50">{s.label}</div>
                <div className="truncate font-mono text-xs text-mist-500">{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-mist-500">$ {label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-700/70 bg-ink-900/60 px-4 py-3 text-sm text-mist-100 outline-none transition-colors placeholder:text-mist-600 focus:border-accent-400/60"
      />
    </div>
  )
}
