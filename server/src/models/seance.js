'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seance = sequelize.define('Seance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        notEmpty: true,
        isDate: true,
        isNotPastDate(value) {
          if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
            throw new Error("Date must not be in the past");
          }
        },
      },
    },
    time: {
      type: DataTypes.TIME(0),
      allowNull: true,
      get() {
        const rawTime = this.getDataValue('time');
        if (rawTime) {
          const [hours, minutes] = rawTime.split(':');
          return `${hours}:${minutes}`;
        }
        return null;
      },
      validate: {
        notEmpty: true,
        is: /^\d{2}:\d{2}$/,
      },
    },
  }, 
  {
    indexes: [
      {
        unique: true,
        fields: ['roomId', 'movieId', 'date', 'time']
      }
    ]
  });
  Seance.associate = function(models) {
    Seance.belongsTo(models.Room, { foreignKey: 'roomId', as: "rooms"});
    Seance.belongsTo(models.Movie, { foreignKey: 'movieId', as: "movies" });
    Seance.hasMany(models.Booking, { foreignKey: 'seanceId', as: "bookings" });
  };
  return Seance;
};
