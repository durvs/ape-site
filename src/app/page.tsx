'use client'

import { useState, useEffect, useRef } from 'react'
import { FileText, Bell, ChevronRight, Check, Shield, Info } from 'lucide-react'
import { track } from '@vercel/analytics'
import { ApeLogoCompact } from '@/components/ApeLogo'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://admin.apeplatform.online'

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
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#111827',
            color: '#fff',
            fontSize: 11,
            fontWeight: 500,
            padding: '5px 10px',
            borderRadius: 7,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            Até 2 usuários por unidade
          </span>
        )}
      </span>
    </span>
  )
}

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
        Posso usar a churrasqueira amanhã às 14h?
      </div>
      <div className="chat-bubble bubble-bot">
        Sim! Segundo o <strong>Regimento Interno (Art. 12)</strong>, a churrasqueira pode ser reservada das 10h às 22h. Você pode solicitar a reserva diretamente com a administração. Deseja que eu te informe o contato?
      </div>
    </div>
  )
}

export default function LandingPage() {
  const scrollTracked = useRef<Set<string>>(new Set())

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
      { threshold: 0.3 }
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

        .fade-up { animation: fadeUp 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.36s; }
        .delay-4 { animation-delay: 0.5s; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: rgba(11,13,18,0.72);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-cta {
          padding: 9px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;
          background: rgba(99,102,241,0.15); color: var(--indigo-light);
          border: 1px solid rgba(99,102,241,0.3); cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .nav-cta:hover { background: rgba(99,102,241,0.28); border-color: rgba(99,102,241,0.6); }

        .hero {
          min-height: 100vh; background: var(--night);
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 120px 24px 80px;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,102,241,0.22) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 85% 75% at 50% 72%, black 30%, transparent 100%);
        }
        .hero-orb {
          position: absolute;
          width: 1000px; height: 560px;
          border-radius: 50%;
          bottom: -120px; left: 50%;
          translate: -50% 0;
          background: radial-gradient(ellipse at 50% 85%, rgba(99,102,241,0.55) 0%, rgba(99,102,241,0.28) 30%, rgba(99,102,241,0.08) 60%, transparent 75%);
          animation: pulse-orb 6s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; border-radius: 100px;
          border: 1px solid rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.1);
          font-size: 12px; font-weight: 500; color: var(--indigo-light);
          margin-bottom: 32px; position: relative; z-index: 1;
          letter-spacing: 0.03em;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--indigo-light); animation: pulse-orb 2s infinite;
        }

        .hero h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 1.0; color: #fff;
          max-width: 780px; position: relative; z-index: 1;
          letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .hero h1 em { font-style: italic; color: var(--indigo-light); }

        .hero p {
          font-size: clamp(16px, 2vw, 19px); color: #94A3B8;
          max-width: 520px; line-height: 1.65;
          position: relative; z-index: 1; font-weight: 300;
          margin-bottom: 44px;
        }

        .hero-actions { display: flex; gap: 12px; align-items: center; position: relative; z-index: 1; flex-wrap: wrap; justify-content: center; }

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

        .hero-preview {
          margin-top: 72px; position: relative; z-index: 1;
          background: var(--night-2);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 20px;
          max-width: 460px; width: 100%;
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
        .chat-bubble { padding: 10px 14px; border-radius: 10px; font-size: 13px; line-height: 1.55; margin-bottom: 8px; max-width: 85%; }
        .bubble-user { background: var(--indigo); color: #fff; margin-left: auto; border-bottom-right-radius: 3px; }
        .bubble-bot { background: rgba(255,255,255,0.06); color: #CBD5E1; border-bottom-left-radius: 3px; }
        .bubble-bot strong { color: #fff; }

        .section { padding: 96px 24px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--indigo); margin-bottom: 12px; }
        .section-title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 5vw, 52px); line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 16px; }
        .section-title em { font-style: italic; color: var(--indigo); }
        .section-sub { font-size: 17px; color: var(--slate); line-height: 1.6; max-width: 520px; font-weight: 300; }

        .features-bg { background: var(--mist); }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 56px; }
        .feature-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 32px; transition: all 0.25s; cursor: default; }
        .feature-card:hover { border-color: rgba(99,102,241,0.3); box-shadow: 0 8px 40px rgba(99,102,241,0.08); transform: translateY(-2px); }
        .feature-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(99,102,241,0.08); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .feature-card h3 { font-size: 18px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .feature-card p { font-size: 14px; color: var(--slate); line-height: 1.65; font-weight: 300; }

        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0; margin-top: 64px; position: relative; }
        .steps-grid::before { content: ''; position: absolute; top: 28px; left: calc(50% / 3); right: calc(50% / 3); height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
        .step { text-align: center; padding: 0 32px; }
        .step-num { width: 56px; height: 56px; border-radius: 50%; border: 2px solid var(--indigo); color: var(--indigo); font-family: 'Instrument Serif', serif; font-size: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; background: #fff; position: relative; z-index: 1; }
        .step h3 { font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .step p { font-size: 14px; color: var(--slate); line-height: 1.65; font-weight: 300; }

        .pricing-bg { background: var(--mist); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 56px; align-items: start; }
        .plan { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 32px; position: relative; transition: all 0.25s; }
        .plan:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.06); }
        .plan-featured { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
        .plan-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--indigo); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; padding: 4px 14px; border-radius: 100px; text-transform: uppercase; white-space: nowrap; }
        .plan-name { font-size: 14px; font-weight: 600; color: var(--slate); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
        .plan-price { font-family: 'Instrument Serif', serif; font-size: 44px; color: var(--ink); line-height: 1; }
        .plan-price span { font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--slate); font-weight: 400; }
        .plan-desc { font-size: 13px; color: var(--slate); margin: 12px 0 24px; line-height: 1.55; font-weight: 300; }
        .plan-divider { height: 1px; background: var(--border); margin: 24px 0; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--slate); }
        .plan-features li svg { flex-shrink: 0; margin-top: 1px; color: var(--indigo); }
        .plan-btn { display: block; width: 100%; text-align: center; padding: 12px; border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; cursor: pointer; border: none; }
        .plan-btn-outline { border: 1.5px solid var(--border); color: var(--ink); background: #fff; }
        .plan-btn-outline:hover { border-color: var(--indigo); color: var(--indigo); }
        .plan-btn-solid { background: var(--indigo); color: #fff; }
        .plan-btn-solid:hover { background: var(--indigo-dark); }

        .cta-section { background: var(--night); padding: 96px 24px; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px); background-size: 28px 28px; }
        .cta-section h2 { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 5vw, 56px); color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; position: relative; z-index: 1; }
        .cta-section h2 em { font-style: italic; color: var(--indigo-light); }
        .cta-section p { font-size: 17px; color: #94A3B8; margin-bottom: 40px; position: relative; z-index: 1; font-weight: 300; }
        .cta-actions { display: flex; gap: 12px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }

        .footer { background: var(--night-2); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; gap: 16px; }
        .footer-copy { font-size: 13px; color: #475569; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 13px; color: #475569; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #94A3B8; }

        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .steps-grid::before { display: none; }
          .footer { flex-direction: column; text-align: center; padding: 24px 20px; }
        }
      `}</style>

      <div className="landing">
        <nav className="nav">
          <ApeLogoCompact dark size={30} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href={`${APP_URL}/entrar`} className="nav-cta" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.15)' }} target='_blank'>
              Acessar plataforma
            </a>
            <a href={`${APP_URL}/demo`} className="nav-cta" onClick={() => track('cta_clicked', { cta: 'nav_demo' })}>
              Agendar demo
            </a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-orb" />
          <div className="hero-badge fade-up">
            <span className="hero-badge-dot" />
            IA treinada pro seu condomínio
          </div>
          <h1 className="fade-up delay-1">
            Seu condomínio<br />com um <em>assistente</em><br />que sabe tudo
          </h1>
          <p className="fade-up delay-2">
            Morador pergunta, o chatbot responde — com base no regimento do seu condomínio. Qualquer hora, sem precisar chamar o síndico.
          </p>
          <div className="hero-actions fade-up delay-3">
            <a href={`${APP_URL}/demo`} className="btn-primary" onClick={() => track('cta_clicked', { cta: 'hero_demo' })}>
              Agendar uma demo
              <ChevronRight size={16} />
            </a>
            <a href="#como-funciona" className="btn-ghost" onClick={() => track('cta_clicked', { cta: 'hero_como_funciona' })}>
              Ver como funciona
            </a>
          </div>
          <ChatPreview />
        </section>

        <section className="section features-bg" id="features">
          <div className="section-inner">
            <div className="section-label">Funcionalidades</div>
            <h2 className="section-title">Chatbot, comunicados e gestão —<br />no mesmo <em>lugar</em></h2>
            <p className="section-sub">Do chatbot ao comunicado, sem precisar de vários sistemas.</p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FileText size={22} color="#6366F1" /></div>
                <h3>IA treinada nos seus documentos</h3>
                <p>Suba o regimento, atas e circulares. O chatbot passa a responder com base no que está escrito lá — não em dados genéricos.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Bell size={22} color="#6366F1" /></div>
                <h3>Comunicados por e-mail e WhatsApp</h3>
                <p>Envie avisos para todos os moradores com um clique. Com suporte a imagens e texto formatado, via e-mail ou grupo do WhatsApp.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Shield size={22} color="#6366F1" /></div>
                <h3>Painel do síndico</h3>
                <p>Cadastre moradores, suba documentos, configure o chatbot. Sem precisar chamar ninguém de TI.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="como-funciona">
          <div className="section-inner">
            <div className="section-label">Como funciona</div>
            <h2 className="section-title">Como colocar<br />no <em>ar</em></h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-num">1</div>
                <h3>Cadastre seu condomínio</h3>
                <p>Crie o perfil e suba os documentos: regimento, atas, regulamentos. A IA lê e indexa tudo.</p>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <h3>Convide os moradores</h3>
                <p>Envie convites por e-mail. Cada morador cria seu acesso com segurança, validado pelo CPF e dados do cadastro.</p>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <h3>Chatbot ativo 24/7</h3>
                <p>Moradores tiram dúvidas a qualquer hora. O síndico para de atender pergunta básica no WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing-bg" id="planos">
          <div className="section-inner">
            <div className="section-label">Planos</div>
            <h2 className="section-title">Um plano pra cada<br /><em>tamanho</em> de condomínio</h2>
            <p className="section-sub">Taxa de setup única de R$999. Cancele quando quiser.</p>
            <div className="pricing-grid">
              <div className="plan">
                <div className="plan-name">Essencial</div>
                <div className="plan-price">R$299<span>/mês</span></div>
                <div className="plan-desc">Para condomínios de até 100 unidades que querem começar com IA.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} /><UnitsLabel n={100} /></li>
                  {['Chatbot com IA no WhatsApp', 'Comunicados por e-mail', 'Até 20 documentos no RAG', 'Painel do síndico'].map(f => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <a href={`${APP_URL}/demo`} className="plan-btn plan-btn-outline" onClick={() => track('cta_clicked', { cta: 'plan_essencial' })}>
                  Escolher Essencial
                </a>
              </div>

              <div className="plan plan-featured">
                <div className="plan-badge">Mais completo</div>
                <div className="plan-name">Pro</div>
                <div className="plan-price">R$499<span>/mês</span></div>
                <div className="plan-desc">Para condomínios maiores que precisam de mais capacidade e controle.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} /><UnitsLabel n={250} /></li>
                  {['Tudo do Essencial', 'Até 100 documentos no RAG', 'Agente de portaria (encomendas)', 'Automações e comunicados', 'Suporte prioritário'].map(f => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <a href={`${APP_URL}/demo`} className="plan-btn plan-btn-solid" onClick={() => track('cta_clicked', { cta: 'plan_pro' })}>
                  Escolher Pro
                </a>
              </div>

              <div className="plan">
                <div className="plan-name">Sob medida</div>
                <div className="plan-price" style={{ fontSize: 28, paddingTop: 8 }}>Consulte</div>
                <div className="plan-desc">Para administradoras e condomínios com necessidades específicas.</div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li><Check size={14} />Sem limite de unidades</li>
                  {['Tudo do Pro', 'Múltiplos prédios', 'Integrações customizadas', 'Contrato e SLA dedicados'].map(f => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <a href={`${APP_URL}/demo`} className="plan-btn plan-btn-outline" onClick={() => track('cta_clicked', { cta: 'plan_sob_medida' })}>
                  Falar com vendas
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Quer ver funcionando<br />no seu <em>condomínio</em>?</h2>
          <p>Agende uma demo gratuita de 30 minutos. Sem compromisso.</p>
          <div className="cta-actions">
            <a href={`${APP_URL}/demo`} className="btn-primary" onClick={() => track('cta_clicked', { cta: 'footer_demo' })}>
              Agendar demo gratuita
              <ChevronRight size={16} />
            </a>
          </div>
        </section>

        <footer className="footer">
          <span className="footer-copy">© 2026 Ape Platform. Todos os direitos reservados.</span>
          <div className="footer-links">
            <a href="mailto:contato@apeplatform.com">Contato</a>
            <a href={`${APP_URL}/privacidade`}>Privacidade</a>
            <a href={`${APP_URL}/termos`}>Termos</a>
          </div>
        </footer>
      </div>
    </>
  )
}
