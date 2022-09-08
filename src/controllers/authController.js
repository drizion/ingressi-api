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

router.post('/checkemail', async(req,res) => {
    const { email } = req.body
    try {
        if(!email) return res.status(400).json({
            error: true,
            message: "Email is required",
            errorCode: 1008
        })
        if (email && await Usuario.findOne({ email })) {
            res.status(400).json({ 
                error: true,
                message: "Email is already registered",
                errorCode: 1000
            })
        } else {
            res.status(200).json({
                message: "Email is valid"
            })
        }
    } catch (e) {
        res.status(400).json({
            error: true,
            message: 'Something went wrong',
            errorCode: 1016
        })
    }
})

router.post('/checkusername', async(req,res) => {
    const { username } = req.body
    try {
        if(!username) return res.status(400).json({
            error: true,
            message: "Username is required",
            errorCode: 1017
        })
        if (email && await Usuario.findOne({ username })) {
            res.status(400).json({ 
                error: true,
                message: "Username is already registered",
                errorCode: 1001
            })
        } else {
            res.status(200).json({
                message: "Username is valid"
            })
        }
    } catch (e) {
        res.status(400).json({
            error: true,
            message: 'Something went wrong',
            errorCode: 1016
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const { email, username } = req.body;
        if (await Usuario.findOne({ email })) return res.status(400).json({ 
            error: true, 
            message: "Email is already registered", 
            errorCode:1000 
        });
        if (await Usuario.findOne({ username })) return res.status(400).json({ 
            error: true, 
            message: "Username is already registered", 
            errorCode: 1001 
        });
        const user = await Usuario.create(req.body);
        // create user and generate jwt
        return res.status(200).json({
            id: user._id,
            name: user.nome,
            username: user.username,
            userLevel: user.userLevel,
            token: generateToken({ id: user._id })
        })
    } catch (err) {
        return res.status(400).json({ 
            error: true,
            message: 'Error on register',
            errorCode: 1012
        });
    }
})

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) return res.status(400).json({ 
            error: true,
            message: "Password is required",
            errorCode: 1015
        })
        const user = await Usuario.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ 
            error: true,
            message: "User not found",
            errorCode: 1013
        });
        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ 
            error: true,
            message: "Invalid password",
            errorCode: 1002
        })
        user.password = undefined
        return res.status(200).json({
            id: user._id,
            name: user.nome,
            username: user.username,
            userLevel: user.userLevel,
            token: generateToken({ id: user._id })
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ 
            error: true,
            message: 'Error on login',
            errorCode: 1014
        });
    }
})

router.post('/deleteAccount', async (req, res) => {
    const { username, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" })
    try {
        const user = await Usuario.findOne({ username }).select('+password');
        if (!user) return res.status(400).json({ error: "User not found" });
        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: "Invalid password" })
        user.password = undefined
            const deleteUser = await Usuario.deleteOne({ username })
            if(deleteUser.deletedCount == 1){
                return res.status(200).json({ message: 'User deleted succesfuly' });
            } else {
                res.json({ error: 'Error on delete user'})
            }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on delete user' });
    }
})

router.post('/resetPassword', async (req, res) => {
    const { id, newPassword } = req.body
    try {
        const user = await Usuario.findOne({ id })
        if (!user) return res.status(400).json({ error: "User not found" });
        const setPassword = await bcrypt.hash(newPassword, 10)
        Usuario.updateOne({ _id: id }, { password: setPassword }).then((result) => {
            res.json({ status: true, message: "password updated!"})
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on change password' });
    }
})

module.exports = app => app.use('/auth', router);