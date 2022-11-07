import mongoose from '../connect.js'

const levelSchema = new mongoose.Schema({
    level: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
})

const Level = mongoose.model("Level", levelSchema)

export default Level