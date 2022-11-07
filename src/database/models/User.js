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
    picture: { 
        data: Buffer,
        mimetype: String 
    },
    gamification: [{
        level: {
            type: Number
        },
        completedTasks: []
    }],
    createdAt: { type: Date, default: Date.now }
})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})
const User = mongoose.model("User", userSchema)

export default User