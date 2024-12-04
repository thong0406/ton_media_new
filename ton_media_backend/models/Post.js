const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    Thumbnail: {
        type: String,
        required: true,
        default: "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg",
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