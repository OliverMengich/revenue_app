const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    surname:{
        type:String,
        required: true
    },
    othernames:{
        type: String,
        required: true
    },
    IDNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
        required: true,
    },
    role:{
        type: String,
        default: "User",
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true,
        
    },
    imageUrl: {
        type: String,
    },
    transactionsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transactions'
    }]
});
module.exports = mongoose.model("Users",userSchema);