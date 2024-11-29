const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    Thumbnail: {
        type: String,
        required: true,
        default: "https://image.blocktempo.com/2024/11/20241120113534.jpg",
    },
    Title: {
        type: String,
        required: true,
    },
    Key: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    Deleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;