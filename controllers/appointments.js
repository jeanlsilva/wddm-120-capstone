const Appointment = require('../models/appointment');
const { User } = require('../models/user');
const { zonedTimeToUtc } = require('date-fns-tz');

function list(req, res) {
  try {
    Appointment.find({}, function (err, appointment) {
      return res.json(appointment);
    });
  } catch (error) {
    return res.status(400).json({ message: error, success: false });
  }
}

function listOne(req, res) {
  try {
    Appointment.findById(req.params.id, function (err, appointment) {
      return res.json(appointment);
    });
  } catch (error) {
    return res.status(400).json({ message: error, success: false });
  }
}

function listByUser(req, res) {
  try {
    User.findById(req.params.id, function (err, user) {
      if (!user) {
        return res
          .status(404)
          .json({ message: 'User does not exist', success: false });
      }

      const { year, month, day } = req.query;
      const date = new Date(year, month, day);
      const nextDate = new Date(year, month, parseInt(day) + 1);

      Appointment.find(
        { 'user._id': req.params.id, date: { $gte: date, $lt: nextDate } },
        function (err, appointments) {
          return res.json(appointments);
        },
      );
    });
  } catch (error) {
    return res.status(400).json({ message: error, success: false });
  }
}

function create(req, res) {
  try {
    User.findById(req.body.user_id, function (err, user) {
      User.findById(req.body.provider_id, function(err, provider) {
        const appointment = new Appointment({
          date: req.body.date,
          provider,
          user,
        });

        appointment.save(err => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          return res.json(appointment);
        });
      })
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error, success: false });
  }
}

function update(req, res) {
  try {
    console.log(req.params);
    Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, { _doc }) {
        if (err) {
          return response.status(500).json({ message: err, success: false });
        }

        const modifiedValues = req.body;

        return res.json({
          ..._doc,
          ...modifiedValues,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, success: false });
  }
}

function deleteAppointment(req, res) {
  try {
    Appointment.findByIdAndDelete(req.params.id, function (err) {
      if (err) {
        return res.status(500).json({ message: err, success: false });
      }

      return res.json({
        message: `Appointment ${req.params.id} successfully deleted`,
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
}

module.exports = {
  list,
  listOne,
  listByUser,
  create,
  update,
  deleteAppointment,
};
