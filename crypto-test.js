const cryptojs = require('crypto-js');
require('dotenv/config');
const encryptedText = (text)=>{
    const passPhrase = process.env.ENCRYPTION_KEY
    return cryptojs.AES.encrypt(text,passPhrase).toString()
}
console.log('Encrypted text is: '+encryptedText("this is a secret message"));

const decryptedText = (cipherText) =>{
    const passPhrase = process.env.ENCRYPTION_KEY;
    const bytes = cryptojs.AES.decrypt(cipherText,passPhrase);
    const originalText = bytes.toString(cryptojs.enc.Utf8);
    return originalText
}
console.log('Decrypted text is: '+decryptedText(encryptedText("this is a secret message")));
