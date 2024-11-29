const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');

const router = express.Router();

router.get('/test', async (req, res) => {
    console.log("Success!");
    res.send("Success!");
})

router.post('/login', async (req, res) => {
    console.log("Logging in...");
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ Username: username, Password: password });
        if (user) {
            console.log(`User ${username} found!`);
            const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10000h' });
            user.AccessToken = jwtToken;
            await user.save();
            res.json({ jwtToken });
        }
        else {
            console.log("No user found!");
            res.json({ message: "No user found!" });
        }
    }
    catch (error) {
        console.log("No user found!");
        res.json({ message: "No user found!" });
    }
});

router.get('/users/all', async (req, res) => {
    console.log("Getting users...");
    try {
        const users = await User.find().populate("User");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weapon levels' });
    }
});

module.exports = router;