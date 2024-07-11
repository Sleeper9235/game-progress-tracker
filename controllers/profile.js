const express = require('express');
const router = express.Router();

const Profile = require('../models/profile.js')
const Games = require('../models/games.js')
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id });
        const myProfile = await Profile.findOne({ _id: userInDatabase.profile });
        const myGames = await Games.find({ _id: myProfile.games });
        if (!userInDatabase.profile) {
            res.redirect('/profile/new')
        } else {
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

router.post('/checkbox', async (req, res) => {
    try {
        const userInDatabase = await User.findOne(
            { _id: req.session.user._id }
        );
        const myProfile = await Profile.findOne(
            { _id: userInDatabase.profile }
        );
        console.log(myProfile)
        const profileGameList = myProfile.games
        const myGames = await Games.find(
            { _id: myProfile.games }
        );
        console.log(myGames)
        console.log(profileGameList)
        console.log(req.body)

        if (req.body.gameCompleted) {
            profileGameList.gameCompleted = true
        } else {
            profileGameList.gameCompleted = false
        }
    res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router;
