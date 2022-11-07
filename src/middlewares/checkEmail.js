import * as EmailValidator from 'email-validator'
import User from '../database/models/User.js'

export default async function checkEmail(req, res, next){
    const { email } = req.body
    console.log(req.body)
    console.log('middleware-checkemail');
    try {
        if(!email) return res.status(400).json({
            status: 400,
            message: "Email não foi preenchido.",
            result: "error"
        })
        if(!EmailValidator.validate(email)) return res.status(400).json({
            status: 400,
            message: "Email inválido.",
            result: "error"
        })
        if (await User.findOne({ email })) {
            res.status(400).json({
                status: 400,
                message: "O email já está registrado.",
                result: "error"
            })
        } else {
            next()
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