const { User } = require('../models/user');
const Appointment = require('../models/appointment');
const { format, zonedTimeToUtc } = require('date-fns-tz');

function getAvailabilities(req, res) {
    try {
        const { year, month, day } = req.query;
        const date = new Date(year, month, day);
        const timeZone = 'America/New_York';
        const formattedDate = zonedTimeToUtc(date, timeZone);
        console.log(formattedDate);
        
        Appointment.find({ provider_id: req.params.id, date: formattedDate }, function(err, appointments) {            
            return res.json(appointments);
        })
    } catch (error) {
        return res.status(500).json({ message: error, success: false })
    }
}

module.exports = {
    getAvailabilities
}