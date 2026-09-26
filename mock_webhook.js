require('dotenv').config({ path: '.env.local' });
const crypto = require('crypto');
const secret = process.env.META_APP_SECRET;

const payload = {
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "148943433078192",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "1234567890",
              "phone_number_id": "1301043959760051"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Test User"
                },
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "from": "1234567890",
                "id": "wamid.mock123",
                "timestamp": "1700000000",
                "text": {
                  "body": "Hello from mock script"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
};

const rawBody = JSON.stringify(payload);
const signature = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

fetch('https://wacrm-p5ks.vercel.app/api/whatsapp/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-hub-signature-256': signature
  },
  body: rawBody
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Response:', await res.text());
}).catch(console.error);
