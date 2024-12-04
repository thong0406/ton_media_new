const { TitleToKey } = require('../util');
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Category = require('../models/Category');
const authenticateToken = require('../middleware/auth');

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

router.post('/categories/create', authenticateToken, async (req, res) => {
    console.log("Creating category...");
    try {
        const { name } = res.body;
        const category = new Category({ Name: name });
        await category.save();
        res.json({ category: category });
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/categories/update/:name', authenticateToken, async (req, res) => {
    const name = req.params.name;
    console.log(`Updating category ${name}...`);
    try {
        const { name } = res.body;
        const category = Category.findOne({ Name: name });
        category.Name = name;
        await category.save();
        res.json({ category: category });
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/categories/delete/:name', authenticateToken, async (req, res) => {
    const name = req.params.name;
    console.log(`Deleting category ${name}...`);
    try {
        const { name } = res.body;
        await Category.deleteOne({ Name: name });
        res.json({ message: "Deleted successfully!" });
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

module.exports = router;