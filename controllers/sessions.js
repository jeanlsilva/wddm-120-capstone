const { User } = require('../models/user');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');

function login(req, res) {
    const { email, password } = req.body;
    try {
        User.findOne({ email }, async function(err, user) {
            if (!user) {
                return res.status(400).json({ error: 'Incorrect email/password combination' });
            }

            const passwordMatched = await compare(password, user.password);

            if (!passwordMatched) {
                return res.status(400).json({ error: 'Incorrect email/password combination' });
            }

            const { secret, expiresIn } = authConfig.jwt;

            const token = sign({}, secret, {
                subject: user._id.toString(),
                expiresIn
            });

            return res.json({ user, token });
        })
    } catch(err) {
        console.log(err);
        return res.json({ error: err });
    }
}

module.exports = {
    login
}