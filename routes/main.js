import express from 'express';

const router = express.Router();

router.get('',(req,res)=>{
    return res.send('<h2>Welcome to the blog</h2>');
});


export default router;