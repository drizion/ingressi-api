const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

require('./database/controllers/authController')(app)

app.get('/', (req,res) => {
    res.status(200).json({msg: 'ok'})
})

const port = 6487
app.listen(port, () => {
    console.log('server started at port '+ port)
})