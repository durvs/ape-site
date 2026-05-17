'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { track } from '@vercel/analytics'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'

function formatCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

function isValidCNPJ(value: string): boolean {
  const cnpj = value.replace(/\D/g, '')
  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false

  const calc = (length: number) => {
    let sum = 0
    let pos = length - 7
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * pos--
      if (pos < 2) pos = 9
    }
    const result = sum % 11
    return result < 2 ? 0 : 11 - result
  }

  return calc(12) === parseInt(cnpj[12]) && calc(13) === parseInt(cnpj[13])
}

type CNPJStatus = 'idle' | 'checking' | 'ok' | 'invalid' | 'not-found'

export default function DemoPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', cnpj: '', condoName: '', units: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cnpjStatus, setCnpjStatus] = useState<CNPJStatus>('idle')

  useEffect(() => { track('demo_form_viewed') }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function onCnpjChange(value: string) {
    set('cnpj', formatCNPJ(value))
    if (cnpjStatus !== 'idle') setCnpjStatus('idle')
  }

  async function lookupCNPJ() {
    const digits = form.cnpj.replace(/\D/g, '')
    if (digits.length === 0) return
    if (!isValidCNPJ(form.cnpj)) {
      setCnpjStatus('invalid')
      return
    }
    setCnpjStatus('checking')
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
      if (!res.ok) {
        setCnpjStatus('not-found')
        return
      }
      const data = await res.json()
      const officialName: string = (data.nome_fantasia || data.razao_social || '').trim()
      if (officialName && !form.condoName) {
        set('condoName', officialName)
      }
      setCnpjStatus('ok')
    } catch {
      setCnpjStatus('ok')
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValidCNPJ(form.cnpj)) {
      setCnpjStatus('invalid')
      setError('Verifique o CNPJ informado.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Erro ao enviar')

      track('demo_requested', {
        condoName: form.condoName,
        cnpj: form.cnpj,
        units: form.units || 'não informado',
      })

      sessionStorage.setItem('ape_demo_sent', '1')
      router.push('/demo/obrigado')
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
        input, select { color: #111827; }
        input::placeholder { color: #9CA3AF; }
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
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      CNPJ do condomínio <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      placeholder="00.000.000/0000-00"
                      value={form.cnpj}
                      onChange={(e) => onCnpjChange(e.target.value)}
                      onBlur={(e) => { e.target.style.borderColor = cnpjStatus === 'invalid' || cnpjStatus === 'not-found' ? '#EF4444' : '#E5E7EB'; lookupCNPJ() }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${cnpjStatus === 'invalid' || cnpjStatus === 'not-found' ? '#EF4444' : '#E5E7EB'}`, fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box', fontFamily: 'monospace' }}
                    />
                    {cnpjStatus === 'checking' && (
                      <p style={{ fontSize: '12px', color: '#6366F1', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Loader2 size={12} className="animate-spin" /> Consultando Receita Federal...
                      </p>
                    )}
                    {cnpjStatus === 'ok' && (
                      <p style={{ fontSize: '12px', color: '#10B981', marginTop: '6px' }}>
                        CNPJ válido.
                      </p>
                    )}
                    {cnpjStatus === 'invalid' && (
                      <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>
                        CNPJ inválido. Confira os dígitos.
                      </p>
                    )}
                    {cnpjStatus === 'not-found' && (
                      <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>
                        Não encontramos esse CNPJ na Receita Federal.
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Nome do condomínio <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Residencial Primavera"
                      value={form.condoName}
                      onChange={(e) => set('condoName', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366F1')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>

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
                        Telefone / WhatsApp <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        required
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
                    Resposta da equipe em até 24h úteis.
                  </p>
                </form>

          </div>
        </div>
      </div>
    </>
  )
}
