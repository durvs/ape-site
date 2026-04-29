'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Suspense } from 'react'

function ObrigadoContent() {
  const searchParams = useSearchParams()
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (searchParams.get('session_id')) {
      setValid(true)
    }
  }, [searchParams])

  if (!valid) return null

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={28} color="#6366F1" />
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', color: '#0F172A', marginBottom: '12px', lineHeight: 1.1 }}>
          Bem-vindo à Ape Platform!
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65, marginBottom: '12px', fontWeight: 300 }}>
          Pagamento confirmado. Nossa equipe vai entrar em contato em até 24h úteis para iniciar a configuração da sua plataforma.
        </p>
        <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.65, marginBottom: '32px' }}>
          Fique de olho no e-mail — enviaremos todas as informações de acesso e próximos passos por lá.
        </p>
        <Link href="/" style={{ display: 'inline-block', padding: '11px 24px', borderRadius: '9px', background: '#6366F1', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        body { margin: 0; font-family: 'DM Sans', sans-serif; }
        .ty-page { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .ty-nav { padding: 20px 32px; border-bottom: 1px solid #E5E7EB; background: #fff; display: flex; align-items: center; }
        .ty-logo { display: flex; align-items: center; gap: 8px; }
        .ty-logo-mark { width: 28px; height: 28px; border-radius: 7px; background: #6366F1; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
        .ty-logo-name { font-size: 14px; font-weight: 600; color: #111827; }
      `}</style>

      <div className="ty-page">
        <nav className="ty-nav">
          <Link href="/" className="ty-logo" style={{ textDecoration: 'none' }}>
            <div className="ty-logo-mark">A</div>
            <span className="ty-logo-name">Ape Platform</span>
          </Link>
        </nav>

        <Suspense fallback={null}>
          <ObrigadoContent />
        </Suspense>
      </div>
    </>
  )
}
