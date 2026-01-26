import Category from "../model/Category.js";

export const index = async (reg,res)=>{
    const meta = {
        pageTitle: "Category list",
        pageDescription: "This is the category list"
    };
    const categoires = await Category.find().sort({_id: -1});
    return res.render('category/index',{meta,categoires});
}

export const create = async (reg,res)=>{
    const meta = {
        pageTitle: "Add new category",
        pageDescription: "This is a simple blog using node express and ejs"
    };

    return res.render('category/create',{meta});
}

export const store = async (reg,res)=>{

    const data = new Category(reg.body);
    await data.save();

    return res.json({ message: 'category saved'});
}

export const show = async (reg,res)=>{
    
    const post = await Category.findById(reg.params.id);

    const meta = {
        pageTitle: post.title,
        pageDescription: "This is a simple blog using node express and ejs"
    };
    return res.render('category/show',{meta,post});
}

export const edit = async (reg,res)=>{
    const category = await Category.findById(reg.params.id);

    const meta = {
        pageTitle: category.title,
        pageDescription: "This is a simple blog using node express and ejs"
    };

    return res.render('category/edit',{meta,category});
}

export const update = async (req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,req.body);
    return res.redirect('/admin/categories');
}

export const destroy = async (req,res)=>{
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.redirect('/admin/categories');

}