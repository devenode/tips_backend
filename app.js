require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require(process.env.DB_PATH);
const logger = require('./utils/logger')(`app`);
const routes = require('./api/routes');
const error = require('./api/error');





app.use(cors());
app.use(cookieParser());
app.use(routes);
app.use(error);





(async () => {
   try {
      await db.database.sync();
      logger.info(`${process.env.NODE_ENV} DB connection done!`);

      const port = process.argv.slice(2)[0] || process.env.PORT;

      if (process.env.NODE_ENV === `Production`) app.listen(port, `127.0.0.1`, () => logger.info(`Production Server listening ${port} port...`));
      else app.listen(port, () => logger.info(`Development Server listening ${port} port...`));






   } catch (err) {
      logger.info(err.stack);
   }
})();