import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-14138.appspot.com/o/1711143715962-DefaultArticle.png?alt=media&token=bd14bdd0-67b4-48ea-ae3b-06f9d80d4775.png',
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;