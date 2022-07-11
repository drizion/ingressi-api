const mongoose = require('mongoose');

const usuarioModel = require('./models/Usuario')
const campusModel = require('./models/Campus')
const postModel = require('./models/Post')

const Usuario = mongoose.model('Usuario', usuarioModel)
const Campus = mongoose.model('Campus', campusModel)
const Post = mongoose.model('Post', postModel)

const url = 'mongodb://127.0.0.1:27017/ingressi';
const db = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

console.log('connecting mongodb...')
db.then(() => {
    console.log('mongodb connected!')
})

module.exports = db