const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: String
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
module.exports = { userSchema }