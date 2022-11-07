import express from 'express';
import User from '../database/models/User.js'
import Level from '../database/models/Level.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const secret = process.env.SECRET
const router = express.Router();

function getUserTasks(tasks, completed) {
	return tasks.map((task, i) => {
		if (!!completed.find(t => t == task.id)) {
			return Object.assign({}, task, { completed: true })
		} else {
			return Object.assign({}, task, { completed: false })
		}
	})
}

router.post('/level', async (req, res) => { // colocar o middleware verify token
    const { id, token, level } = req.body
    try {
        if(!id || !token || !level) throw new Error("parametros incorretos")
        if(id === jwt.verify(token, secret).id) {
            const {tasks} = await Level.findOne({level})
            const user = await User.findOne({id})
            const gamification = user.gamification.filter(levels => levels.level == level)
            const userTasks = JSON.parse(JSON.stringify(tasks))

            return res.status(200).json({
                status: 200,
                message: "Ok",
                result: getUserTasks(userTasks, gamification[0].completedTasks)
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Ocorreu um erro ao validar a sessão",
                result: "error"
            })
        }
    } catch (e) {
        res.status(400).json({error: true, e:e.message})
    }
})

router.post('/insertlevel', async (req, res) => { // colocar o middleware verify token
    try {
        const { json } = req.body
        // if(!id || !token || !level) return res.status(400).json({error: true}) // ativar depois
        const result = await Level.create(json)
        res.status(200).json({
            status: 200,
            message: "Ok",
            result
        })
    } catch (e) {
        res.status(400).json({error: true, e})
    }
})

export { router as userController }