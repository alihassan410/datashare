const JWTService = require('../services/JWTservice');
const Admin = require('../models/admin');
const AdminDTO = require('../dto/admin');

const auth = async (req, res, next) => {
    try{
    const {refreshToken, accessToken} = req.cookies;

    if (!refreshToken || !accessToken){
        const error = {
            status: 401,
            message: 'Unauthorized'
        }

        return next(error)
    }

    let _id;

    try{
        _id = JWTService.verifyAccessToken(accessToken)._id;
    }
    catch(error){
        return next(error);
    }

    let user;

    try{
        user = await Admin.findOne({_id: _id});
    }
    catch(error){
        return next(error);
    }

    const adminDTO = new AdminDTO(user);

    req.user = adminDTO;

    next();
    }
    catch(error){
        return next(error);
    }
}

module.exports = auth;
