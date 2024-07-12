const mongoose = require('mongoose');

const completedGameSchema = new mongoose.Schema({
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
        }
    ], 
    completed: {
        type: Boolean,
    }

})

const CompletedGame = mongoose.model('completedGame', completedGameSchema);

module.exports = CompletedGame;