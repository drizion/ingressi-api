import mongoose from '../connect.js'
import bcrypt from 'bcryptjs'

// aluno ainda não está pronto
const userSchema = new mongoose.Schema({
    name: { 
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
    user: { 
        type: String,
        default: 'ingressante'
    },
    aluno: {
        anoTurma: Number,
        anoEntrada: Number,
        turma: String
    },
    ingressante: {
        level: {
            type: Number,
            default: 1
        },
        mission: [{
            id: Number,
            completed: Boolean
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

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})
const User = mongoose.model("User", userSchema)

export default User