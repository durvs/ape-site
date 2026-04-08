import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { name, email, phone, condoName, units } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Nome e e-mail são obrigatórios' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: `Ape Platform <${process.env.NOTIFICATION_FROM_EMAIL}>`,
      to: ['duurval@gmail.com'],
      replyTo: email,
      subject: `🎯 Nova solicitação de demo — ${condoName || 'Condomínio não informado'}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:32px;background:#fff;">
          <div style="background:#6366F1;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
            <p style="margin:0;font-size:12px;opacity:0.7;text-transform:uppercase;letter-spacing:0.1em;">Nova Demo Solicitada</p>
            <h2 style="margin:4px 0 0;font-size:22px;">Ape Platform</h2>
          </div>
          <div style="border:1px solid #E5E7EB;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#6B7280;width:140px;">Nome</td><td style="padding:8px 0;color:#111827;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#6366F1;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6B7280;">Telefone</td><td style="padding:8px 0;color:#111827;">${phone}</td></tr>` : ''}
              ${condoName ? `<tr><td style="padding:8px 0;color:#6B7280;">Condomínio</td><td style="padding:8px 0;color:#111827;">${condoName}</td></tr>` : ''}
              ${units ? `<tr><td style="padding:8px 0;color:#6B7280;">Nº de unidades</td><td style="padding:8px 0;color:#111827;">${units}</td></tr>` : ''}
            </table>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:20px 0;" />
            <p style="font-size:12px;color:#9CA3AF;margin:0;">Solicitação recebida em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[demo route]', err)
    return NextResponse.json({ error: 'Erro ao enviar' }, { status: 500 })
  }
}
