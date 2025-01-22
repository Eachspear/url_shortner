const jwt = require("jsonwebtoken");
const secret = "Niggaman@123";

function setUser(user) {
    return jwt.sign({
        email: user.email,
        _id: user._id,
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
