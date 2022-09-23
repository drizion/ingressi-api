import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const secret = process.env.SECRET

export const generateToken = (params = {}) => {
    const token = jwt.sign(params, secret, {
        expiresIn: '7d'
    })
    return token
}

export const verifyToken = (req, res, next) => {
    try {
        const { token, password } = req.body
        if(password && !token) return next()
        if(!token) return res.status(400).json({
            status: 400,
            message: "Não foi possível validar a sessão",
            result: "error"
        })
        console.log(token)
        console.log(secret)
        if(req.user.id === jwt.verify(token, secret).id) {
            next()
        } else {
            res.status(400).json({
                status: 400,
                message: "Ocorreu um erro ao validar a sessão",
                result: "error"
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 400,
            message: "Algo deu errado, verifique os logs do sistema.",
            result: "error"
        })
    }
}