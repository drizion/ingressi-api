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
        const { token } = req.body ? req.body : req.query
        if(!token) return next()
        jwt.verify(token, secret, function(err, decoded) {
            if (err) return res.status(400).json({
                status: 400,
                message: "Ocorreu um erro ao validar a sessão",
                result: "error"
            })
            console.log('token verificado')
            req.ignorePassword = true
            req.userId = decoded.id;
            return next()
        });
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 400,
            message: "Algo deu errado, verifique os logs do sistema.",
            result: "error"
        })
    }
}