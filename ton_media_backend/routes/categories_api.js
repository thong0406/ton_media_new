const { TitleToKey } = require('../util');
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Category = require('../models/Category');

const router = express.Router();

router.get('/categories/all', async (req, res) => {
    console.log("Finding categories...");
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

module.exports = router;