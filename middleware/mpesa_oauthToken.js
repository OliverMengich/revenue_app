require('dotenv/config');
const axios = require('axios');
module.exports=(req,res,next) =>{

    let consumer_key = process.env.consumer_key;
    let consumer_secret = process.env.consumer_secret;

    let url = process.env.oauth_token_url;

    //form a buffer of the consumer key and secret
    let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

    let auth = `Basic ${buffer.toString('base64')}`;

    try{

        let {data} = await axios.get(url,{
            "headers":{
                "Authorization":auth
            }
        });

        req.mpesatoken = data['access_token'];

        return next();

    }catch(err){

        return res.send({
            success:false,
            message:err['response']['statusText']
        });

    }
    
};