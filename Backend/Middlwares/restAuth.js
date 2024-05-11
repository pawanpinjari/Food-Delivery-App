const jwt = require('jsonwebtoken');
const rest = require('../Userschema/rest');


const restAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("d",decoded)
        // const restData = await rest.findById(decoded.userId)
        // console.log(restData)
        // if (!restData) {
        //     throw new Error('Unable to login , invalid credentials');
        // }

        req.restId = decoded._Id;
        req.token = token;
        next();

    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
}

module.exports = restAuth;