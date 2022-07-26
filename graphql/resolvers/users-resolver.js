const { User, Transaction, jwt, bcrypt, multer} = require('./essentials');
const {upload,fetchTransaction} = require('./utils');
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