// src/app/api/webhook/buttonTemplate.ts

export async function sendButtonTemplate(recipientId: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const body = {
      recipient: { id: recipientId },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Танд дараах сонголтууд байна:",
            buttons: [
              {
                type: "web_url",
                url: "https://undercare-bot.vercel.app",
                title: "Вэбсайт руу очих"
              },
              {
                type: "postback",
                title: "Тусламж авах",
                payload: "GET_HELP"
              }
            ]
          }
        }
      }
    }
  
    await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  }
  