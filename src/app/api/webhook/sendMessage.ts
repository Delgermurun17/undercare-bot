// src/app/api/webhook/sendMessage.ts

export async function sendMessage(recipientId: string, messageText: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const body = {
      recipient: { id: recipientId },
      message: { text: messageText },
    }
  
    await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  }
  