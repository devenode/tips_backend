const moment = require('moment');







exports.layout = async (req, res, next) => {

    res.locals = {
        ...res.locals,
        moment,
        
    }

    next();
}