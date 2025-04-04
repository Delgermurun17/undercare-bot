import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Verification failed');
    }
  } else if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      body.entry.forEach((entry: any) => {
        const webhook_event = entry.messaging[0];
        console.log('📨 Message received:', webhook_event);
      });

      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.status(404).end();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
