import * as authService from '../services/auth.service.js';

export const checkIfUserLoggedIn = (req, res, next) => {
    if(req.session.user){
        next();
    }
    else {
        res.redirect('/auth/login');
    }
}
