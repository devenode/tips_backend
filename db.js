const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const ModeratorsModel =  require('./models/moderators');










const database = new Sequelize({
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
        timestamps: false,
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 30000,
        acquire: 60000,
    },
});


// const Moderators = ModeratorsModel(database, Sequelize);









// Sections.hasOne(Inquiries);
// Inquiries.belongsTo(Sections);







module.exports = {
    database,
    Sequelize,
    Op,
   //  Moderators,
}