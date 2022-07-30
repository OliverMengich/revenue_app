const { User, Transaction, jwt, bcrypt} = require('./essentials');
const {upload,fetchTransaction} = require('./utils');
const credentials = {
    apiKey: 'c57af6b580ada6bfa88a99b74293122931cb9ab4e54d53571b1992bbd066a681',// use your sandbox app API key for development in the test environment
    username: 'oliverViolin',// use 'sandbox' for development in the test environment
};
const Africastalking = require('africastalking')(credentials);
const sms = Africastalking.SMS;
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
        const token = jwt.sign({name: user.name, userId: user._id}, 'secret', {expiresIn: '1h'});
        const tokenExpiration = 1;
        return {
            userId: user.id,
            token: token,
            tokenExpiration: tokenExpiration
        }
    },
    //send message to user's phone number, generate a random number between 100000 and 999999 
    // return the random number to the user
    verifyPhoneNumber: ({phoneNumber}) =>{
        const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const options = {
            to: phoneNumber,
            message: 'Your verification code is ' +randomNumber+ '.'
        }
        sms.send(options)
        .then(response => {
            console.log(response);
            return{
                message: 'Message sent',
                randomNumber: randomNumber,
                phoneNumber: phoneNumber
            }
        })
        .catch(error => {
            return{
                message: error,
                randomNumber: null,
                phoneNumber: phoneNumber
            }
        })
    },
    createUser: async (args) => {
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
    getuserTransactions: async (args)=>{
        const user = await User.findById(args.userId);
        if(!user){
            throw new Error("Invalid User Id")
        }
        return user.transactionsId.map(transactionId=>{
            return fetchTransaction(transactionId.toString())
        })
    },
    makeTransaction: async({transactionId})=>{
        Transaction.findOneAndUpdate({_id: transactionId},{
            paid: true
        }).then(result=>{
            console.log(result);
        })
        .catch(err=>{

        })
    },
}