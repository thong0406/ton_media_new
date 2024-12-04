const { TitleToKey } = require('../util');
const express = require('express');
const path = require('path');
const Post = require('../models/Post');
const Category = require('../models/Category');

const dotenv = require('dotenv');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            const filename = file.originalname;
            const ext = filename.substring(filename.length - filename.lastIndexOf(".") + 1);
            cb(null, "./public/images");
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            const filename = file.originalname;
            const ext = filename.substring(filename.length - filename.lastIndexOf(".") + 1);
            cb(null, path.parse(file.originalname).name + Date.now() + path.extname(file.originalname));
        }
    },
});
const upload = multer({ storage: storage });

router.get('/posts/all', async (req, res) => {
    console.log("Finding posts...");
    const count = parseInt(req.query.count) ?? 9;
    const page = parseInt(req.query.page) ?? 1;
    const query = req.query.query ?? "";
    const deleted = req.query.deleted ? true : false;
    const offset = Math.max(page - 1, 0) * count;
    try {
        const posts = await Post.find({ Title: { $regex: `.*${query}.*` }, Deleted: deleted }).populate("CategoryId").sort({ createdAt: -1 }).limit(count).skip(offset);
        res.json(posts);
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.get('/posts/all/count', async (req, res) => {
    console.log("Finding posts count...");
    const query = req.query.query ?? "";
    const deleted = req.query.deleted ? true : false;
    try {
        const posts = await Post.find({ Title: { $regex: `.*${query}.*` }, Deleted: deleted }).populate("CategoryId");
        res.send({count: posts.length});
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.get('/posts/all/:category', async (req, res) => {
    const categoryName = req.params.category;
    const count = parseInt(req.query.count) ?? 9;
    const page = parseInt(req.query.page) ?? 1;
    const query = req.query.query ?? "";
    const offset = Math.max(page - 1, 0) * count;
    const deleted = req.query.deleted ? true : false;
    console.log(`Finding posts by category: "${categoryName}"...`);
    try {
        const category = await Category.findOne({ Name: categoryName });
        const posts = await Post.find({ CategoryId: category._id, Deleted: deleted, Title: { $regex: `.*${query}.*` } }).populate("CategoryId").sort({ createdAt: -1 }).limit(count).skip(offset);
        res.json(posts);
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.get('/posts/all/:category/count', async (req, res) => {
    const categoryName = req.params.category;
    const query = req.query.query ?? "";
    const deleted = req.query.deleted ? true : false;
    console.log(`Finding posts count by category: "${categoryName}"...`);
    try {
        const category = await Category.findOne({ Name: categoryName });
        const posts = await Post.find({ CategoryId: category._id, Deleted: deleted, Title: { $regex: `.*${query}.*` } }).populate("CategoryId");
        res.send({count: posts.length});
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.get('/posts/:key', async (req, res) => {
    const key = req.params.key;
    console.log(`Finding post "${key}"...`);
    try {
        const post = await Post.findOne({ Key: key }).populate("CategoryId");
        res.send(post);
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.post('/posts/create', authenticateToken, upload.single('thumbnail'), async (req, res) => {
    console.log("Uploading post...");
    try {
        const {
            title, 
            content,
            category
        } = req.body;
        const key = TitleToKey(title);
        const categoryId = await Category.findOne({ Name: category });
        const post = new Post({ Title: title, Content: content, Key: key, Thumbnail: `${process.env.IMAGE_PATH}/${req.file.filename}`, CategoryId: categoryId });
        await post.save();
        res.json({ message: "Uploaded successfully!", key: key });
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.post('/posts/update/:key', authenticateToken, upload.single('thumbnail'), async (req, res) => {
    let key = req.params.key;
    console.log(`Updating post "${key}"...`);
    try {
        const {
            title, 
            content,
            category
        } = req.body;
        const post = await Post.findOne({ Key: key, Deleted: false }).populate("CategoryId");
        console.log(category);
        const categoryId = await Category.findOne({ Name: category });
        console.log(categoryId.Name);
        post.CategoryId = categoryId;
        post.Title = title;
        post.Content = content;
        if (res.file) post.Thumbnail = `${process.env.IMAGE_PATH}/${req.file.filename}`;
        await post.save();
        res.json({ message: "Uploaded successfully!", key: key });
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.post('/posts/delete/:key', authenticateToken, async (req, res) => {
    const key = req.params.key;
    console.log(`Deleting post "${key}"...`);
    try {
        const post = await Post.findOne({ Key: key });
        const thumbnail = post.Thumbnail;
        const filename = thumbnail.substring(thumbnail.lastIndexOf("/") + 1);
        post.Deleted = true;
        await post.save(); 
        await unlinkAsync(`./public/images/${filename}`);
        res.json({ message: "Deleted successfully!" });
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

router.post('/posts/clear', authenticateToken, async (req, res) => {
    console.log("Clearing posts...");
    try {
        await Post.deleteMany({});
        res.json({ message: "Cleared successfully!" });
    }
    catch (e) {
        console.log(e);
        res.json({ error: "Error" });
    }
});

module.exports = router;