const express = require('express');
const register = express.Router();

register.post('/register', async (req,res) => {
    res.status(200).json({msg: 'registering...'})
})

module.exports = register;