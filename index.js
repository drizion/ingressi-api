import express from 'express';
import { router as authController } from './src/controllers/authController.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/auth', authController)

app.get('/', (req,res) => {
    res.status(200).json({msg: 'ok'})
})


app.listen(1313, () => {
    console.log('server started at port '+ 1313)
})