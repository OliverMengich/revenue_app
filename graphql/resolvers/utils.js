const { User, Transaction, multer} = require('./essentials');
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
    console.log(id);
    try{
        const transaction = await Transaction.findById(id);
        console.log(transaction);
        return returnTransaction(transaction);
    }catch(err){
        throw err;
    }
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
exports.upload = upload;
exports.returnTransaction = returnTransaction;
exports.fetchTransaction = fetchTransaction;
exports.findUser = findUser;