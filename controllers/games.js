const express = require('express');
const router = express.Router();

const Game = require('../models/games.js')

router.get('/', async (req, res) => {
    try {
        const games = await Game.find({})
        res.render('games/index.ejs', {
            games: games,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/', async(req, res) => {
    try {
        await Game.create(req.body)
        res.redirect('/games')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/armoury', async (req, res) => {
    try {
        const games = await Game.find({})
        res.render('games/armoury.ejs', {
            games: games,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/armoury/:gameId', async (req, res) => {
    try {
        const currentGame = await Game.find({_id: req.params.gameId})
        res.render('games/show.ejs', {
            games: currentGame,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/armoury/:gameId/edit', async (req, res) => {
    try {
        const currentGame = await Game.find({_id: req.params.gameId})
        res.render('games/edit.ejs', {
            game: currentGame,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.put('/armoury/:gameId/edit', async (req, res) => {
    try {
        const currentGame = await Game.findOneAndUpdate({_id: req.params.gameId}, {
            $set: (req.body)
        }
        )
        await currentGame.save()
        res.redirect(`/games/armoury/${req.params.gameId}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


module.exports = router;