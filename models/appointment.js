const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userSchema } = require('./user');

const appointmentSchema = new Schema({
    provider: userSchema,
    user: userSchema,
    date: Date,
},
{
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema);
