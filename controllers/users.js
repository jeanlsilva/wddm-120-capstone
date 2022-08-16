const { User } = require('../models/user');
const Appointment = require('../models/appointment');
const { hash } = require('bcryptjs');

function list(req, res) {
  try {
    User.find({}, function (err, user) {
      return res.json(user);
    });
  } catch (error) {
    return res.json({ message: error, success: false });
  }
}

function listOne(req, res) {
  try {
    User.findById(req.params.id, function (err, user) {
      return res.json(user);
    });
  } catch (err) {
    return res.json({ message: error, success: false });
  }
}

function listProviders(req, res) {
  try {
    User.find({ isProvider: true }, function (err, users) {
      return res.json(users);
    });
  } catch (err) {
    return res.status(500).json({ message: error, success: false });
  }
}

function create(req, res) {
  try {
    const { name, email, password, avatar_url, is_provider } = req.body;
    User.findOne({ email }, async function (err, userExists) {
      if (userExists) {
        return res.json({ error: 'Email address already used ' });
      }

      const hashedPassword = await hash(password, 8);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        avatar_url,
        isProvider: is_provider,
      });
      user.save(err => {
        if (err) {
          return res.json({ message: err, success: false });
        }
        return res.json(user);
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: err, success: false });
  }
}

async function update(req, res) {
  try {
    let modifiedValues = req.body;

    if (modifiedValues.password) {
      const hashedPassword = await hash(modifiedValues.password, 8);
      modifiedValues = { ...modifiedValues, password: hashedPassword }
    }
    User.findByIdAndUpdate(req.params.id, modifiedValues, function (err, { _doc }) {
      if (err) {
        return res.status(500).json({ message: err, success: false });
      }

      return res.json({
        ..._doc,
        ...modifiedValues,
      });
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error, success: false });
  }
}

function deleteUser(req, res) {
  try {
    Appointment.find(
      { 'user._id': req.params.id },
      function (err, appointments) {
        if (appointments.length > 0) {
          Appointment.deleteMany({ 'user._id': req.params.id }, function (err) {
            User.findByIdAndDelete(req.params.id, function (err) {
              if (err) {
                return res.status(500).json({ message: err, success: false });
              }

              res.json({
                message: `User ${req.params.id} successfully deleted`,
              });
            });
          });
        } else {
          User.findByIdAndDelete(req.params.id, function (err) {
            if (err) {
              return res.status(500).json({ message: err, success: false });
            }

            res.json({
              message: `User ${req.params.id} successfully deleted`,
              success: true,
            });
          });
        }
      },
    );
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
}

module.exports = {
  list,
  listOne,
  listProviders,
  create,
  update,
  deleteUser,
};
