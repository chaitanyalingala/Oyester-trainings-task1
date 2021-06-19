const mongoose = require('mongoose');
const Todo = require('./Todo');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now,
    },
    todo : [{ type : mongoose.Schema.Types.Mixed,ref : 'Todo'}]
})

const User = mongoose.model('User',UserSchema);

module.exports = User;