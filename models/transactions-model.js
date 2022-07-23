const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    bankIdVerification: {
        type: String,
        default: ""
    }
},{
    timestamps: true //mongoose automatically adds a created at and updated at
}
)
module.exports= mongoose.model("transactions",transactionSchema);