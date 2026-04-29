'use client'

import { useState, useEffect, useRef } from 'react'
import {
  MessageSquare, Mic, LayoutDashboard, Smartphone, Bot, CalendarCheck,
  ChevronRight, Check, Info, ArrowRight,
} from 'lucide-react'
import { track } from '@vercel/analytics'
import { ApeLogoCompact } from '@/components/ApeLogo'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://admin.apeplatform.online'

/* ─── Tooltip de unidades ───────────────────────────────────────────────────── */
function UnitsLabel({ n }: { n: number | string }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {n === Infinity ? 'Sem limite de unidades' : `Até ${n} unidades`}
      <span
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Info size={12} style={{ color: '#9CA3AF', cursor: 'help' }} />
        {show && (
          <span style={{
            position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
            transform: 'translateX(-50%)', background: '#111827', color: '#fff',
            fontSize: 11, fontWeight: 500, padding: '5px 10px', borderRadius: 7,
            whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            Até 2 usuários por unidade
          </span>
        )}
      </span>
    </span>
  )
}

/* ─── Chat Preview ──────────────────────────────────────────────────────────── */
function ChatPreview() {
  return (
    <div className="hero-preview fade-up delay-4">
      <div className="preview-header">
        <div className="preview-avatar">A</div>
        <div>
          <div className="preview-name">Assistente do Condomínio</div>
          <div className="preview-status">Online agora</div>
        </div>
      </div>
      <div className="chat-bubble bubble-user">
        Quero reservar o salão de festas pro sábado dia 15, das 14h às 22h.
      </div>
      <div className="chat-bubble bubble-bot">
        Verifiquei e o salão está livre no dia 15/06. Reservei das 14h às 22h no seu nome <strong>(Apto 302)</strong>. Segundo o <strong>Regimento (Art. 18)</strong>, a taxa de uso é R$150 — o boleto será enviado junto com o próximo rateio. Precisa de mais alguma coisa?
      </div>
    </div>
  )
}

/* ─── Feature card data ─────────────────────────────────────────────────────── */
const features = [
  {
    icon: MessageSquare,
    title: 'Assistente que decorou o regimento',
    desc: "O morador pergunta, a IA responde — com base nos documentos reais do condomínio. Regimento, atas, circulares: tudo indexado. Sem inventar, sem \"achismo\". Funciona 24 horas, no site ou no WhatsApp.",
  },
  {
    icon: Mic,
    title: 'Ata de assembleia pronta em minutos',
    desc: 'Um bot entra na reunião no Zoom, Meet ou Teams. Transcreve tudo, identifica quem falou, extrai decisões e gera a ata formal automaticamente. Por ~R$8 a assembleia — sem contratar secretário.',
  },
  {
    icon: LayoutDashboard,
    title: 'Documentos, moradores e comunicados num lugar só',
    desc: 'Suba PDFs e o sistema indexa com OCR. Cadastre moradores com validação por CPF. Envie comunicados por e-mail ou WhatsApp para todo o condomínio. Sem planilha, sem ferramenta paralela.',
  },
  {
    icon: Smartphone,
    title: 'Onde o morador estiver',
    desc: 'Web, WhatsApp, Telegram, e-mail, SMS. O morador escolhe o canal. A resposta vem do mesmo agente, com o mesmo contexto. Você configura uma vez.',
  },
  {
    icon: Bot,
    title: 'Um agente pra cada demanda do prédio',
    desc: 'Portaria que avisa sobre encomendas. Financeiro que responde sobre boletos. Manutenção que registra chamados. Cada prédio monta os agentes que fazem sentido para sua operação.',
  },
  {
    icon: CalendarCheck,
    title: 'Churrasqueira, salão, academia — reserva sem ligação',
    desc: 'O admin configura os espaços e horários disponíveis. O morador reserva direto pelo chat ou pelo painel. Conflito de horário? O sistema resolve antes de virar discussão no grupo.',
  },
]

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const scrollTracked = useRef<Set<string>>(new Set())
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  async function handleCheckout(plan: 'essencial' | 'pro') {
    setCheckoutLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setCheckoutLoading(null)
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting && !scrollTracked.current.has(id)) {
            scrollTracked.current.add(id)
            track('section_viewed', { section: id })
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        :root {
          --indigo: #6366F1;
          --indigo-light: #818CF8;
          --indigo-dark: #4F52CC;
          --night: #0B0D12;
          --night-2: #111318;
          --mist: #F8FAFC;
          --ink: #0F172A;
          --slate: #64748B;
          --border: #E2E8F0;
        }

        .landing * { box-sizing: border-box; margin: 0; padding: 0; }
        .landing { font-family: 'DM Sans', sans-serif; background: #fff; color: var(--ink); overflow-x: hidden; scroll-behavior: smooth; }
        html { scroll-behavior: smooth; }

        /* ── Animations ─────────────────────────────────────────── */

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-orb {
          0%, 100% { opacity: 0.35; scale: 1; }
          50%       { opacity: 0.55; scale: 1.08; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.36s; }
        .delay-4 { animation-delay: 0.5s; }

        /* ── Nav ────────────────────────────────────────────────── */

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: rgba(11,13,18,0.72);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-links { display: flex; align-items: center; gap: 10px; }
        .nav-cta {
          padding: 9px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;
          background: rgba(99,102,241,0.15); color: var(--indigo-light);
          border: 1px solid rgba(99,102,241,0.3); cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .nav-cta:hover { background: rgba(99,102,241,0.28); border-color: rgba(99,102,241,0.6); }
        .nav-cta-ghost {
          padding: 9px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;
          background: transparent; color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .nav-cta-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        /* ── Hero ───────────────────────────────────────────────── */

        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 120px 24px 80px;
          position: relative; overflow: hidden;
          background: var(--night);
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-image: url('/hero-bg.jpg');
          background-size: cover; background-position: center 40%;
          filter: brightness(0.4) saturate(1.1);
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            180deg,
            rgba(11,13,18,0.75) 0%,
            rgba(11,13,18,0.3) 40%,
            rgba(11,13,18,0.5) 70%,
            rgba(11,13,18,0.94) 100%
          );
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 16px; border-radius: 100px;
          border: 1px solid rgba(165,180,252,0.35);
          background: rgba(0,0,0,0.4); backdrop-filter: blur(12px);
          font-size: 12px; font-weight: 500; color: #A5B4FC;
          margin-bottom: 32px; position: relative; z-index: 1;
          letter-spacing: 0.03em;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #A5B4FC; animation: pulse-orb 2s infinite;
        }

        .hero h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(46px, 6.5vw, 84px);
          line-height: 1.0; color: #fff;
          max-width: 820px; position: relative; z-index: 1;
          letter-spacing: -0.02em; margin-bottom: 24px;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }
        .hero h1 em { font-style: italic; color: #A5B4FC; }

        .hero p {
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255,255,255,0.8);
          max-width: 580px; line-height: 1.65;
          position: relative; z-index: 1; font-weight: 300;
          margin-bottom: 44px;
          text-shadow: 0 1px 20px rgba(0,0,0,0.4);
        }

        .hero-actions {
          display: flex; gap: 12px; align-items: center;
          position: relative; z-index: 1; flex-wrap: wrap; justify-content: center;
        }
        .hero-credit {
          position: absolute; bottom: 12px; right: 16px; z-index: 2;
          font-size: 10px; color: rgba(255,255,255,0.3);
          text-decoration: none; transition: color 0.2s;
        }
        .hero-credit:hover { color: rgba(255,255,255,0.6); }

        /* ── Buttons ────────────────────────────────────────────── */

        .btn-primary {
          padding: 14px 30px; border-radius: 10px;
          background: var(--indigo); color: #fff;
          font-size: 15px; font-weight: 600;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.2s; box-shadow: 0 0 0 0 rgba(99,102,241,0.4);
        }
        .btn-primary:hover { background: var(--indigo-dark); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(99,102,241,0.35); }

        .btn-ghost {
          padding: 14px 26px; border-radius: 10px;
          color: #94A3B8; font-size: 15px; font-weight: 500;
          text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;
        }
        .btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.04); }

        /* ── Chat Preview ───────────────────────────────────────── */

        .hero-preview {
          margin-top: 72px; position: relative; z-index: 1;
          background: rgba(17,19,24,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px; padding: 20px;
          max-width: 480px; width: 100%;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          animation: float 5s ease-in-out infinite;
        }
        .preview-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px; padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .preview-avatar {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--indigo); display: flex; align-items: center;
          justify-content: center; font-size: 14px; font-weight: 700; color: #fff;
        }
        .preview-name { font-size: 13px; font-weight: 600; color: #fff; }
        .preview-status { font-size: 11px; color: #22D3EE; display: flex; align-items: center; gap: 4px; }
        .preview-status::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #22D3EE; display: inline-block; }

        .chat-bubble { padding: 10px 14px; border-radius: 10px; font-size: 13px; line-height: 1.55; margin-bottom: 8px; max-width: 88%; }
        .bubble-user { background: var(--indigo); color: #fff; margin-left: auto; border-bottom-right-radius: 3px; }
        .bubble-bot { background: rgba(255,255,255,0.06); color: #CBD5E1; border-bottom-left-radius: 3px; }
        .bubble-bot strong { color: #fff; }

        /* ── Sections ───────────────────────────────────────────── */

        .section { padding: 96px 24px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--indigo); margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 5vw, 52px); line-height: 1.1;
          letter-spacing: -0.02em; color: var(--ink); margin-bottom: 16px;
        }
        .section-title em { font-style: italic; color: var(--indigo); }
        .section-sub { font-size: 17px; color: var(--slate); line-height: 1.6; max-width: 560px; font-weight: 300; }

        /* ── Features ───────────────────────────────────────────── */

        .features-bg { background: var(--mist); }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px; margin-top: 56px;
        }
        .feature-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 16px; padding: 32px;
          transition: all 0.25s; cursor: default;
          position: relative; overflow: hidden;
        }
        .feature-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--indigo), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .feature-card:hover {
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 8px 40px rgba(99,102,241,0.08);
          transform: translateY(-2px);
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(99,102,241,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .feature-card h3 { font-size: 18px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .feature-card p { font-size: 14px; color: var(--slate); line-height: 1.65; font-weight: 300; }

        /* ── Sneak Peek ─────────────────────────────────────────── */

        .peek-section {
          background: var(--night);
          padding: 112px 24px 120px;
          position: relative;
          overflow: hidden;
        }
        .peek-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 60%, rgba(99,102,241,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 70% 40%, rgba(129,140,248,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .peek-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .peek-header {
          text-align: center;
          position: relative;
          z-index: 2;
          margin-bottom: 72px;
        }
        .peek-header .section-label { color: var(--indigo-light); }
        .peek-header .section-title { color: #fff; }
        .peek-header .section-title em { color: var(--indigo-light); }
        .peek-header .section-sub {
          color: #94A3B8;
          margin-left: auto;
          margin-right: auto;
        }

        .peek-stage {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          height: 520px;
          z-index: 2;
        }

        .peek-window {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.08);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .peek-window img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top left;
        }

        /* Dashboard — left, slightly behind */
        .peek-dashboard {
          width: 58%;
          height: 440px;
          left: 0;
          top: 40px;
          transform: perspective(1200px) rotateY(4deg) rotateX(-1deg);
          z-index: 1;
        }
        .peek-dashboard::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 30%,
            rgba(11,13,18,0.3) 70%,
            rgba(11,13,18,0.85) 100%
          );
          pointer-events: none;
        }
        .peek-dashboard:hover {
          transform: perspective(1200px) rotateY(2deg) rotateX(0deg) translateY(-4px);
        }

        /* Chatbot — right, in front */
        .peek-chatbot {
          width: 54%;
          height: 460px;
          right: 0;
          top: 0;
          transform: perspective(1200px) rotateY(-3deg) rotateX(-1deg);
          z-index: 2;
        }
        .peek-chatbot::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            225deg,
            transparent 35%,
            rgba(11,13,18,0.25) 65%,
            rgba(11,13,18,0.8) 100%
          );
          pointer-events: none;
        }
        .peek-chatbot:hover {
          transform: perspective(1200px) rotateY(-1deg) rotateX(0deg) translateY(-4px);
        }

        /* Glow orbs behind windows */
        .peek-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .peek-glow-1 {
          width: 350px; height: 350px;
          background: rgba(99,102,241,0.18);
          left: 8%;
          top: 15%;
          animation: pulse-orb 5s ease-in-out infinite;
        }
        .peek-glow-2 {
          width: 280px; height: 280px;
          background: rgba(129,140,248,0.12);
          right: 12%;
          top: 5%;
          animation: pulse-orb 6s ease-in-out infinite 1s;
        }

        /* Bottom fade to next section */
        .peek-fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to bottom, transparent, var(--night));
          z-index: 3;
          pointer-events: none;
        }

        .peek-caption {
          position: absolute;
          bottom: -8px;
          padding: 6px 14px;
          border-radius: 8px;
          background: rgba(17,19,24,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          font-weight: 500;
          color: #94A3B8;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .peek-caption-left { left: 24px; }
        .peek-caption-right { right: 24px; }
        .peek-caption-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--indigo-light);
        }

        @media (max-width: 900px) {
          .peek-stage {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .peek-dashboard,
          .peek-chatbot {
            position: relative;
            width: 100%;
            height: 280px;
            left: auto;
            right: auto;
            top: auto;
            transform: perspective(800px) rotateY(0deg) rotateX(-2deg);
          }
          .peek-dashboard:hover,
          .peek-chatbot:hover {
            transform: perspective(800px) rotateY(0deg) rotateX(0deg) translateY(-4px);
          }
          .peek-caption { display: none; }
        }

        /* ── Steps ──────────────────────────────────────────────── */

        .steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; margin-top: 64px; position: relative;
        }
        .steps-grid::before {
          content: ''; position: absolute; top: 28px;
          left: calc(100% / 6); right: calc(100% / 6);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), var(--border), transparent);
        }
        .step { text-align: center; padding: 0 32px; }
        .step-num {
          width: 56px; height: 56px; border-radius: 50%;
          border: 2px solid var(--indigo); color: var(--indigo);
          font-family: 'Instrument Serif', serif; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; background: #fff;
          position: relative; z-index: 1;
        }
        .step h3 { font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .step p { font-size: 14px; color: var(--slate); line-height: 1.65; font-weight: 300; }

        /* ── Pricing ────────────────────────────────────────────── */

        .pricing-bg { background: var(--mist); }
        .pricing-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 56px; align-items: start;
        }
        .plan {
          background: #fff; border: 1px solid var(--border);
          border-radius: 16px; padding: 32px;
          position: relative; transition: all 0.25s;
        }
        .plan:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.06); }
        .plan-featured { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
        .plan-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--indigo); color: #fff;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          padding: 4px 14px; border-radius: 100px; text-transform: uppercase; white-space: nowrap;
        }
        .plan-name { font-size: 14px; font-weight: 600; color: var(--slate); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
        .plan-price { font-family: 'Instrument Serif', serif; font-size: 44px; color: var(--ink); line-height: 1; }
        .plan-price span { font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--slate); font-weight: 400; }
        .plan-desc { font-size: 13px; color: var(--slate); margin: 12px 0 24px; line-height: 1.55; font-weight: 300; }
        .plan-divider { height: 1px; background: var(--border); margin: 24px 0; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--slate); }
        .plan-features li svg { flex-shrink: 0; margin-top: 1px; color: var(--indigo); }
        .plan-btn {
          display: block; width: 100%; text-align: center;
          padding: 12px; border-radius: 9px; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s; cursor: pointer; border: none;
        }
        .plan-btn-outline { border: 1.5px solid var(--border); color: var(--ink); background: #fff; }
        .plan-btn-outline:hover { border-color: var(--indigo); color: var(--indigo); }
        .plan-btn-solid { background: var(--indigo); color: #fff; }
        .plan-btn-solid:hover { background: var(--indigo-dark); }

        .addons-note {
          text-align: center; margin-top: 32px;
          font-size: 13px; color: var(--slate); font-weight: 300;
          line-height: 1.7;
        }
        .addons-note strong { font-weight: 500; color: var(--ink); }

        /* ── CTA Section ────────────────────────────────────────── */

        .cta-section {
          background: var(--night); padding: 96px 24px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cta-section h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 5vw, 56px); color: #fff;
          margin-bottom: 16px; letter-spacing: -0.02em;
          position: relative; z-index: 1; max-width: 700px; margin-left: auto; margin-right: auto;
        }
        .cta-section h2 em { font-style: italic; color: var(--indigo-light); }
        .cta-section p {
          font-size: 17px; color: #94A3B8; margin-bottom: 40px;
          position: relative; z-index: 1; font-weight: 300;
        }
        .cta-actions { display: flex; gap: 12px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }

        /* ── Footer ─────────────────────────────────────────────── */

        .footer {
          background: var(--night-2); padding: 32px 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap; gap: 16px;
        }
        .footer-copy { font-size: 13px; color: #475569; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 13px; color: #475569; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #94A3B8; }

        /* ── Responsive ─────────────────────────────────────────── */

        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links { gap: 6px; }
          .nav-cta, .nav-cta-ghost { padding: 8px 14px; font-size: 12px; }
          .steps-grid { grid-template-columns: 1fr; gap: 48px; }
          .steps-grid::before { display: none; }
          .step { padding: 0 16px; }
          .footer { flex-direction: column; text-align: center; padding: 24px 20px; }
        }
      `}</style>

      <div className="landing">
        {/* ── Nav ──────────────────────────────────────────────── */}
        <nav className="nav">
          <ApeLogoCompact dark size={30} />
          <div className="nav-links">
            <a href={`${APP_URL}/entrar`} className="nav-cta-ghost" target="_blank">
              Acessar plataforma
            </a>
            <a href="/demo" className="nav-cta" onClick={() => track('cta_clicked', { cta: 'nav_demo' })}>
              Agendar demo
            </a>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />

          <div className="hero-badge fade-up">
            <span className="hero-badge-dot" />
            Plataforma com IA para condomínios
          </div>

          <h1 className="fade-up delay-1">
            A gestão do condomínio<br /><em>ficou inteligente</em>
          </h1>

          <p className="fade-up delay-2">
            Chatbot que responde moradores, ata de assembleia gerada sozinha, reserva de espaços pelo WhatsApp e comunicados com um clique. Tudo num painel só — para síndicos e administradoras que cansaram de viver no grupo de WhatsApp.
          </p>

          <div className="hero-actions fade-up delay-3">
            <a href="/demo" className="btn-primary" onClick={() => track('cta_clicked', { cta: 'hero_demo' })}>
              Agendar uma demonstração
              <ChevronRight size={16} />
            </a>
            <a href="#features" className="btn-ghost" onClick={() => track('cta_clicked', { cta: 'hero_features' })}>
              Ver o que a plataforma faz
              <ArrowRight size={15} />
            </a>
          </div>

          <ChatPreview />

          <a className="hero-credit" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section className="section features-bg" id="features">
          <div className="section-inner">
            <div className="section-label">O que a plataforma faz</div>
            <h2 className="section-title">
              Seis problemas reais.<br />Uma <em>plataforma</em>.
            </h2>
            <p className="section-sub">
              Cada ferramenta resolve algo que hoje consome tempo, gera retrabalho ou simplesmente não é feito.
            </p>
            <div className="features-grid">
              {features.map((f) => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-icon">
                    <f.icon size={22} color="#6366F1" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sneak Peek ───────────────────────────────────────── */}
        <section className="peek-section" id="preview">
          <div className="peek-header">
            <div className="section-label">A plataforma por dentro</div>
            <h2 className="section-title">
              Um painel pro síndico.<br />Um chat pro <em>morador</em>.
            </h2>
            <p className="section-sub">
              O gestor organiza documentos, moradores e comunicados sem sair do painel. O morador tira dúvidas com a IA direto no chat. Ninguém precisa ligar pra portaria.
            </p>
          </div>

          <div className="peek-stage">
            <div className="peek-glow peek-glow-1" />
            <div className="peek-glow peek-glow-2" />

            <div className="peek-window peek-dashboard">
              <img
                src="/preview-dashboard.png"
                alt="Painel do gestor — documentos, moradores e configurações"
                loading="lazy"
              />
              <span className="peek-caption peek-caption-left">
                <span className="peek-caption-dot" />
                Visão do síndico
              </span>
            </div>

            <div className="peek-window peek-chatbot">
              <img
                src="/preview-chatbot.png"
                alt="Chatbot respondendo dúvidas de moradores com base no regimento"
                loading="lazy"
              />
              <span className="peek-caption peek-caption-right">
                <span className="peek-caption-dot" />
                Experiência do morador
              </span>
            </div>
          </div>

          <div className="peek-fade-bottom" />
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section className="section" id="como-funciona">
          <div className="section-inner">
            <div className="section-label">Como funciona</div>
            <h2 className="section-title">
              Da assinatura ao primeiro morador<br />atendido: <em>três passos</em>
            </h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-num">1</div>
                <h3>Cadastre o condomínio</h3>
                <p>Crie o perfil, suba os documentos e configure as regras. A IA indexa tudo automaticamente — regimento, atas, circulares, o que você tiver.</p>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <h3>Convide os moradores</h3>
                <p>Envie convites por e-mail ou WhatsApp. Cada morador valida o acesso pelo CPF e dados do cadastro. Seguro e sem fricção.</p>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <h3>Plataforma ativa</h3>
                <p>Chatbot respondendo, assembleias sendo transcritas, reservas acontecendo, comunicados saindo. Você gerencia tudo de um painel — e o condomínio roda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────── */}
        <section className="section pricing-bg" id="planos">
          <div className="section-inner">
            <div className="section-label">Planos</div>
            <h2 className="section-title">
              Escolha pelo tamanho do condomínio.<br /><em>Escale quando precisar.</em>
            </h2>
            <p className="section-sub">Setup de R$499 com configuração completa. Primeiros 30 dias grátis — a mensalidade começa no mês seguinte. Sem fidelidade, sem multa.</p>

            <div className="pricing-grid">
              {/* Essencial */}
              <div className="plan">
                <div className="plan-name">Essencial</div>
                <div className="plan-price">R$199<span>/mês</span></div>
                <div className="plan-desc">Para condomínios de até 100 unidades que querem sair do improviso.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} /><UnitsLabel n={100} /></li>
                  {[
                    'Chatbot com IA no WhatsApp e web',
                    'Comunicados por e-mail',
                    'Até 20 documentos indexados',
                    'Painel de gestão do síndico',
                    'Reserva de espaços',
                  ].map((f) => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <button className="plan-btn plan-btn-outline" disabled={!!checkoutLoading} onClick={() => { track('cta_clicked', { cta: 'plan_essencial' }); handleCheckout('essencial') }}>
                  {checkoutLoading === 'essencial' ? 'Aguarde...' : 'Experimentar grátis por 30 dias'}
                </button>
              </div>

              {/* Pro */}
              <div className="plan plan-featured">
                <div className="plan-badge">Mais completo</div>
                <div className="plan-name">Pro</div>
                <div className="plan-price">R$399<span>/mês</span></div>
                <div className="plan-desc">Para condomínios de até 200 unidades com operação mais completa.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} /><UnitsLabel n={200} /></li>
                  {[
                    'Tudo do Essencial',
                    'Até 100 documentos indexados',
                    'Agentes customizados (portaria, financeiro, manutenção)',
                    'Comunicados por WhatsApp',
                    'Automações e fluxos personalizados',
                    'Domínio próprio do condomínio',
                    'Suporte prioritário',
                  ].map((f) => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <button className="plan-btn plan-btn-solid" disabled={!!checkoutLoading} onClick={() => { track('cta_clicked', { cta: 'plan_pro' }); handleCheckout('pro') }}>
                  {checkoutLoading === 'pro' ? 'Aguarde...' : 'Experimentar grátis por 30 dias'}
                </button>
              </div>

              {/* Sob medida */}
              <div className="plan">
                <div className="plan-name">Sob medida</div>
                <div className="plan-price" style={{ fontSize: 28, paddingTop: 8 }}>Consulte</div>
                <div className="plan-desc">Para administradoras com múltiplos prédios e necessidades específicas.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} />Sem limite de unidades</li>
                  {[
                    'Tudo do Pro',
                    'Ata de assembleia gerada por IA',
                    'Gestão multi-prédio em painel unificado',
                    'Integrações customizadas',
                    'Contrato e SLA dedicados',
                  ].map((f) => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <a href="/demo" className="plan-btn plan-btn-outline" onClick={() => track('cta_clicked', { cta: 'plan_sob_medida' })}>
                  Falar com vendas
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA Final ────────────────────────────────────────── */}
        <section className="cta-section">
          <h2>
            Quer ver a plataforma funcionando<br />com os documentos do <em>seu condomínio</em>?
          </h2>
          <p>30 minutos de demonstração. Sem compromisso, sem cartão de crédito.</p>
          <div className="cta-actions">
            <a href="/demo" className="btn-primary" onClick={() => track('cta_clicked', { cta: 'footer_demo' })}>
              Agendar demonstração
              <ChevronRight size={16} />
            </a>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="footer">
          <span className="footer-copy">&copy; 2026 Ape Platform. Todos os direitos reservados.</span>
          <div className="footer-links">
            <a href="/contato">Contato</a>
            <a href="/privacidade">Privacidade</a>
            <a href="/termos">Termos</a>
          </div>
        </footer>
      </div>
    </>
  )
}
