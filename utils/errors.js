const { Sequelize } = require('sequelize');

const getSequelizeError = err => {
   let msg = [`Something wrong with Sequelize query and you don't handle this error...`];

   if (err instanceof Sequelize.ValidationError) {
      // Validation Error. Thrown when the sequelize validation has failed. The error contains an errors property,
      // which is an array with 1 or more ValidationErrorItems, one for each validation that failed.
   }

   if (err instanceof Sequelize.UniqueConstraintError) {
      msg = err.errors.map(el => {
         return `${el.value} - is already in use. Use unique titles.`;
      });
   }

   if (err instanceof Sequelize.BaseError) return msg;
   else return false;
}

module.exports = {
   getSequelizeError
}