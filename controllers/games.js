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


module.exports = router;
