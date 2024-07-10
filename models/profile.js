const mongoose = require('mongoose')
const { format } = require('morgan')

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
    },

    lastName: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    }, 
    profileCreated: {
        type: Boolean
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