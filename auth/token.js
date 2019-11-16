const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "shh don't tell anyone";

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        helper: user.helper,
        student: user.student
    };

    const options = {
        expiresIn: '24h'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = {
    secret,
    generateToken
}