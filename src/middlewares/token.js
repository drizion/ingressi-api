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
        const { token, id } = req.body
        if(!id || !token) return next()

        if(id === jwt.verify(token, secret).id) {
            console.log('token verificado')
            req.ignorePassword = true
            return next()
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