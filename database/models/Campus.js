const mongoose = require('../index')

const campusSchema = new mongoose.Schema({
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
            data: { type: Date, default: Date.now }
        }]
    }],
    docentes: [{
        nome: String,
        formacao: [{
            titulo: String,
            local: String
        }],
        email: String
    }],
    createdAt: { type: Date, default: Date.now }
})

const Campus = mongoose.model("Campus", campusSchema)

module.exports = Campus