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

export const store = async (reg,res)=>{

    return res.json(reg.body);
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

export const update = async (reg,res)=>{
    
}

export const destroy = async (reg,res)=>{
    
}