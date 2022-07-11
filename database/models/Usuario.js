const mongoose = require('mongoose')

const usuarioModel = new mongoose.Schema({
    nome: String,
    email: String,
    username: String,
    senha: String,
    aluno: {
        matricula: String,
        anoIng: Number,
        ano: Number,
        turma: String
    },
    ingressante: {
        xp: Number,
        missoes: {
          pendentes: [{
              missaoId: String
          }],
          concluidas: [{
              missaoId: String
          }]
        }
    },
    admin: {
        cpf: String
    }
})

module.exports = usuarioModel