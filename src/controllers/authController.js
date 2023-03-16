require('dotenv').config()
const { sendRes } = require('../utils/sendRes');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// user log in 
const logIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.find({ username: username });
    if (!user || !user.length || (password && !bcrypt.compareSync(password, user.password))) {
        return sendRes(res, 401, 'Invalid credentials', 'Error');
    }  
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);   
    return sendRes(res, 200, { accessToken, refreshToken }); 
}

// user sign up 
const signUp = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || typeof username !== 'string' || 
        !password || typeof password !== 'string') 
    {
        return sendRes(res, 401, 'Invalid credentials', 'Error');
    }
    const userTaken = await User.find({username: username});
    if (userTaken && userTaken.length){
        return sendRes(res, 409, 'Username is already taken', 'Error');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username: username, password: hashedPassword };
        const savedUser = await User.create(user);

        const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
        return sendRes(res, 200, { user: savedUser, accessToken, refreshToken }); 
    } catch (err) {
        console.log(err);
        return sendRes(res, 500, err, 'Error');
    }
}

// refresh user access token 
const refreshToken =  (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return sendRes(res, 401, 'Invalid token', 'Error');
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const accessToken = jwt.sign({ sub: decoded.sub }, process.env.REFRESH_JWT_SECRET, { expiresIn: '15m' });
        return sendRes(res, 200, { accessToken }); 
    } catch (error) {
        return sendRes(res, 401, 'Invalid token', 'Error');
    }
}

module.exports = { logIn, signUp, refreshToken };