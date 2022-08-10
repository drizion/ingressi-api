const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.post('/getData', verifyToken, async (req, res) => {
    try {
        if(req.body.id !== req.tokenResult.id) throw new Error('not authorized')
        const user = await Usuario.findOne({_id: req.tokenResult.id})

        if(user.userLevel !== 'ingressante'){
            user.ingressante = undefined
        }
        return res.json(user)
    } catch (err) {
        res.json({error: err.message})
    }
})

router.post('/getUsers', async (req, res) => {
    try {
        if(req.body.apikey !== 'adminapikey') throw new Error('incorrect admin apikey')
        const users = await Usuario.find().select(['nome', 'email', 'username', 'password'])
        res.json(users)
    } catch (err) {
        res.json({error: err.message})
    }
})


module.exports = app => app.use('/user', router);