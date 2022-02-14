module.exports = (db, DataTypes) => {
   return db.define(`Sections`, {
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