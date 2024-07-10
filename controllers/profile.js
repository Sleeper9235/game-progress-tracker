const express = require('express');
const router = express.Router();

const Profile = require('../models/profile.js')

router.get('/', async (req, res) => {
    try {
        res.render('/profile')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/', async(req, res) => {
    try {
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router;
