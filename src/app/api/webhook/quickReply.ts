// src/app/api/webhook/quickReply.ts

export async function sendQuickReply(recipientId: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const body = {
      recipient: { id: recipientId },
      message: {
        text: "Сайн байна уу? Та ямар үйлчилгээ сонирхож байна вэ?",
        quick_replies: [
          { content_type: "text", title: "Сурагч", payload: "ROLE_STUDENT" },
          { content_type: "text", title: "Багш", payload: "ROLE_TEACHER" },
          { content_type: "text", title: "Админ", payload: "ROLE_ADMIN" }
        ]
      }
    }
  
    await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  }
  