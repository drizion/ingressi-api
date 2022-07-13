const express = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/register', async (req,res) => {
    const { email, username } = req.body;
    try {
        if(await Usuario.findOne({ email }))
            return res.status(400).json({ error: "Email is already registered" });
        if(await Usuario.findOne({ username }))
            return res.status(400).json({ error: "Username is already registered" });
        const usuario = await Usuario.create(req.body);
        return res.status(200).json({usuario});
    } catch(err) {
        console.log(err)
        return res.status(400).json({error: 'erro ao registrar'});
    }
})

router.post('/authenticate', async (req,res) => {
    const { email, password } = req.body;
    if(!password) return res.status(400).json({ error: "Password is required"})
    // try {
        const user = await Usuario.findOne({ email }).select('+password');
        if(!user) 
            return res.status(400).json({ error: "user not found" });
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: "Invalid password" })
        user.password = undefined
        return res.status(200).json({ user })
         
    // } catch(err) {
    //     return res.status(400).json({error: 'erro ao fazer login'});
    // }
})

module.exports = app => app.use('/auth', router);