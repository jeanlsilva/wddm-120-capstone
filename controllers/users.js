const User = require('../models/user');

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
        console.log(req.body);
        const user = new User(req.body);
        user.save((err) => {
            if (err) {
                return res.json(err)
            }
            return res.json(user)
        })        
    } catch (err) {
        return res.json(err)
    }
}

module.exports = {
    list,
    create
}