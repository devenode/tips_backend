const { Sequelize } = require('sequelize');

const getSequelizeError = err => {
   let msg = [`Something went wrong with Sequelize query and you don't handle this error...`];
   if (process.env.NODE_ENV === `Development`) console.log(err);

   if (err instanceof Sequelize.UniqueConstraintError) {
      msg = err.errors.map(el => {
         return `${el.value} - is already in use. Use unique titles.`;
      });
   }

   if (err instanceof Sequelize.ValidationError) {
      console.log(`ValidationError`);
   }

   if (err instanceof Sequelize.DatabaseError) {
      if (err.original.sql === CREATE_SECTION.sql &&
          err.message === CREATE_SECTION.error) {
         msg = [`Section title is too long (Max 50 chars)`];
      }

      if (err.original.sql === CREATE_POST.sql &&
          err.message === CREATE_POST.error) {
         msg = [`Post title is too long (Max 50 chars)`];
      }
   }

   if (err instanceof Sequelize.BaseError) return msg;
   else return false;
}

const CREATE_SECTION = {
   sql: "INSERT INTO `sections` (`id`,`title`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?);",
   error: `Data too long for column 'title' at row 1`
}

const CREATE_POST = {
   sql: "INSERT INTO `posts` (`id`,`shortTitle`,`content`,`createdAt`,`updatedAt`,`sectionId`) VALUES (DEFAULT,?,?,?,?,?);",
   error: `Data too long for column 'shortTitle' at row 1`
}

module.exports = {
   getSequelizeError
}