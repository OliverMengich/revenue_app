const AdminModel = require('../../models/admin-model');
const User = require('../../models/user-model');
const Transaction = require('../../models/transactions-model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const returnTransaction = (transactionId) => {
    const transaction = Transaction.findById(transactionId);
    return {
        ...transaction._doc,
        _id: transaction.id,
        createdAt: new Date(transaction._doc.createdAt).toISOString(),
        updatedAt: new Date(transaction._doc.updatedAt).toISOString()
    };
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
            
            }
        })
    },
    getuser:(args) =>{
        return User.findById(args.userId);
    },
    getTransactions:() =>{
        return Transaction.find({});
    },
    getTransaction:(args) =>{
        return Transaction.findById(args.transactionId);
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
        // console.log(user)
        await user.transactionsId.push(res.id);
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
    createAdmin: async ({name, email,phoneNumber,StaffID, imageUrl})=>{
        const checkAdmin= AdminModel.findOne({StaffID});
        if(checkAdmin){
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        if(!hashedPassword){
            throw new Error('Error hashing password');
        }
        upload.single('user_image')
        .then(function (file) {
            console.log(file.path);
            return file.path;
        }).then(filepath=>{
            const admin = new AdminModel({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                StaffID: StaffID,
                password: hashedPassword,
                imageUrl: filepath
            });
            return admin.save();
        })
        .then(result=>{
            console.log(result)
            return {...result._doc, password: null, id: result.id}
        })
        .catch(err=>{
            console.log(err);
        })
    }
}