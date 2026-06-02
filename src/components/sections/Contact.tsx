import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Send } from 'lucide-react'
import { profile } from '@/config/profile'
import { socials, email } from '@/config/socials'
import { Section } from '@/components/ui/Section'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio — message from ${form.name || 'a recruiter'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
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
            <button type="submit" className="btn-primary w-full">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4" /> Opening your mail client…
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
                    <Send className="h-4 w-4" /> Send message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
              <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent-300 transition-transform duration-300 group-hover:scale-110">
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
