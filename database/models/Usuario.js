const mongoose = require('../index')
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true,
        select: false
    },
    estudante: {
        anoTurma: Number,
        anoEntrada: Number,
        turma: String
    },
    ingressante: {
        xp: Number,
        missao: {
          pendente: [{
              missaoId: String
          }],
          concluida: [{
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
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})
const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = Usuario