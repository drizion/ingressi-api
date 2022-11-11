import express from 'express';
import Post from '../database/models/Post.js';

const router = express.Router();

router.post('/createpost', async (req, res) => {
    try {
        const post = await Post.create(req.body)
        return res.status(200).json({
            status: 200,
            message: "Post criado com sucesso.",
            result: post
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: 200,
            message: "Erro ao criar post, verifique os logs do sistema.",
            result: e
        })
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
		res.status(400).json({ error: true, e })
	}
})

export { router as adminController }