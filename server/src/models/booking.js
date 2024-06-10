'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['seatId', 'seanceId']
      }
    ]
  });

  Booking.associate = function(models) {
    Booking.belongsTo(models.Seance, { foreignKey: 'seanceId', as: "seances" });
    Booking.belongsTo(models.Seat, { foreignKey: 'seatId', as: "seat" });
  };
  return Booking;
};
