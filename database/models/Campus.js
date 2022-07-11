const mongoose = require('mongoose')

const campusModel = new mongoose.Schema({
    nome: String,
    sigla: String,
    endereco: {
        rua: String,
        número: String,
        bairro: String,
        cep: String
    },
    cursos: [{
        nome: String,
        resumo: String,
        materias: [{
            nome: String,
            descricao: String
        }],
        depoimentos: [{
            autor: String,
            depoimento: String,
            data: Date
        }]
    }],
    docentes: [{
        nome: String,
        formacao: [{
            titulo: String,
            local: String
        }],
        email: String
    }]
})

module.exports = campusModel