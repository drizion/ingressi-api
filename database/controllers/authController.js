const express = require('express');

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
        return res.status(400).json({error: 'erro ao registrar'});
    }
})

router.post('/login', async (req,res) => {
    const { email, username } = req.body;
    try {
        if(!username)
            return res.status(400).json({ error: "Username is required" });
        const usuario = await Usuario.findOne({ email });
        if(!usuario)
            return res.status(400).json({ error: "User is not registered" })
        return res.status(200).json({usuario});
    } catch(err) {
        return res.status(400).json({error: 'erro ao fazer login'});
    }
})

module.exports = app => app.use('/auth', router);