// src/app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified!')
    return new Response(challenge, { status: 200 })
  } else {
    return new Response('❌ Token verification failed', { status: 403 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  console.log('📨 Incoming POST:', body)

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const event = entry.messaging?.[0]
      console.log('💬 Message event:', event)
    })

    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 })
  }

  return new Response('Not Found', { status: 404 })
}
