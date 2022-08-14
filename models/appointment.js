const mongoose = require('mongoose');
const { Schema, ObjectID, String, Date } = mongoose;
const userSchema = require('./user');

const appointmentSchema = new Schema({
    id: ObjectID,
    provider_id: String,
    user: userSchema,
    date: Date,
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Appointment', appointmentSchema);