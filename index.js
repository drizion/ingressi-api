import express from 'express';
import { router as authController } from './src/controllers/authController.js';
import { adminController } from './src/controllers/adminController.js'
import { appController } from './src/controllers/appController.js'
import { userController } from './src/controllers/userController.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/auth', authController)
app.use('/admin', adminController)
app.use('/app', appController)
app.use('/user', userController)

app.get('/', (req,res) => {
    res.status(200).json({msg: 'ok'})
})


app.listen(1313, () => {
    console.log('server started at port '+ 1313)
})