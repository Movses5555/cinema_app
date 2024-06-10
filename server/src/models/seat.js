'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define("Seat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['row', 'number', 'roomId']
      }
    ]
  });

  Seat.associate = function(models) {
    Seat.belongsTo(models.Room, { foreignKey: 'roomId', as: "rooms" });
    Seat.hasMany(models.Booking, { foreignKey: 'seatId', as: "bookings" });
  };
  return Seat;
};
