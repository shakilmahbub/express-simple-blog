import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import mailer from '../config/mailer.js';
import ejs from 'ejs';
import agenda from '../helper/agenda.js';

export const index = async (reg,res)=>{
    const meta = {
        pageTitle: "Dashboard",
        pageDescription: "Welcome to admin dashboard"
    };
    return res.render('dashboard/index',{meta});
}

export const login = (reg, res)=>{
    const meta = {
        pageTitle: "Login",
        pageDescription: "Welcome to login"
    };

    return res.render('dashboard/login',{meta});
}

export const registration = (reg, res)=>{
    const meta = {
        pageTitle: "Registration",
        pageDescription: "Welcome to login"
    };

    return res.render('dashboard/registration',{meta});
}

export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name){
        return res.status(400).json({message: 'Name field are required'});
    }
    if(!email){
        return res.status(400).json({message: 'Email field are required'});
    }
    if(!password){
        return res.status(400).json({message: 'Password field are required'});
    }
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const user = new User({name,email,password:hashPassword});
        await user.save();


        await agenda.now('send welcome email', {
            email,
            name,
        });

        // const emailTemplate = await ejs.renderFile('views/email/welcome.ejs');
        // await mailer.sendMail({
        //     from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        //     to: "bar@example.com, baz@example.com",
        //     subject: "Hello ✔",
        //     text: "Hello world?", // Plain-text version of the message
        //     html: emailTemplate, // HTML version of the message
        // });
        return res.status(201).json({message: "Registration successful"});
    } catch (error) {
        if(error.code === 11000){
            return res.status(409).json({message: 'User exists'});
        }

        return res.status(500).json({error});
    }
}

export const authenticateUser = async (req,res)=>{
    const {email,password} = req.body;
    const secret = process.env.JWT_SECRET;
    if(!email){
        return res.status(400).json({message: 'Email field are required'});
    }
    if(!password){
        return res.status(400).json({message: 'Password field are required'});
    }

    const user = await User.findOne({'email': email});

    if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
    }
    try {

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
                return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({userId: user._id},secret);

        res.cookie('token',token,{httpOnly: true});

        res.redirect('/admin/dashboard');
        
    } catch (error) {
        return res.status(500).json('Opps! something went wrong!');
    }

}


export const logout = (req,res)=>{
    res.cookie('token','',{httpOnly: true,maxAge: 1});

    return res.redirect('/');
}