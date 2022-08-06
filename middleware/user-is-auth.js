const jwt = require('jsonwebtoken');
require('dotenv/config');
const cryptojs = require('crypto-js');
const decryptedText = (cipherText) =>{
    const passPhrase = process.env.ENCRYPTION_KEY;
    const bytes = cryptojs.AES.decrypt(cipherText,passPhrase);
    const originalText = bytes.toString(cryptojs.enc.Utf8);
    return originalText
}
module.exports = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.userIsAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if(!token || token ===' '){
        req.userIsAuth = false;
        return next();
    }
    let decodedToken;
    decodedToken = await decryptedText(token);
    try {
        decodedToken = await jwt.verify(decodedToken,process.env.SECRET_KEY);
    } catch (error) {
        req.userIsAuth = false;
        return next();
    }
    if(!decodedToken.userId){
        req.userIsAuth = false;
        return next();
    }
    req.userIsAuth = true;
    req.userId= decodedToken.userId;
    next();
}
