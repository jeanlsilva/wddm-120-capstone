const { User } = require('../models/user');
const { hash } = require('bcryptjs');

function list(req, res) {
    try {
        User.find({}, function(err, user) {
            return res.json(user)
        })
    } catch (err) {
        return res.json(err)
    }    
}

function create(req, res) {
    try {
        const { name, email, password, avatar, is_provider } = req.body;
        User.findOne({ email }, async function(err, userExists) {
            if (userExists) {
                //throw new Error('Email address already used')
                return res.json({ error: 'Email address already used '});
            }

            const hashedPassword = await hash(password, 8);
            console.log(hashedPassword)
            const user = new User({
                name,
                email,
                password: hashedPassword,
                avatar,
                isProvider: is_provider
            });
            user.save((err) => {
                if (err) {
                    return res.json(err)
                }
                return res.json(user)
            })
        })      
    } catch (err) {
        console.log(err)
        return res.json(err)
    }
}

module.exports = {
    list,
    create
}