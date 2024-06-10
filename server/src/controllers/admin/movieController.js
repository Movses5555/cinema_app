const { sequelize, Movie, Seance } = require("../../models");

const transformData = (seances) => {
  const groupedDateTimes = {};
  seances.forEach((dt, i) => {
    if (!groupedDateTimes[dt.date]) {
      groupedDateTimes[dt.date] = {
        id: i,
        roomId: dt.roomId,
        date: dt.date,
        times: [],
      };
    }
    const time = dt.time.slice(0, 5);
    groupedDateTimes[dt.date].times.push(time);
  });
  return Object.values(groupedDateTimes);
};

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Seance,
          as: 'seances',
        },
      ],
    });
    const result = movies.map((movie) => {
      const plainMovie = movie.get({ plain: true });
      plainMovie.posterFullPath = plainMovie.poster
        ? `${req.protocol}://${req.get("host")}/uploads/${plainMovie.poster}`
        : null;
      return plainMovie;
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  const { poster, description, title, duration, seances } = req.body;
  
  const transaction = await sequelize.transaction();
  try {
    let newMovie = await Movie.create({
      poster,
      description,
      title,
      duration,
    }, { transaction });

    newMovie = newMovie.toJSON();

    for(const [index, seance] of seances.entries()) {
      const { roomId, date, times } = seance;
      for(const time of times) {
        const existingSeance = await Seance.findOne({
          where: {
            roomId,
            date,
            time,
          },
          transaction,
        });
        if (!existingSeance) {
          await Seance.create({
            roomId,
            movieId: newMovie.id,
            date,
            time,
          }, { transaction });
        } else {
          await transaction.rollback();
          const key = `seances[${index}]`;
          return res.status(403).json({
            [key]: "A seance exists at this time."
          })
        }
      }
    }

    await transaction.commit();
    let movie = await Movie.findOne({
      where: { id: newMovie.id },
      include: [
        {
          model: Seance,
          as: 'seances'
        },
      ],
    });
    movie = movie.toJSON();
    movie.posterFullPath = movie.poster ? `${req.protocol}://${req.get("host")}/uploads/${movie.poster}` : null;
    res.json({...movie});
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    let movie = await Movie.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Seance,
          as: 'seances',
        },
      ],
    });
    if (movie) {
      movie = movie.toJSON();
      let seances = transformData(movie.seances);
      movie.seances = seances;
      movie.posterFullPath = movie.poster ? `${req.protocol}://${req.get("host")}/uploads/${movie.poster}` : null;
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { seances, ...data } = req.body
    const { id } = req.params
    const movie = await Movie.findByPk(id);
    if(!movie) {
      await transaction.rollback();
      return res.status(404).json({ message: "Movie not found" });
    }
    if(Object.keys(data).length) {
      await Movie.update(data, {
        where: { id },
        transaction,
      });
    }
    await Seance.destroy({where: { movieId: id }, transaction});
    if(seances) {
      for(const [index, seance] of seances.entries()) {
        const { roomId, date, times } = seance;
        for (const time of times) {
          const existingSeance = await Seance.findOne({
            where: {
              roomId,
              date,
              time,
            },
            transaction,
          });
          if (!existingSeance) {
            await Seance.create({
              roomId,
              movieId: id,
              date,
              time,
            }, { transaction });
            
          } else {
            await transaction.rollback();
            const key = `seances[${index}]`;
            return res.status(403).json({
              [key]: "A seance exists at this time."
            })
          }
        }
      }
    }

    await transaction.commit();
    let updatedMovie = await Movie.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Seance,
          as: 'seances',
        },
      ],
    });
    updatedMovie = updatedMovie.toJSON();
    updatedMovie.seances = transformData(updatedMovie.seances);
    updatedMovie.posterFullPath = updatedMovie.poster ? `${req.protocol}://${req.get("host")}/uploads/${updatedMovie.poster}` : null;     
    
    res.json(updatedMovie);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(id);
    if(!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await Movie.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies, 
  createMovie, 
  getMovieById, 
  updateMovie, 
  deleteMovie,
};
