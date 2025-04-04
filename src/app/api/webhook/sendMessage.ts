export async function sendMessage(senderId: string, message: string) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  
    const response = await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: senderId },
        message: { text: message },
      }),
    })
  
    if (!response.ok) {
      console.error('Error sending message:', response.statusText)
    }
  }
  