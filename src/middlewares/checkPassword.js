import User from '../database/models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken, verifyToken } from '../middlewares/token.js'

export default async function checkPassword(req, res, next){
    try {
        const { email, id, token, password } = req.body;
        if (!password && !token) {
            return res.status(400).json({
                status: 400,
                message: "A senha não foi inserida.",
                result: "error"
            })
        }
        if(req.ignorePassword) {
            req.user = await User.findOne({ id })
            return next()
        } else {
            const user = await User.findOne({ email }).select('+password');
            if (!user && email) return res.status(400).json({
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
            if(user && password && email) return next()
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: 400,
            message: "Algo deu errado, verifique os logs do sistema.",
            result: "error"
        })
    }
}