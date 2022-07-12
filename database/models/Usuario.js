const mongoose = require('../index')
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    senha: { 
        type: String, 
        required: true,
        select: false
    },
    aluno: {
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
    },
    createdAt: { type: Date, default: Date.now }
})

usuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
})
const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = Usuario