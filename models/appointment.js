const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userSchema } = require('./user');

const appointmentSchema = new Schema({
    provider_id: String,
    user: userSchema,
    date: Date,
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Appointment', appointmentSchema);