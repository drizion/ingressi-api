import express from 'express';
import User from '../database/models/User.js'
import Level from '../database/models/Level.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../middlewares/token.js';

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

router.post('/level', verifyToken, async (req, res) => { // colocar o middleware verify token
	const { id, token, level } = req.body
	try {
		if (!id || !token) throw new Error("parametros incorretos")
		if (id === jwt.verify(token, secret).id) {
			const user = await User.findOne({ id })
			const userLevel = level ? level : Math.max(...user?.gamification?.map(o => o.level))
			const gamification = user.gamification.filter(levels => levels.level == userLevel)

			const appLevel = await Level.findOne({ level: userLevel })

			if (appLevel) {
				const userTasks = JSON.parse(JSON.stringify(appLevel.tasks))
				return res.status(200).json({
					status: 200,
					message: "Ok",
					result: {
						mission: {
							number: userLevel,
							title: appLevel.title,
							description: appLevel.description,
							max: Math.max(...user?.gamification?.map(o => o.level))
						},
						tasks: getUserTasks(userTasks, gamification[0].completedTasks)
					}
				})
			} else {
				return res.status(400).json({
					status: 400,
					message: "O level não existe",
					result: 'error'
				})
			}

		} else {
			return res.status(400).json({
				status: 400,
				message: "Ocorreu um erro ao validar a sessão",
				result: "error"
			})
		}
	} catch (e) {
		res.status(400).json({ error: true, e: e.message })
	}
})

router.post('/task/toggle', verifyToken, async (req, res) => {
	const {taskId, level: levelId } = req.body
	const {userId: id} = req;
	console.log(req.body)
	try {
		let {gamification} = await User.findOne({id}).select('gamification')
		console.log(gamification)
		gamification = [...gamification].map(level => {
			if(level.level == levelId){
				const task = level.completedTasks.findIndex(task => task == taskId)
				if(task == -1){
					level.completedTasks.push(taskId);
				}else{
					level.completedTasks.splice(task, 1);
				}
			}
			return level
		})
		const user = await User.findOneAndUpdate({id}, {gamification}, {
			new: true
		}).select('gamification');
		console.log('tarefa alterada', user.gamification)
		return res.status(200).json(user)
	} catch (e) {
		console.log(e)
		console.log(e.message)
		return res.json(e)
	}
})


export { router as userController }