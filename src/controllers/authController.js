import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../database/models/User.js';
import checkEmail from '../middlewares/checkEmail.js';
import checkUsername from '../middlewares/checkUsername.js';
import checkPassword from '../middlewares/checkPassword.js';
import { generateToken, verifyToken } from '../middlewares/token.js';

const router = express.Router();

router.post('/register', checkEmail, checkUsername, async (req, res) => {
    try {
        const user = await User.create(req.body); // create user with encrypted password
        return res.status(200).json({
            status: 200,
            message: "Registrado com sucesso.",
            result: {
                id: user._id,
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


router.post('/authenticate', checkPassword, verifyToken, async (req, res) => {
    try {
        const { user } = req
        const idL = 1 // id do level (estou no level 1)
        const maxL = 6 // numero maximo de leveis (estou no level 1 de 6)
        const idM = 1 // id da missão (estou na missão 1 do level 1)
        const maxM = 4 // numero maximo de missões (estou na missão 1 de 4 do level 1)
        return res.status(200).json({
            status: 200,
            message: "Ok",
            result: {
                name: user.name,
                picture: "https://avatars.githubusercontent.com/u/84392895?s=100&v=4",
                level: user.ingressante.level,
                percent: parseInt(user.ingressante.level*100/maxL),
                mission: {
                    id: idM,
                    max: maxM,
                    percent: parseInt(idM*100/maxM),
                    title: "Decisão de curso",
                    thumbnail: "https://avatars.githubusercontent.com/u/84392895?s=500&v=4"
                },
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