const express = require('express');
const app = express()

const register = require('./routes/register')
const authenticate = require('./routes/authenticate')
const validate = require('./routes/validate')

app.use('/', register, authenticate, validate)

app.get('/', (req,res) => {
    res.status(200).json({msg: 'ok'})
})

const port = 3456
app.listen(port, () => {
    console.log('server started at port '+ port)
})