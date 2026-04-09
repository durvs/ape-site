import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0D12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(99,102,241,0.2) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -65%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)',
          }}
        />

        {/* Logo mark — house + chat bubble (SVG inline) */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 22,
            background: '#6366F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            boxShadow: '0 0 60px rgba(99,102,241,0.5)',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
            <path d="M20 5L34 15V29H26L20 36L14 29H6V15L20 5Z" fill="white" />
            <rect x="12" y="17.5" width="16" height="2.5" rx="1.25" fill="#6366F1" />
            <rect x="12" y="22"   width="11" height="2.5" rx="1.25" fill="#6366F1" />
          </svg>
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#818CF8',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          apeplatform.com
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: '#F8FAFC',
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          IA que opera seu condomínio
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 22,
            color: '#64748B',
            textAlign: 'center',
            maxWidth: 620,
            lineHeight: 1.5,
          }}
        >
          Chatbot treinado no regimento, ata automática, reservas e comunicados por WhatsApp.
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 15,
            color: '#1E293B',
            letterSpacing: '0.05em',
          }}
        >
          apeplatform.com
        </div>
      </div>
    ),
    { ...size },
  )
}
