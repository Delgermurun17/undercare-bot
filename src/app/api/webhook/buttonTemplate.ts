export async function sendButtonTemplate(senderId: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const response = await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Та тусламж авах уу?',
              buttons: [
                {
                  type: 'postback',
                  title: 'Тийм',
                  payload: 'GET_HELP',
                },
                {
                  type: 'postback',
                  title: 'Үгүй',
                  payload: 'THANK_YOU',
                },
              ],
            },
          },
        },
      }),
    })
  
    if (!response.ok) {
      console.error('Error sending button template:', response.statusText)
    }
  }
  