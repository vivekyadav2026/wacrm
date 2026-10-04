const fs = require('fs');

const imgPath = 'C:/Users/ranje/.gemini/antigravity/brain/c980d255-e312-4cf1-b8f7-2d9219080739/.user_uploaded/media_1791151915806.jpg';

fs.copyFileSync(imgPath, 'public/logo.jpg');
fs.copyFileSync(imgPath, 'src/app/icon.jpg');
console.log('Images copied');

const enJsonPath = 'messages/en.json';
let enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

for (let section in enJson) {
  for (let key in enJson[section]) {
    if (typeof enJson[section][key] === 'string') {
      enJson[section][key] = enJson[section][key].replace(/Foundida Whatsapp CRM/g, 'Foundida');
    }
  }
}

fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('en.json updated');

