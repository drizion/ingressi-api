import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../database/models/User.js';
import checkEmail from '../middlewares/checkEmail.js';
import checkUsername from '../middlewares/checkUsername.js';
import checkPassword from '../middlewares/checkPassword.js';
import { generateToken, verifyToken } from '../middlewares/token.js';
import * as fs from 'fs'
import path from 'path';
import multer from 'multer';

const upload = multer({dest: 'uploads/'})
const router = express.Router();

router.post('/register', upload.single('photo'), checkEmail, checkUsername, async (req, res) => {
    try {
        var picture = {}
        console.log(req.body)
        if(req.file) {
            picture = {
                data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                mimetype: req.file.mimetype
            }
        }
        const user = await User.create({
            ...req.body,
            picture,
            gamification: [{
                level: 1,
                completedTasks: []
            }]
            
        }); // create user with encrypted password
        console.log(user)
        return res.status(200).json({
            status: 200,
            message: "Registrado com sucesso.",
            result: {
                id: user.id,
                name: user.name,
                picture: "http://178.255.219.100:1313/app/profilepicture/" + user.id,
                gamification: user.gamification,
                token: generateToken({ id: user._id })
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: 200,
            message: "Erro ao registrar, verifique os logs do sistema.",
            result: e
        })
    }
})

router.post('/profilepicture', upload.single('photo'), async (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).json({status:true})
    // const {id} = req.file
    // try {
    //     const user = await User.findOne({id})
    //     const image = user.
    //     res.writeHead(200, {'Content-Type': 'image/png'})
    //     return res.end()
    // } catch (e) {
        
    // }
})

router.post('/authenticate', verifyToken, checkPassword, async (req, res) => {
    try {
        const { user } = req
        return res.status(200).json({
            status: 200,
            message: "Ok",
            result: {
                id: user.id,
                name: user.name,
                picture: "http://178.255.219.100:1313/app/profilepicture/" + user.id,
                gamification: user.gamification,
                token: generateToken({ id: user._id })
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            status: 400,
            message: "Erro ao fazer login.",
            result: "error"
        });
    }
})

/*
router.post('/deleteAccount', async (req, res) => {
    const { username, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" })
    try {
        const user = await User.findOne({ username }).select('+password');
        if (!user) return res.status(400).json({ error: "User not found" });
        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: "Invalid password" })
        user.password = undefined
            const deleteUser = await User.deleteOne({ username })
            if(deleteUser.deletedCount == 1){
                return res.status(200).json({ message: 'User deleted succesfuly' });
            } else {
                res.json({ error: 'Error on delete user'})
            }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on delete user' });
    }
})

router.post('/resetPassword', async (req, res) => {
    const { id, newPassword } = req.body
    try {
        const user = await User.findOne({ id })
        if (!user) return res.status(400).json({ error: "User not found" });
        const setPassword = await bcrypt.hash(newPassword, 10)
        User.updateOne({ _id: id }, { password: setPassword }).then((result) => {
            res.json({ status: true, message: "password updated!"})
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Error on change password' });
    }
})

*/

export { router }