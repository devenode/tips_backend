const logger = require('../utils/logger')(`Error_404`);

module.exports = (req, res, next) => {
   logger.info(req.originalUrl);
   res.status(404).send(`No such route - 404`);
}