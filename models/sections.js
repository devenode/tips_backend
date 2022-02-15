module.exports = (db, DataTypes) => {
   return db.define(`sections`, {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      }
   });
}