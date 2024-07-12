const express = require('express');
const router = express.Router();

const Profile = require('../models/profile.js')
const Games = require('../models/games.js')
const User = require('../models/user.js')
const CompletedGames = require('../models/completedGames.js')


router.get('/', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id });
        
        if (!userInDatabase.profile) {
            res.redirect('/profile/new')
        } else {
            const myProfile = await Profile.findOne({ _id: userInDatabase.profile });
            const myGames = await Games.find({ _id: myProfile.games });
            res.render('profile/index.ejs', {
                user: userInDatabase,
                games: myGames,
                profile: myProfile,
            })
        }
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    try {
        const games = await Games.find({})
        res.render('profile/new.ejs', {
            games: games,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/new', async(req, res) => {
    try {
        const myProfile = await Profile.create(req.body)
        myProfile.profileCreated = true
        await myProfile.save();

        const userInformation = await User.findOneAndUpdate(
            {_id: req.session.user._id}, 
            {profile: myProfile._id}, 
        )
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.put('/checkbox', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id });
        const myProfile = await Profile.findOne({ _id: userInDatabase.profile });
        myProfile.games.forEach((game) => {

            if (game._id == (req.body.gameCompleted)) {
                gameIsCompleted = true
            } else {
                return
            }
        })

        await myProfile.save()
        console.log(myProfile)

        res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router;
