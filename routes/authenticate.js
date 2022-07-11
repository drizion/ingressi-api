const express = require('express');
const authenticate = express.Router();

authenticate.post('/authenticate', async (req,res) => {
    res.status(200).json({msg: 'authenticating...'})
})

module.exports = authenticate;