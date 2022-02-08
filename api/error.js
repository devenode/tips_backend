const logger = require('../utils/logger')(`Error_404`);

module.exports = (req, res, next) => {
    if (process.env.NODE_ENV === `Production`) {
        logger.info(req.originalUrl);
    }
    res.status(404).render(`404`, { layout: false });
}