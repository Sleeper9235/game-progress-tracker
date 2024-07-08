const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    genre: {
        type: String,
        required: true, 
    }, 
    image: {
        type: String,
        required: true,
    }, 
    releasedDate: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String,
    }, 
    hyperlink: {
        type: String, 
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game