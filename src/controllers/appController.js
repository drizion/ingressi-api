import express from 'express';
import Post from '../database/models/Post.js';
import User from '../database/models/User.js';

const router = express.Router();

router.get('/profilepicture/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.writeHead(200,{
            'Content-Type': user.picture.mimetype
        })
        res.end(user.picture.data)
    } catch (e) {
        res.json({error:e})
    }
})

router.get('/getposts', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.status(200).json({
            status: 200,
            message: "Lista de posts",
            result: posts
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: 200,
            message: "Erro ao listar posts, verifique os logs do sistema.",
            result: e
        })
    }
})

export { router as appController }