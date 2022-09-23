import User from '../database/models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken, verifyToken } from '../middlewares/token.js'

export default async function checkPassword(req, res, next){
    try {
        const { email, token, password } = req.body;
        if (!password && !token) {
            res.status(400).json({
                status: 400,
                message: "A senha não foi inserida.",
                result: "error"
            })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({
            status: 400,
            message: "O email não está cadastrado.",
            result: "error"
        });
        if (password && !await bcrypt.compare(password, user.password)) return res.status(400).json({
            status: 400,
            message: "Senha incorreta.",
            result: "error"
        })
        user.password = undefined
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 400,
            message: "Algo deu errado, verifique os logs do sistema.",
            result: "error"
        })
    }
}