const Appointment = require('../models/appointment');

function list(req, res) {
    try {
        Appointment.find({}, function(err, appointment) {
            return res.json(appointment)
        })
    } catch (err) {
        res.json(err)
    }    
}

function create(req, res) {
    try {
        const appointment = new Appointment(req.body);
        console.log(appointment)
        appointment.save((err) => {
            if (err) {
                return res.json(err)
            }
            return res.json(appointment)
        })
    } catch (err) {
        res.json(err)
    }    
}

module.exports = {
    list,
    create
}