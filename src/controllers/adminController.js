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

export { router as adminController }