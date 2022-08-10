const mongoose = require('../index')

const postSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    capa: Buffer,
    autor: String,
    mostrarPara: [String],
    ultimaEdicao: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post