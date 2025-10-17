import session from "express-session";

export const checkIfProfileCompleted = (req, res, next) => {
    if(!req.session.user.profileCompleted){
        res.redirect('/auth/addProfile');
    }else {
        next();
    }
}