import express from 'express';
import posts from './posts.js';
import Post from '../app/model/Post.js';
import dashboard from './dashboard.js';
import category from './category.js';

const router = express.Router();

router.get('', async (req,res)=>{
    const meta = {
        pageTitle: "Test blog",
        pageDescription: "This is a simple blog using node express and ejs"
    };

    const posts = await Post.find().limit(5).sort({_id: -1});

    return res.render('index',{meta,posts});
});


router.use('/posts', posts);
router.use('/admin',dashboard);
router.use('/admin/categories',category);
export default router;