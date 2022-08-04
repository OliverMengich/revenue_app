const jwt = require('jsonwebtoken');
require('dotenv/config');
const decryptedText = (cipherText) =>{
    const passPhrase = process.env.ENCRYPTION_KEY;
    const bytes = cryptojs.AES.decrypt(cipherText,passPhrase);
    const originalText = bytes.toString(cryptojs.enc.Utf8);
    return originalText
}
module.exports = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    if(!token || token ===' '){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = await decryptedText(token);
        decodedToken = await jwt.verify(decodedToken,process.env.SECRET_KEY);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken.administratorId){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId= decodedToken.administratorId;
    next();
}
