import User from '../database/models/User.js'

export default async function checkUsername(req, res, next){
    console.log('middleware checkusername')
    const { username } = req.body
    try {
        if(!username) return res.status(400).json({
            status: 400,
            message: "Nome de usuário não foi inserido.",
            result: "error"
        })
        if (await User.findOne({ username })) {
            res.status(400).json({
                status: 400,
                message: "O nome de usuário já está em uso.",
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