const logger = require('./logger')('routes');
const { getSequelizeError } = require('./sequelizeErrors');

const errorHandler = reqHandler => async (req, res, next) => {
   try {
      await reqHandler(req, res, next);
   } catch (err) {
      if (process.env.NODE_ENV !== `Development`) logger.info(err.stack);
      const msg = getSequelizeError(err) || [err.message];
      res.status(500).send(msg);
   }
}

module.exports = errorHandler;