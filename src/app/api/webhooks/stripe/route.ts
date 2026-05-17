import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const NOTIFY_TO = process.env.SIGNUP_NOTIFICATION_EMAIL ?? 'duurval@gmail.com'

function formatBRL(cents: number | null | undefined) {
  if (cents == null) return '—'
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('[stripe webhook] STRIPE_WEBHOOK_SECRET ausente')
    return NextResponse.json({ error: 'Webhook não configurado' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 })
  }

  const body = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe webhook] assinatura inválida', err)
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? '—'
  const customerName = session.customer_details?.name ?? '—'
  const customerPhone = session.customer_details?.phone ?? '—'
  const plan =
    (session.metadata?.plan as string | undefined) ??
    (typeof session.subscription === 'object' && session.subscription
      ? (session.subscription.metadata?.plan as string | undefined)
      : undefined) ??
    '—'

  let trialEndLabel = '—'
  if (session.subscription) {
    try {
      const subId =
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id
      const sub = await stripe.subscriptions.retrieve(subId)
      if (sub.trial_end) {
        trialEndLabel = new Date(sub.trial_end * 1000).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        })
      }
    } catch (err) {
      console.error('[stripe webhook] falha ao buscar subscription', err)
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: `Ape Platform <${process.env.NOTIFICATION_FROM_EMAIL}>`,
      to: [NOTIFY_TO],
      replyTo: customerEmail !== '—' ? customerEmail : undefined,
      subject: `🚀 Novo locatário — ${customerName !== '—' ? customerName : customerEmail} (${plan})`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:32px;background:#fff;">
          <div style="background:#6366F1;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
            <p style="margin:0;font-size:12px;opacity:0.7;text-transform:uppercase;letter-spacing:0.1em;">Novo locatário</p>
            <h2 style="margin:4px 0 0;font-size:22px;">Ape Platform</h2>
          </div>
          <div style="border:1px solid #E5E7EB;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#6B7280;width:160px;">Nome</td><td style="padding:8px 0;color:#111827;font-weight:600;">${customerName}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${customerEmail}" style="color:#6366F1;">${customerEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">Telefone</td><td style="padding:8px 0;color:#111827;">${customerPhone}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">Plano</td><td style="padding:8px 0;color:#111827;font-weight:600;text-transform:capitalize;">${plan}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">Valor</td><td style="padding:8px 0;color:#111827;">${formatBRL(session.amount_total)}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">Trial até</td><td style="padding:8px 0;color:#111827;">${trialEndLabel}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;">Stripe Customer</td><td style="padding:8px 0;color:#111827;font-family:monospace;font-size:12px;">${typeof session.customer === 'string' ? session.customer : session.customer?.id ?? '—'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:20px 0;" />
            <p style="font-size:12px;color:#9CA3AF;margin:0;">Recebido em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('[stripe webhook] falha ao enviar email', err)
  }

  return NextResponse.json({ received: true })
}
