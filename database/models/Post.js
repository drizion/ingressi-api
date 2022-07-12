const mongoose = require('../index')

const postSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    autor: String,
    data: { type: Date, default: Date.now },
    ultimaEdicao: { type: Date, default: Date.now },
    mostrarPara: [String]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post