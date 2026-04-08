'use client'

import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { track('contact_form_viewed') }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Erro ao enviar')

      track('contact_submitted', { subject: form.subject || 'sem assunto' })
      setDone(true)
    } catch {
      setError('Não foi possível enviar. Tente novamente ou mande um e-mail para contato@apeplatform.online.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #E5E7EB',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box' as const,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .contact-page { font-family: 'DM Sans', sans-serif; min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .contact-nav { padding: 20px 32px; border-bottom: 1px solid #E5E7EB; background: #fff; display: flex; align-items: center; gap: 12px; }
        .contact-nav a:hover { color: #111827; }
        .contact-logo { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .contact-logo-mark { width: 28px; height: 28px; border-radius: 7px; background: #6366F1; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
        .contact-logo-name { font-size: 14px; font-weight: 600; color: #111827; }
      `}</style>

      <div className="contact-page">
        <nav className="contact-nav">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px', textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Voltar
          </Link>
          <div className="contact-logo">
            <div className="contact-logo-mark">A</div>
            <span className="contact-logo-name">Ape Platform</span>
          </div>
        </nav>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>

            {done ? (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={28} color="#6366F1" />
                </div>
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', color: '#0F172A', marginBottom: '12px', lineHeight: 1.1 }}>
                  Mensagem enviada!
                </h1>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', fontWeight: 300 }}>
                  Recebi sua mensagem e retorno em até 24h. Obrigado pelo contato!
                </p>
                <Link href="/" style={{ display: 'inline-block', padding: '11px 24px', borderRadius: '9px', background: '#6366F1', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                  Voltar ao início
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366F1', marginBottom: '8px' }}>
                    Fale conosco
                  </p>
                  <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', color: '#0F172A', lineHeight: 1.1, marginBottom: '10px' }}>
                    Entre em <em style={{ fontStyle: 'italic', color: '#6366F1' }}>contato</em>
                  </h1>
                  <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6, fontWeight: 300 }}>
                    Dúvidas, sugestões ou solicitações sobre seus dados? Preencha o formulário abaixo.
                  </p>
                </div>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Seu nome <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="João Silva"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        E-mail <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="joao@email.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Assunto
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => set('subject', e.target.value)}
                      style={{ ...inputStyle, color: form.subject ? '#111827' : '#9CA3AF' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E7EB')}
                    >
                      <option value="">Selecione...</option>
                      <option value="Dúvida sobre a plataforma">Dúvida sobre a plataforma</option>
                      <option value="Solicitação sobre meus dados (LGPD)">Solicitação sobre meus dados (LGPD)</option>
                      <option value="Sugestão ou feedback">Sugestão ou feedback</option>
                      <option value="Parceria comercial">Parceria comercial</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Mensagem <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      required
                      placeholder="Escreva sua mensagem aqui..."
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>

                  {error && (
                    <p style={{ fontSize: '13px', color: '#EF4444', background: 'rgba(239,68,68,0.06)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '13px', borderRadius: '9px', background: loading ? '#A5B4FC' : '#6366F1', color: '#fff', fontSize: '15px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s', marginTop: '4px' }}
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : 'Enviar mensagem'}
                  </button>

                  <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
                    Respondo em até 24h. Seus dados são protegidos pela nossa <Link href="/privacidade" style={{ color: '#6366F1', textDecoration: 'none' }}>política de privacidade</Link>.
                  </p>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
