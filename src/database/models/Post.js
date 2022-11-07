import mongoose from '../connect.js'

const postSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    description: { 
        type: String,
        required: true 
    },
    badge: { 
        type: String,
        required: true 
    },
    author: { 
        type: String,
        required: true 
    },
    thumbnail: { 
        type: String,
        required: true 
    },
    image: { 
        type: String,
        required: true 
    },
    links: [{
        text: String,
        url: String
    }],
    featured: { 
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model("Post", postSchema)

export default Post