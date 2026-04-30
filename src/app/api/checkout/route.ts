import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const PLANS = {
  essencial: {
    name: 'Plano Essencial',
    description: 'Chatbot com IA para condomínios de até 49 unidades',
    amount: 19900, // R$199,00
  },
  pro: {
    name: 'Plano Pro',
    description: 'Chatbot com IA para condomínios de até 200 unidades',
    amount: 39900, // R$399,00
  },
} as const

type PlanKey = keyof typeof PLANS

export async function POST(request: Request) {
  const { plan, email } = await request.json()

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const selected = PLANS[plan as PlanKey]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://apeplatform.online'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    ...(email ? { customer_email: email } : {}),
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: selected.name,
            description: selected.description,
          },
          unit_amount: selected.amount,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Ativação única',
            description: 'Configuração completa, onboarding e treinamento da IA',
          },
          unit_amount: 49900, // R$499,00
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 30,
      metadata: { plan },
    },
    locale: 'pt-BR',
    success_url: `${appUrl}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/#planos`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
