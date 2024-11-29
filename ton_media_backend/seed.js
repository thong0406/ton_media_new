const { loremIpsum } = require('lorem-ipsum');
const { GetRandomInt, TitleToKey } = require('./util');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" })
    .then(() => {
        console.log('MongoDB connected');
        seedData();
    })
    .catch((error) => console.log('MongoDB connection error:', error));

const images = [
    "https://image.blocktempo.com/2024/11/doge-1-750x375.png",
    "https://image.blocktempo.com/2024/11/bitequitymarket-1024x570-1.webp",
    "https://image.blocktempo.com/2024/11/image1-10-750x375.png",
    "https://image.blocktempo.com/2024/11/20241120113534.jpg",
    "https://image.blocktempo.com/2024/11/cftc-750x375.jpg",
]

async function seedData() {
    try {
        // Generate Users
        const users = [
            {
                Username: "user1",
                Password: "pass1",
                Name: "User 1"
            }, 
            {
                Username: "user2",
                Password: "pass2",
                Name: "User 2"
            }, 
        ];
        await User.deleteMany({});
        await User.create(users);
        
        // Generate Categories
        const categories = [
            { Name: "Category A" } ,
            { Name: "Category B" } ,
            { Name: "Category C" } ,
            { Name: "Category D" } ,
            { Name: "Category E" } ,
            { Name: "Category F" } ,
            { Name: "Category G" } ,
            { Name: "Category H" } ,
        ];
        await Category.deleteMany({});
        await Category.create(categories);

        // Generate Posts
        const posts = await generatePosts(100);
        await Post.deleteMany({});
        await Post.create(posts);
        console.log("Seeding completed!");
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function generatePosts(n) {
    const categories = await Category.find();
    const posts = [];
    for (var i = 0; i < n; i++) {
        const category = categories[GetRandomInt(categories.length - 1)];
        const title = loremIpsum({
            count: 1,
            sentenceLowerBound: 3,
            sentenceUpperBound: 6,
            units: "sentence"
        });
        const content = loremIpsum({
            count: GetRandomInt(4) + 2, // Number of "words", "sentences", or "paragraphs"
            format: "html",             // "plain" or "html"
            paragraphLowerBound: 3,     // Min. number of sentences per paragraph.
            paragraphUpperBound: 7,     // Max. number of sentences per paragarph.
            random: Math.random,
            sentenceLowerBound: 5,      // Min. number of words per sentence.
            sentenceUpperBound: 15,     // Max. number of words per sentence.
            units: "paragraphs",
        });
        posts.push({
            CategoryId: category ,
            Title: title ,
            Key: TitleToKey(title) ,
            Content: content,
            Thumbnail: images[GetRandomInt(images.length-1)],
        });
    }
    console.log(posts.length);
    return posts;
}
