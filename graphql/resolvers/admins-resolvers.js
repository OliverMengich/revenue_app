const AdminModel = require('../../models/admin-model');
// const Transaction = require('../../models/transactions-model');
const { User,Transaction, jwt, bcrypt} = require('./essentials');
const { upload, returnTransaction, fetchTransaction, findUser } = require('./utils');
module.exports = {
    getTransactions: async () =>{
        console.log('here at getTransactions')
        const transactions  = await Transaction.find()
        if(!transactions){
            throw new Error("No transactions found");
        }
        return transactions.map(transaction=>{
            return returnTransaction(transaction)
        })
    },
    createUser: async (args) => {
        return User.findOne({
            IDNumber: args.userInput.IDNumber, 
            phoneNumber: args.userInput.phoneNumber,
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
    createAdmin: async (args)=>{
        try {
            const checkAdmin= await AdminModel.findOne({StaffID: args.adminInput.StaffID});
            if(checkAdmin){
                throw new Error('Admin already exists');
            }
            const hashedPassword = await bcrypt.hash(args.adminInput.password, 12);
            if(!hashedPassword){
                throw new Error('Error hashing password');
            }
            const admin = new AdminModel({
                ...args.adminInput
            });
            await admin.save()
            return { ...admin._doc, id:admin.id,password: null}
        } catch (error) {
            throw error;
        }
    },
    getTransaction: async (args) =>{
        const transaction = await Transaction.findById(args.transactionId);
        if(!transaction){
            throw new Error("Transaction not found")
        }
        return {
            ...transaction._doc,
            to: findUser.bind(this, transaction._doc.to)
        }
    },
    adminLogin: async({StaffID,password}) =>{
        const administrator = await AdminModel.findOne({StaffID: StaffID});
        if(!administrator){
            throw new Error('Administrator not found');
        }
        const isEqual = await bcrypt.compare(password, administrator.password);
        if(!isEqual){
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({administratorId: administrator.id}, 'secret', {expiresIn: '1h'});
        const tokenExpiration = 1;
        return {
            administratorId: administrator.id,
            token: token,
            tokenExpiration: tokenExpiration
        }
    },
    createTransaction: async(args)=>{
        const user = await User.findOne({_id: args.transaction.to})
        if(!user){
            throw new Error('No user');
        }
        const newTransaction = new Transaction({
            to: args.transaction.to,
            amount: args.transaction.amount,
            dueDate: args.transaction.dueDate,
        })
        const res = await newTransaction.save()
        await user.transactionsId.push(res.id);
        await user.save();
        return {
            ...res._doc,
            dueDate: new Date(res._doc.dueDate).toISOString(),
            to: findUser.bind(this, res._doc.to)
        }
    },
    getusers: async (args)=>{
        const users = await User.find({});
        return users.map(user=>{
            return {
                ...user._doc,
                password: null,
                transactionsId: user._doc.transactionsId.map(transactionId=>{
                    return fetchTransaction(transactionId.toString())
                })
            }
        })
    },
    getuser:(args) =>{
        return User.findById(args.userId)
        .then(user=>{
            if(!user){
                throw new Error("no user found");
            }
            return{
                ...user._doc,
                transactionsId: user._doc.transactionsId.map(transactionId=>{
                    return fetchTransaction(transactionId.toString())
                })
            }
        })
    },
}