const mongoose = require('mongoose');
const { Schema, ObjectID, String } = mongoose;

const userSchema = new Schema({
    id: ObjectID,
    name: String,
    email: String,
    password: String,
    avatar: String
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);