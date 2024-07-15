const express = require('express');
const router = express.Router();

const Profile = require('../models/profile.js')
const Games = require('../models/games.js')
const User = require('../models/user.js');


router.get('/new', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const games = await Games.find({})
        res.render('profiles/new.ejs', {
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
        
        res.redirect('/profiles/myProfile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.get('/', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const allUsers = await User.find({})
        res.render('profiles/index.ejs', {
            mainUser: userInDatabase,
            allUsers: allUsers,
            }
        )
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.get('/myProfile', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        if (!userInDatabase.profile) {
            res.redirect('/profiles/new')
        } else {
            const myGames = await Games.find({ _id: userInDatabase.profile.games })
            res.render('profiles/user-profile.ejs', {
                user: userInDatabase,
                games: myGames,
            })
        }
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:profileId', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const currentProfile = await User.findOne({ _id: req.params.profileId}).populate('profile')
        const currentGames = await Games.find({ _id: currentProfile.profile.games })
        res.render('profiles/show.ejs', {
            user: userInDatabase,
            profile: currentProfile, 
            games: currentGames
        })
    } catch (err) {
        console.log(err) 
        res.redirect('/')
    }
})

router.get('/:gameId/edit', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const currentGame = await Games.findOne({_id: req.params.gameId})
        res.render('profiles/edit.ejs', {
            user: userInDatabase,
            game: currentGame,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.put('/:gameId', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const currentGame = await Games.findOne({_id: req.params.gameId})
        const myProfile = await Profile.findByIdAndUpdate(userInDatabase.profile._id, { 
            $push: { games: currentGame },
        });
        res.redirect(`/profiles/myProfile`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.delete('/:gameId', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ _id: req.session.user._id }).populate('profile')
        const currentGame = await Games.findOne({_id: req.params.gameId})
        const myProfile = await Profile.findByIdAndUpdate(userInDatabase.profile._id, { 
            $pull: { games: currentGame._id },
        });
        res.redirect(`/profiles/myProfile`)
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

        res.redirect('/profiles/myProfile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.delete('/checkbox', async (req, res) => {
    try {
        await Games.findByIdAndUpdate(req.body.gameCompleted, { 
            $pull: { completedByUsers: req.session.user._id },
        });

        res.redirect('/profiles/myProfile')
    } catch (err) { 
        console.log(err) 
        res.redirect('/')
    }
})
module.exports = router;