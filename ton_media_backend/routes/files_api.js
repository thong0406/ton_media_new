const { TitleToKey } = require('../util');
const express = require('express');
const fs = require('fs');

const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const { promisify } = require('util');
const path = require('path');
const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, "./public/images");
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            console.log(file.originalname)
            console.log(file.filename)
            console.log(path.parse(file.originalname).name)
            cb(null, path.parse(file.originalname).name + Date.now() + path.extname(file.originalname));
        }
    },
});
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, "./public/videos");
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            console.log(file.originalname)
            console.log(file.filename)
            console.log(path.parse(file.originalname).name)
            cb(null, path.parse(file.originalname).name + Date.now() + path.extname(file.originalname));
        }
    },
});
const uploadImage = multer({ storage: storageImage });
const uploadVideo = multer({ storage: storageVideo });

const unlinkAsync = promisify(fs.unlink) 

router.post('/files/images/upload', authenticateToken, uploadImage.single('file'), async (req, res) => {
    console.log(`Uploading file ${req.file.filename}...`);
    res.send({ message: "Uploaded successfully!" });
});

router.post('/files/videos/upload', authenticateToken, uploadVideo.single('file'), async (req, res) => {
    console.log(`Uploading file ${req.file.filename}...`);
    res.send({ message: "Uploaded successfully!" });
});

router.get('/files/images/all', authenticateToken, async (req, res) => {
    console.log("Getting all images...");
    const files = await fs.readdirSync("./public/images");
    res.send(files);
});

router.post('/files/images/delete/:filename', authenticateToken, async (req, res) => {
    const filename = req.params.filename;
    console.log(`Deleting image "${filename}"...`);
    await unlinkAsync(`./public/images/${filename}`); 
    res.send({ message: "Deleted successfulle!" });
});

router.get('/files/videos/all', authenticateToken, async (req, res) => {
    console.log("Getting all videos...");
    const files = await fs.readdirSync("./public/videos");
    res.send(files);
});

router.post('/files/videos/delete/:filename', authenticateToken, async (req, res) => {
    const filename = req.params.filename;
    console.log(`Deleting video "${filename}"...`);
    await unlinkAsync(`./public/videos/${filename}`); 
    res.send({ message: "Deleted successfulle!" });
});

module.exports = router;