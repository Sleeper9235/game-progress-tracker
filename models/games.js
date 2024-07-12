const mongoose = require('mongoose')
const { format } = require('morgan')

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
    gameLink: {
        type: String, 
    },
    completedByUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const Game = mongoose.model('Game', gameSchema)

module.exports = Game