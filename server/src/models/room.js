'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });

  Room.associate = function(models) {
    Room.belongsToMany(models.Movie, {
      through: models.Seance,
      foreignKey: 'roomId',
      otherKey: 'movieId'
    });
    Room.hasMany(models.Seance, { foreignKey: 'roomId', as: 'seances' });
    Room.hasMany(models.Seat, { foreignKey: 'roomId' });
  };

  return Room;
};
