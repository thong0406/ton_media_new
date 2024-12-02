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

const ARTICLE_COMPONENT_TYPES = {
    BODY: 1,
    IMAGE: 2,
    VIDEO: 3,
}

const ARTICLE_BODY_STYLES = {
    H1: { tag: "h1", style: "margin: 0.1rem 0; font-size: 2rem;" },
    H2: { tag: "h2", style: "margin: 0.1rem 0; font-size: 1.5rem;"},
    H3: { tag: "h3", style: "margin: 0.1rem 0; font-size: 1.2rem;"},
    H4: { tag: "h4", style: "margin: 0.1rem 0; font-size: 1rem; font-style: italic"},
    P: { tag: "p", style: "line-height: 1.8" },
    BLOCK_QUOTE: { tag: "blockquote", style: `border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;` },
}

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
        const content = [];
        for (var j = 0; j < GetRandomInt(9) + 1; j++) {
            content.push({
                type: ARTICLE_COMPONENT_TYPES.BODY,
                bold: (Math.random() > 0.5),
                italic: (Math.random() > 0.5),
                style: ARTICLE_BODY_STYLES[Object.keys(ARTICLE_BODY_STYLES)[GetRandomInt(Object.keys(ARTICLE_BODY_STYLES).length)]],
                link: null,
                text: loremIpsum({
                        count: GetRandomInt(4) + 5, // Number of "words", "sentences", or "paragraphs"
                        format: "plain",             // "plain" or "html"
                        paragraphLowerBound: 3,     // Min. number of sentences per paragraph.
                        paragraphUpperBound: 7,     // Max. number of sentences per paragarph.
                        random: Math.random,
                        sentenceLowerBound: 5,      // Min. number of words per sentence.
                        sentenceUpperBound: 15,     // Max. number of words per sentence.
                        units: "sentences",
                    }) ,
            });
        } 
        posts.push({
            CategoryId: category ,
            Title: title ,
            Key: TitleToKey(title) ,
            Content: JSON.stringify(content),
            Thumbnail: images[GetRandomInt(images.length-1)],
        });
    }
    console.log(posts.length);
    return posts;
}
