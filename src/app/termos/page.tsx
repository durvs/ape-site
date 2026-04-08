import Link from 'next/link'
import { ApeLogoCompact } from '@/components/ApeLogo'

export const metadata = { title: 'Termos de Uso' }

export default function TermosPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .legal-page { font-family: 'DM Sans', sans-serif; min-height: 100vh; background: #F8FAFC; }
        .legal-nav { padding: 20px 32px; border-bottom: 1px solid #E5E7EB; background: #fff; display: flex; align-items: center; justify-content: space-between; }
        .legal-nav a { color: #6B7280; font-size: 13px; text-decoration: none; }
        .legal-nav a:hover { color: #111827; }
        .legal-body { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
        .legal-body h1 { font-family: 'Instrument Serif', serif; font-size: 36px; color: #0F172A; margin-bottom: 8px; }
        .legal-body .updated { font-size: 13px; color: #9CA3AF; margin-bottom: 40px; }
        .legal-body h2 { font-size: 18px; font-weight: 600; color: #0F172A; margin: 36px 0 12px; }
        .legal-body p, .legal-body li { font-size: 15px; color: #475569; line-height: 1.75; font-weight: 300; }
        .legal-body ul { padding-left: 20px; margin: 8px 0; }
        .legal-body li { margin-bottom: 4px; }
        .legal-body a { color: #6366F1; text-decoration: none; }
        .legal-body a:hover { text-decoration: underline; }
      `}</style>

      <div className="legal-page">
        <nav className="legal-nav">
          <Link href="/">
            <ApeLogoCompact dark size={28} />
          </Link>
          <Link href="/privacidade">Politica de Privacidade</Link>
        </nav>

        <div className="legal-body">
          <h1>Termos de Uso</h1>
          <p className="updated">Ultima atualizacao: abril de 2026</p>

          <p>
            Estes Termos de Uso (&quot;Termos&quot;) regem o acesso e uso da plataforma Ape Platform (&quot;Plataforma&quot;), operada por Ape Platform Tecnologia LTDA. Ao utilizar a Plataforma, voce concorda com estes Termos.
          </p>

          <h2>1. Definicoes</h2>
          <ul>
            <li><strong>Plataforma:</strong> o software SaaS Ape Platform, acessivel via web e WhatsApp.</li>
            <li><strong>Tenant:</strong> cada condominio cadastrado como cliente na Plataforma.</li>
            <li><strong>Administrador:</strong> sindico ou administradora responsavel pela gestao do tenant.</li>
            <li><strong>Morador:</strong> residente cadastrado em um tenant que utiliza o chatbot e servicos.</li>
          </ul>

          <h2>2. Objeto</h2>
          <p>
            A Plataforma oferece um chatbot com inteligencia artificial treinado nos documentos do condominio, permitindo que moradores tirem duvidas e recebam comunicados. O servico inclui painel administrativo para sindicos, chat via web e WhatsApp, e envio de notificacoes.
          </p>

          <h2>3. Cadastro e acesso</h2>
          <ul>
            <li>O cadastro do condominio e feito pelo Administrador, que e responsavel pelas informacoes fornecidas.</li>
            <li>Moradores sao convidados pelo Administrador e devem fornecer dados verdadeiros no cadastro.</li>
            <li>Cada usuario e responsavel pela seguranca das suas credenciais de acesso.</li>
            <li>A Plataforma utiliza autenticacao via terceiros (Clerk) e nao armazena senhas diretamente.</li>
          </ul>

          <h2>4. Uso aceitavel</h2>
          <p>Ao usar a Plataforma, voce se compromete a:</p>
          <ul>
            <li>Nao utilizar o chatbot para fins ilegais, ofensivos ou que violem direitos de terceiros.</li>
            <li>Nao tentar acessar dados de outros condominios ou usuarios.</li>
            <li>Nao enviar conteudo malicioso, spam ou tentativas de manipulacao da IA.</li>
            <li>Nao fazer engenharia reversa, copiar ou redistribuir o software da Plataforma.</li>
          </ul>

          <h2>5. Documentos e conteudo</h2>
          <ul>
            <li>O Administrador e responsavel pelos documentos enviados a Plataforma (regimentos, atas, comunicados).</li>
            <li>A Plataforma processa esses documentos para gerar respostas via IA, mas nao verifica a veracidade ou legalidade do conteudo.</li>
            <li>Os documentos pertencem ao condominio. A Plataforma nao adquire direitos de propriedade sobre o conteudo enviado.</li>
          </ul>

          <h2>6. Respostas da IA</h2>
          <p>
            As respostas geradas pelo chatbot sao baseadas exclusivamente nos documentos fornecidos pelo condominio. A Plataforma <strong>nao garante</strong> que as respostas sejam completas, precisas ou atualizadas. O chatbot nao substitui assessoria juridica, contabil ou tecnica. Decisoes importantes devem ser validadas com profissionais qualificados.
          </p>

          <h2>7. Planos e pagamento</h2>
          <ul>
            <li>Os planos e precos vigentes estao disponiveis em <Link href="/#planos">apeplatform.online</Link>.</li>
            <li>O pagamento e mensal e processado via Stripe. O Administrador e responsavel por manter os dados de pagamento atualizados.</li>
            <li>Em caso de inadimplencia superior a 15 dias, a Plataforma podera suspender o acesso ao tenant.</li>
            <li>Cancelamentos podem ser feitos a qualquer momento. O acesso permanece ativo ate o fim do periodo ja pago.</li>
          </ul>

          <h2>8. Disponibilidade e suporte</h2>
          <p>
            A Plataforma se esforca para manter disponibilidade continua, mas nao garante 100% de uptime. Manutencoes programadas serao comunicadas com antecedencia. Suporte tecnico esta disponivel por e-mail e, para planos Pro e Sob Medida, com prioridade.
          </p>

          <h2>9. Propriedade intelectual</h2>
          <p>
            Todo o software, design, marcas e tecnologia da Plataforma sao de propriedade da Ape Platform. O uso da Plataforma nao confere ao usuario qualquer direito de propriedade intelectual sobre o software.
          </p>

          <h2>10. Limitacao de responsabilidade</h2>
          <ul>
            <li>A Plataforma nao se responsabiliza por danos decorrentes de respostas da IA utilizadas sem a devida validacao.</li>
            <li>A Plataforma nao se responsabiliza por conteudo enviado pelos Administradores ou moradores.</li>
            <li>Em qualquer hipotese, a responsabilidade total da Plataforma esta limitada ao valor pago pelo tenant nos ultimos 12 meses.</li>
          </ul>

          <h2>11. Rescisao</h2>
          <p>
            A Plataforma pode suspender ou encerrar o acesso de um tenant ou usuario que viole estes Termos, mediante notificacao previa de 5 dias uteis, exceto em casos de violacao grave (uso ilegal, tentativa de acesso nao autorizado), em que a suspensao pode ser imediata.
          </p>

          <h2>12. Alteracoes nos Termos</h2>
          <p>
            Estes Termos podem ser atualizados periodicamente. Alteracoes significativas serao comunicadas com 15 dias de antecedencia por e-mail ou na Plataforma. O uso continuado apos a atualizacao constitui aceitacao dos novos Termos.
          </p>

          <h2>13. Lei aplicavel e foro</h2>
          <p>
            Estes Termos sao regidos pelas leis da Republica Federativa do Brasil. Fica eleito o foro da Comarca de Sao Paulo/SP para resolver quaisquer controversias decorrentes destes Termos, com exclusao de qualquer outro.
          </p>

          <h2>14. Contato</h2>
          <p>
            Duvidas sobre estes Termos podem ser encaminhadas para:<br />
            <strong>E-mail:</strong> <Link href="/contato">página de contato</Link>
          </p>
        </div>
      </div>
    </>
  )
}
