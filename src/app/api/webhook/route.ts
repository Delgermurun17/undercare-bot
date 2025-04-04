// src/app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { sendMessage } from './sendMessage'
import { sendQuickReply } from './quickReply'
import { sendButtonTemplate } from './buttonTemplate'

// GET: webhook verify
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  } else {
    return new Response('Token verification failed', { status: 403 })
  }
}

// POST: webhook message handler
export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const event = entry.messaging[0]
      const senderId = event.sender.id
      const messageText = event.message?.text
      const postback = event.postback?.payload

      if (messageText === 'Сайн уу') {
        await sendQuickReply(senderId)
      }

      if (messageText === 'Админ') {
        await sendButtonTemplate(senderId)
      }

      if (postback === 'GET_HELP') {
        await sendMessage(senderId, 'Манай тусламжийн баг удахгүй холбогдоно!')
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  }

  return new Response('Not Found', { status: 404 })
}
