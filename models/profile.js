const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    region: {
        type: String,
    },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            gameIsCompleted: Boolean,
        }
    ], 
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile 