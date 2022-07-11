const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    autor: String,
    data: Date,
    ultimaEdicao: Date,
    mostrarPara: [String]
})

module.exports = postModel