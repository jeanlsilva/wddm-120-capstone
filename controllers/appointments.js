const Appointment = require('../models/appointment');
const { User } = require('../models/user');

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
        User.findById(req.body.provider_id, function(err, user) {
            console.log(user);
            const appointment = new Appointment({
                date: req.body.date,
                provider_id: user._id,
                user
            });

            appointment.save((err) => {
                if (err) {
                    return res.json(err)
                }
                return res.json(appointment)
            })
        });
    } catch (err) {
        res.json(err)
    }    
}

module.exports = {
    list,
    create
}