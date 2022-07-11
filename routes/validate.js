const express = require('express');
const validate = express.Router();

validate.post('/validate', async (req,res) => {
    res.status(200).json({msg: 'validating...'})
})

module.exports = validate;