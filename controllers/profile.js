const express = require('express');
const router = express.Router();

const Profile = require('../models/profile.js')
const Games = require('../models/games.js')
const User = require('../models/user.js')


router.get('/', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        if (!userInDatabase.profile) {
            res.redirect('/profile/new')
        } else {
            const myGames = await Games.find({ _id: userInDatabase.profile.games })
            res.render('profile/index.ejs', {
                user: userInDatabase,
                games: myGames,
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
        await Games.findByIdAndUpdate(req.body.gameCompleted, { 
            $push: { completedByUsers: req.session.user._id },
        });

        res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.delete('/checkbox', async (req, res) => {
    try {
        console.log(req.body)
        await Games.findByIdAndUpdate(req.body.gameCompleted, { 
            $pull: { completedByUsers: req.session.user._id },
        });

        res.redirect('/profile')
    } catch (err) { 
        console.log(err) 
        res.redirect('/')
    }
})
module.exports = router;
