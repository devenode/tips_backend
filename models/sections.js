


module.exports = (db, type) => {
    return db.define(`sections`, {
        id: {
            type: type.STRING,
            primaryKey: true
        },
        date: {
            type: type.BIGINT,
            allowNull: false,
            defaultValue: () => Date.now(),
        },
        brand: {
            type: type.STRING,
            allowNull: true,
        },
        
    });
}