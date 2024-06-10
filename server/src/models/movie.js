'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    }
  }, 
  {
    indexes: [
      {
        unique: true,
        fields: ['title']
      }
    ]
  });
  Movie.associate = function(models) {
    Movie.belongsToMany(models.Room, {
      through: models.Seance,
      foreignKey: 'movieId',
      otherKey: 'roomId'
    });
    Movie.hasMany(models.Seance, { foreignKey: 'movieId', as: 'seances' });
  };
  return Movie;
};

