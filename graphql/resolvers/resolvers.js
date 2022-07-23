const AdminModel = require('../../models/admin-model');
const User = require('../../models/user-model');
const Transaction = require('../../models/transactions-model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const findUser = async (id) =>{
    const user = await User.findById(id);
    if(!user){
        throw new Error("Invalid User Id")
    }
    return{
        ...user._doc,
        password: null,
    }
}
const fetchTransaction = async (id)=>{
    // console.log(typeof(id))
    const transaction = await Transaction.findById(id);
    if(!transaction){
        throw new Error("No transaction found");
    }
    // console.log(transaction.dueDate)
    // return transaction;
    return returnTransaction(transaction);
}
const returnTransaction =  (transaction) =>{
    return{
        ...transaction._doc,
        dueDate: new Date(transaction.dueDate).toISOString(),
        to: findUser.bind(this, transaction.to.toString())
    }
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
module.exports = {
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
            // console.log(user._doc.transactionsId[0].toString())
            return{
                ...user._doc,
                transactionsId: user._doc.transactionsId.map(transactionId=>{
                    return fetchTransaction(transactionId.toString())
                })
            }
        })
    },
    getTransactions: async () =>{
        const transactions  = await Transaction.find()
        if(!transactions){
            throw new Error("No transactions found");
        }
        return transactions.map(transaction=>{
            return returnTransaction(transaction)
        })
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
                name: args.userInput.name,
                email: args.userInput.email,
                phoneNumber: args.userInput.phoneNumber,
                IDNumber: args.userInput.IDNumber,
                age: args.userInput.age,
                dateOfBirth: args.userInput.dateOfBirth,
                password: hashedPassword,
                imageUrl: args.userInput.imageUrl
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
        return {...res._doc,dueDate: new Date(res._doc.dueDate).toISOString()}
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
    }
}