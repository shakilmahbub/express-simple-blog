import jwt from 'jsonwebtoken';
const authenticated = (req,res,next)=>{
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if(!token){
        return res.redirect('/admin/login');
    }

    try {
        const decode = jwt.verify(token,secret);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.redirect('/admin/login');
    }
}

export default authenticated;