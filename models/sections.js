module.exports = (db, DataTypes) => {
   return db.define(`sections`, {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      title: {
         type: DataTypes.STRING(50),
         allowNull: false,
         unique: true
      }
   });
}