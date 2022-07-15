const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth');

const Usuario = require('../models/Usuario');
const router = express.Router();

const generateToken = (params = {}) => {
    const token = jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
    return token
}

router.post('/register', async (req, res) => {
    const { email, username } = req.body;
    try {
        if (await Usuario.findOne({ email }))
            return res.status(400).json({ error: "Email is already registered" });
        if (await Usuario.findOne({ username }))
            return res.status(400).json({ error: "Username is already registered" });
        const user = await Usuario.create(req.body);
        return res.status(200).json({ user, token: generateToken({ id: user._id }) });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on register' });
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" })
    try {
        const user = await Usuario.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).json({ error: "User not found" });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: "Invalid password" })
        user.password = undefined

        return res.status(200).json({
            user,
            token: generateToken({ id: user._id })
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on login' });
    }
})

module.exports = app => app.use('/auth', router);