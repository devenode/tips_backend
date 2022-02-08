const { transports, createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = fileName => {
   const file = new DailyRotateFile({
      filename: `./logs/%DATE%_${fileName}.log`,
      datePattern: `YYYY-MM-DD`,
      auditFile: `./logs/audit_${fileName}.txt`,
      maxSize: `10m`,
      maxFiles: `30d`
   });

   return createLogger({
      format: format.combine(
         format.timestamp({ format: `HH:mm:ss` }),
         format.simple(),
      ),
      transports: [
         new transports.Console(),
         file
      ]
   });
}

module.exports = logger;

