const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { model } = require('mongoose');

module.exports = {
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '1h',
                issuer: 'DeeTechCoder.com',
                audience: [UserId],
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

   //middleware verify access token
verifyAccessToken:(req, res, next)=>{
    if(!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, payload) => {
        if(err){
            return next (createError.Unauthorized())
        }
        req.payload = payload;
        next()
    })
},

verifyRefreshToken:(refreshToken)=>{
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SERCET,(err,payload) => {
            if (err) return reject(createError.Unauthorized())
                const userId = payload.aud;

            resolve(userId);
        });
    });
},

}
