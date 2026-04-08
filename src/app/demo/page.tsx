'use client'

import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

export default function DemoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', condoName: '', units: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { track('demo_form_viewed') }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Erro ao enviar')

      // Evento de conversão
      track('demo_requested', {
        condoName: form.condoName || 'não informado',
        units: form.units || 'não informado',
      })

      setDone(true)
    } catch {
      setError('Não foi possível enviar. Tente novamente ou mande um e-mail para contato@apeplatform.online.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .demo-page { font-family: 'DM Sans', sans-serif; min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .demo-nav { padding: 20px 32px; border-bottom: 1px solid #E5E7EB; background: #fff; display: flex; align-items: center; gap: 12px; }
        .demo-nav a { display: flex; align-items: center; gap-6px; color: #6B7280; font-size: 13px; text-decoration: none; transition: color 0.2s; }
        .demo-nav a:hover { color: #111827; }
        .demo-logo { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .demo-logo-mark { width: 28px; height: 28px; border-radius: 7px; background: #6366F1; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
        .demo-logo-name { font-size: 14px; font-weight: 600; color: #111827; }
      `}</style>

      <div className="demo-page">
        <nav className="demo-nav">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px', textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Voltar
          </Link>
          <div className="demo-logo" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="demo-logo-mark">A</div>
            <span className="demo-logo-name">Ape Platform</span>
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
                  Recebemos sua solicitação!
                </h1>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', fontWeight: 300 }}>
                  Entrarei em contato em até 24h para agendar a demo. Até breve!
                </p>
                <Link href="/" style={{ display: 'inline-block', padding: '11px 24px', borderRadius: '9px', background: '#6366F1', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                  Voltar ao início
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366F1', marginBottom: '8px' }}>
                    Demo gratuita
                  </p>
                  <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', color: '#0F172A', lineHeight: 1.1, marginBottom: '10px' }}>
                    Veja o Ape em <em style={{ fontStyle: 'italic', color: '#6366F1' }}>ação</em>
                  </h1>
                  <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6, fontWeight: 300 }}>
                    30 minutos. Sem compromisso. Mostro tudo funcionando no seu condomínio.
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
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                        onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-0000"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                        onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      E-mail <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="joao@condominio.com.br"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Nome do condomínio
                    </label>
                    <input
                      type="text"
                      placeholder="Residencial Primavera"
                      value={form.condoName}
                      onChange={(e) => set('condoName', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Quantas unidades tem o condomínio?
                    </label>
                    <select
                      value={form.units}
                      onChange={(e) => set('units', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box', color: form.units ? '#111827' : '#9CA3AF' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E7EB')}
                    >
                      <option value="">Selecione...</option>
                      <option value="1-40">Até 40 unidades</option>
                      <option value="41-100">41 a 100 unidades</option>
                      <option value="101-250">101 a 250 unidades</option>
                      <option value="250+">Mais de 250 unidades</option>
                    </select>
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
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : 'Solicitar demo gratuita'}
                  </button>

                  <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
                    Sem spam. Entrarei em contato em até 24h.
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
