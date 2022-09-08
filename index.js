const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

require('./src/controllers/authController')(app)
require('./src/controllers/userController')(app)

app.get('/', (req,res) => {
    res.status(200).json({msg: 'ok'})
})

const port = 1313
app.listen(port, () => {
    console.log('server started at port '+ port)
})