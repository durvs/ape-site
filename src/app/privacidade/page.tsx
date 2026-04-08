import Link from 'next/link'
import { ApeLogoCompact } from '@/components/ApeLogo'

export const metadata = { title: 'Politica de Privacidade' }

export default function PrivacidadePage() {
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
          <Link href="/termos">Termos de Uso</Link>
        </nav>

        <div className="legal-body">
          <h1>Politica de Privacidade</h1>
          <p className="updated">Ultima atualizacao: abril de 2026</p>

          <p>
            A Ape Platform (&quot;nos&quot;, &quot;nossa&quot; ou &quot;Plataforma&quot;) respeita a sua privacidade e esta comprometida com a protecao dos seus dados pessoais, em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).
          </p>

          <h2>1. Dados que coletamos</h2>
          <p>Coletamos os seguintes dados pessoais para operar a Plataforma:</p>
          <ul>
            <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone, CPF e unidade do condominio.</li>
            <li><strong>Dados de uso:</strong> mensagens enviadas ao chatbot, historico de conversas e interacoes com a plataforma.</li>
            <li><strong>Dados tecnicos:</strong> endereco IP, tipo de navegador, sistema operacional e dados de cookies estritamente necessarios.</li>
            <li><strong>Dados do condominio:</strong> documentos enviados pelo sindico (regimento interno, atas, comunicados) para alimentar a base de conhecimento da IA.</li>
          </ul>

          <h2>2. Como usamos seus dados</h2>
          <ul>
            <li>Fornecer e operar o servico de chatbot com IA para o seu condominio.</li>
            <li>Processar documentos e gerar respostas relevantes via RAG (Retrieval-Augmented Generation).</li>
            <li>Enviar comunicados e notificacoes do condominio (e-mail e/ou WhatsApp).</li>
            <li>Melhorar a qualidade do servico e corrigir problemas tecnicos.</li>
            <li>Cumprir obrigacoes legais e regulatorias.</li>
          </ul>

          <h2>3. Base legal para o tratamento</h2>
          <p>
            Tratamos seus dados com base no <strong>consentimento</strong> (ao se cadastrar na plataforma), na <strong>execucao de contrato</strong> (prestacao do servico ao condominio) e no <strong>legitimo interesse</strong> (melhoria do servico e seguranca), conforme Arts. 7o e 11 da LGPD.
          </p>

          <h2>4. Compartilhamento de dados</h2>
          <p>Seus dados podem ser compartilhados com:</p>
          <ul>
            <li><strong>Provedores de infraestrutura:</strong> servicos de hospedagem (Vercel), banco de dados (Supabase/Neon) e autenticacao (Clerk), todos com politicas de privacidade compativeis.</li>
            <li><strong>Provedores de IA:</strong> Anthropic (Claude) e OpenAI, exclusivamente para processamento de mensagens e embeddings. Nenhum dado e usado para treinar modelos de IA de terceiros.</li>
            <li><strong>Administracao do condominio:</strong> o sindico ou administradora tem acesso a dados de moradores cadastrados no respectivo condominio.</li>
          </ul>
          <p>Nao vendemos seus dados pessoais a terceiros.</p>

          <h2>5. Retencao de dados</h2>
          <p>
            Conversas no chat web expiram em 30 dias. Conversas via WhatsApp expiram em 24 horas. Dados cadastrais sao mantidos enquanto a conta estiver ativa. Apos o encerramento do contrato com o condominio, os dados sao eliminados em ate 90 dias, salvo obrigacao legal de retencao.
          </p>

          <h2>6. Seus direitos (LGPD)</h2>
          <p>Voce tem direito a:</p>
          <ul>
            <li>Confirmar a existencia de tratamento dos seus dados.</li>
            <li>Acessar, corrigir ou atualizar seus dados pessoais.</li>
            <li>Solicitar a anonimizacao, bloqueio ou eliminacao de dados desnecessarios.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
            <li>Solicitar a portabilidade dos dados.</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato pelo e-mail <Link href="/contato">página de contato</Link>.
          </p>

          <h2>7. Seguranca</h2>
          <p>
            Adotamos medidas tecnicas e organizacionais para proteger seus dados, incluindo criptografia em transito (TLS), isolamento por tenant (cada condominio acessa apenas seus proprios dados) e controle de acesso baseado em funcoes.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Utilizamos apenas cookies estritamente necessarios para autenticacao e funcionamento da plataforma. Nao utilizamos cookies de rastreamento publicitario.
          </p>

          <h2>9. Alteracoes nesta politica</h2>
          <p>
            Podemos atualizar esta politica periodicamente. Alteracoes significativas serao comunicadas por e-mail ou na propria plataforma. A data de ultima atualizacao sera sempre indicada no topo desta pagina.
          </p>

          <h2>10. Contato</h2>
          <p>
            Em caso de duvidas sobre esta politica ou sobre o tratamento dos seus dados, entre em contato:<br />
            <strong>E-mail:</strong> <Link href="/contato">página de contato</Link>
          </p>
        </div>
      </div>
    </>
  )
}
