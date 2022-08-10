const mongoose = require('../index')
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true,
        select: false
    },
    userLevel: { 
        type: String,
        default: 'ingressante'
    },
    aluno: {
        anoTurma: Number,
        anoEntrada: Number,
        turma: String
    },
    ingressante: {
        xp: Number,
        missao: [{
            titulo: String,
            capa: Buffer,
            valorXp: Number,
            conteudo: String,
            concluido: {
                type: Boolean,
                default: false
            }
        }]
    },
    admin: {
        cpf: {
            type: String,
            select: false
        }
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