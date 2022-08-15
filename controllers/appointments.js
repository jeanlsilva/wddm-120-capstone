const Appointment = require('../models/appointment');
const { User } = require('../models/user');

function list(req, res) {
    try {
        Appointment.find({}, function(err, appointment) {
            return res.json(appointment)
        })
    } catch (error) {
        return res.status(400).json({ error })
    }    
}

function listOne(req, res) {
    try {
        Appointment.findById(req.params.id, function(err, appointment) {
            return res.json(appointment);
        })
    } catch (error) {
        return res.status(400).json({ error });
    }
}

function listByUser(req, res) {
    try {
        User.findById(req.params.id, function(err, user) {
            if (!user) {
                return res.status(404).json({ error: "User does not exist" });
            }

            Appointment.find({ "user._id": req.params.id }, function(err, users) {
                return res.json({ users });
            })
        })        
    } catch (error) {
        return res.status(400).json({ error });
    }
}

function create(req, res) {
    try {
        User.findById(req.body.user_id, function(err, user) {
            const appointment = new Appointment({
                date: req.body.date,
                provider_id: user._id,
                user
            });

            appointment.save((err) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
                return res.json(appointment)
            })
        });
    } catch (error) {
        res.status(400).json({ error })
    }    
}

module.exports = {
    list,
    listOne,
    listByUser,
    create
}