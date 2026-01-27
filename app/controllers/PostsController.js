import Post from "../model/Post.js";

export const index = async (reg,res)=>{
    const meta = {
        pageTitle: "Test post",
        pageDescription: "This is a simple blog using node express and ejs"
    };
    return res.render('posts/index',{meta});
}

export const create = async (reg,res)=>{
    const meta = {
        pageTitle: "Add new post",
        pageDescription: "This is a simple blog using node express and ejs"
    };

    return res.render('posts/create',{meta});
}

export const store = async (req,res)=>{
    const title = req.body.title;
    if(!title){
        return res.status().json({message: 'Title filed is required'});
    }

    try {
        const newPost = new Post(req.body);
        await newPost.save();
        return res.redirect('/');
    } catch (error) {
        return res.status('500').json({message: 'Internal server error!'});
    }

    
}

export const show = async (reg,res)=>{
    
    const post = await Post.findById(reg.params.id);

    const meta = {
        pageTitle: post.title,
        pageDescription: "This is a simple blog using node express and ejs"
    };
    return res.render('posts/show',{meta,post});
}

export const edit = async (reg,res)=>{
    const post = await Post.findById(reg.params.id);

    const meta = {
        pageTitle: post.title,
        pageDescription: "This is a simple blog using node express and ejs"
    };

    return res.render('posts/edit',{meta,post});
}

export const update = async (req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.params.id,req.body);

        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const destroy = async (req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.redirect('/');
        console.log('Post deleted');
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}