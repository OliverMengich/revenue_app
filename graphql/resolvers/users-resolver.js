const { User, Transaction, jwt, bcrypt} = require('./essentials');
const cryptojs = require('crypto-js');
// require('dotenv')
const {upload,fetchTransaction} = require('./utils');
require('dotenv/config')
const credentials = {
    apiKey: process.env.APIKEY,// use your sandbox app API key for development in the test environment
    username: process.env.USERNAME,// use 'sandbox' for development in the test environment
};
const Africastalking = require('africastalking')(credentials);
const sms = Africastalking.SMS;
const encryptedText = (text)=>{
    const passPhrase = process.env.ENCRYPTION_KEY
    return cryptojs.AES.encrypt(text,passPhrase).toString()
}
module.exports= {
    login: async({IDNumber, password}) =>{
        const user = await User.findOne({IDNumber: IDNumber});
        if(!user){
            throw new Error('User not found');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect');
        }
        let token = jwt.sign({surname: user.surname, userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        let usertoken = await encryptedText(token);
        const tokenExpiration = 1;
        return {
            userId: user.id,
            usertoken,
            tokenExpiration: tokenExpiration
        }
    },
    //send message to user's phone number, generate a random number between 100000 and 999999 
    // return the random number to the user
    verifyPhoneNumber: async ({phoneNumber}) =>{
        const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        let receipient = "+254"+ phoneNumber.slice(1);
        const options = {
            to: [receipient],
            message: 'Your verification code is ' +randomNumber+ '.'
        }
        return sms.send(options)
        .then(response => {
            return response;
        }).then(()=>{
            return{
                message: 'Message sent',
                randomNumber: randomNumber,
                phoneNumber: phoneNumber
            }
        })
        .catch(error => {
            console.log(error);
            return{
                message: error,
                randomNumber: null,
                phoneNumber: phoneNumber
            }
        })
    },
    createUser: async (args) => {
        // console.log(args);
        return User.findOne({
            IDNumber: args.userInput.IDNumber, 
            email: args.userInput.email
        })
        .then(checkuser=>{
            if(checkuser){
                throw new Error('User already exists');
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
        .then((hashedPassword)=>{
            if(!hashedPassword){
                throw new Error('Error hashing password');
            }
            const user = new User({
                ...args.userInput,
                password: hashedPassword
            });
            return user.save()
        })
        .then(result=>{
            return { ...result._doc, id:result.id,password: null}
        })
        .catch(err=>{
            throw err;
        })
    },
    getuserTransactions: async (args,req)=>{
        // console.log('userID found is: '+req.userId);
        if(!req.userIsAuth){
            throw new Error('UnAuthenticated');
        }
        const user = await User.findById(req.userId);

        if(!user){
            throw new Error("Invalid User Id");
        }
        return user.transactionsId.map(transactionId=>{
            return fetchTransaction(transactionId.toString())
        })
    },
    lipaNaMpesaOnline: async (token,res)=>{
        let token = token;
        let auth = `Bearer ${token}`;
        

        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;

        let url = process.env.lipa_na_mpesa_url;
        let bs_short_code = process.env.lipa_na_mpesa_shortcode;
        let passkey = process.env.lipa_na_mpesa_passkey;

        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1"; //you can enter any amount
        let partyA = "party-sending-funds"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.lipa_na_mpesa_shortcode;
        let phoneNumber = "party-sending-funds"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";
        let accountReference = "lipa-na-mpesa-tutorial";
        let transaction_desc = "Testing lipa na mpesa functionality";

        try {

            let {data} = await axios.post(url,{
                "BusinessShortCode":bs_short_code,
                "Password":password,
                "Timestamp":timestamp,
                "TransactionType":transcation_type,
                "Amount":amount,
                "PartyA":partyA,
                "PartyB":partyB,
                "PhoneNumber":phoneNumber,
                "CallBackURL":callBackUrl,
                "AccountReference":accountReference,
                "TransactionDesc":transaction_desc
            },{
                "headers":{
                    "Authorization":auth
                }
            }).catch(console.log);

            return {
                success:true,
                message:data
            };

        }catch(err){
            return {
                success:false,
                message:err['response']['statusText']
            }
        };
    },
    makeTransaction:async (args, req)=>{
        if(!req.userIsAuth){
            throw new Error('UnAuthenticated');
        }
        if(!req.mpesatoken){
            throw new Error('MPESA')
        }
        let data = await lipaNaMpesaOnline(req)
        if(data){
            return Transaction.findOneAndUpdate({_id: args.transactionId},{
                paid: true,
                bankIdVerification: args.bankIdVerification
            }).then(result=>{
                console.log(result);
                return {
                    ...result,
                    id: result._id,
                    amount: result.amount,
                    paid: result.paid,
                };
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
}