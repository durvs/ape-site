/**
 * Ape Platform — Logo System
 *
 * ApeLogoMark  →  só o ícone (40×40 por padrão)
 * ApeLogo      →  mark + logotype horizontal
 *
 * Prop `dark`:
 *   false (padrão) → logotype escuro (#0F172A), para fundos claros
 *   true           → logotype branco, para fundos escuros (#0B0D12, etc.)
 *
 * O mark é sempre indigo (#6366F1) com marca branca interna —
 * funciona em qualquer fundo sem ajuste.
 */

// ─── Mark ─────────────────────────────────────────────────────────────────────
//
// Shape:  casa (telhado triangular) + cauda de speech bubble apontando para baixo
//         centrada na base — lê-se simultaneamente como "prédio" e "mensagem".
// Inside: dois retângulos indigo recortados = linhas de texto no balão.
//
//           ╱╲          ← telhado (roof peak em 20,5)
//          /  \
//         /    \
//        /──────\       ← corpo do prédio
//        │  ▬▬  │       ← linha 1 (mensagem)
//        │  ▬▬  │       ← linha 2 (mensagem)
//        └──╲╱──┘       ← cauda do speech bubble

export function ApeLogoMark({ size = 40, dark: _dark = false }: { size?: number; dark?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ape Platform"
      role="img"
    >
      {/* Fundo: rounded square indigo */}
      <rect width="40" height="40" rx="10" fill="#6366F1" />

      {/* Silhueta branca: casa + cauda de balão */}
      {/* M 20 5  → pico do telhado (centro-topo)          */}
      {/* L 34 15 → beiral direito                         */}
      {/* V 29    → parede direita desce                   */}
      {/* L 26 29 → início da cauda (direita)              */}
      {/* L 20 36 → ponta da cauda (centro-baixo)          */}
      {/* L 14 29 → fim da cauda (esquerda)                */}
      {/* H 6     → parede esquerda (base)                 */}
      {/* L 6 15  → beiral esquerdo                        */}
      {/* Z       → fecha ao pico do telhado               */}
      <path
        d="M20 5L34 15V29H26L20 36L14 29H6V15L20 5Z"
        fill="white"
      />

      {/* Linhas de mensagem: recortam a silhueta branca em indigo */}
      <rect x="12" y="17.5" width="16" height="2.5" rx="1.25" fill="#6366F1" />
      <rect x="12" y="22"   width="11" height="2.5" rx="1.25" fill="#6366F1" />
    </svg>
  )
}

// ─── Full Logo ─────────────────────────────────────────────────────────────────

export function ApeLogo({
  className,
  dark = false,
  size = 36,
}: {
  className?: string
  dark?: boolean
  size?: number
}) {
  const textColor   = dark ? '#FFFFFF'  : '#0F172A'
  const accentColor = dark ? '#818CF8'  : '#6366F1'
  const subColor    = dark ? '#94A3B8'  : '#64748B'

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif",
        userSelect: 'none',
      }}
    >
      <ApeLogoMark size={size} dark={dark} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {/* Logotype principal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1px',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontSize: Math.round(size * 0.47) + 'px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: textColor,
              lineHeight: 1,
            }}
          >
            ape
          </span>
          <span
            style={{
              fontSize: Math.round(size * 0.47) + 'px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: accentColor,
              lineHeight: 1,
            }}
          >
            platform
          </span>
        </div>

        {/* Tagline opcional — mantida pequena para não poluir */}
        <span
          style={{
            fontSize: Math.round(size * 0.22) + 'px',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: subColor,
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          gestão inteligente de condomínios
        </span>
      </div>
    </div>
  )
}

// ─── Compact (sem tagline) ─────────────────────────────────────────────────────
// Variante sem tagline — para navbars apertadas.

export function ApeLogoCompact({
  className,
  dark = false,
  size = 32,
}: {
  className?: string
  dark?: boolean
  size?: number
}) {
  const textColor   = dark ? '#FFFFFF' : '#0F172A'
  const accentColor = dark ? '#818CF8' : '#6366F1'

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif",
        userSelect: 'none',
      }}
    >
      <ApeLogoMark size={size} dark={dark} />
      <span style={{ fontSize: Math.round(size * 0.47) + 'px', fontWeight: 700, letterSpacing: '-0.03em', color: textColor, lineHeight: 1 }}>
        ape
      </span>
      <span style={{ fontSize: Math.round(size * 0.47) + 'px', fontWeight: 500, letterSpacing: '-0.02em', color: accentColor, lineHeight: 1 }}>
        platform
      </span>
    </div>
  )
}
