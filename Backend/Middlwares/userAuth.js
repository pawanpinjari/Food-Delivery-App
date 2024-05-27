const jwt = require('jsonwebtoken');
const user = require('../Userschema/user');


const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userId = await user.findOne({
            _id: decoded.userId,
        })
  
        if (!userId) {
            throw new Error('Unable to login , invalid credentials');
        }

        req.user = userId;
        req.token = token;
        next();

    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
}

module.exports = userAuth;