const { Sequelize, DataTypes } = require('sequelize');
const { Op } = Sequelize;
const sectionsModel = require('./models/sections');
const postsModel = require('./models/posts');

const db = new Sequelize({
   database: process.env.DB_NAME,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   host: process.env.DB_HOST,
   dialect: process.env.DB_DIALECT,
   logging: false,
   dialectOptions: {
      supportBigNumbers: true,
   },
   define: {
      freezeTableName: true,
   },
   pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 60000,
   },
});

const sections = sectionsModel(db, DataTypes);
const posts = postsModel(db, DataTypes);

sections.posts = sections.hasMany(posts);
posts.sections = posts.belongsTo(sections);

module.exports = {
   Sequelize,
   Op,
   db
}