const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: String,
        unique: true,
        required: true
    },
    StaffID:{
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "Admin",
        required: true
    }
})
module.exports= mongoose.model("admins",adminSchema);