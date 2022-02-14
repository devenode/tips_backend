module.exports = (db, DataTypes) => {
   return db.define(`Posts`, {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      shortTitle: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      content: {
         type: DataTypes.TEXT,
         allowNull: false,
      }
   });
}