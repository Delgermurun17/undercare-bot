export async function sendQuickReply(senderId: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const response = await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: {
          text: 'Танд ямар тусламж хэрэгтэй байна?',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Тусламж',
              payload: 'GET_HELP',
            },
            {
              content_type: 'text',
              title: 'Баярлалаа',
              payload: 'THANK_YOU',
            },
          ],
        },
      }),
    })
  
    if (!response.ok) {
      console.error('Error sending quick reply:', response.statusText)
    }
  }
  