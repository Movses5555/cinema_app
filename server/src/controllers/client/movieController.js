const { Movie, Room, Seance } = require("../../models");

const groupSeances = (seances) => {
  const groupedSeances = seances.reduce((acc, seance) => {
    const date = seance.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(seance);
    return acc;
  }, {});

  const sortedKeys = Object.keys(groupedSeances).sort();
  const sortedData = {};
  for (const key of sortedKeys) {
    sortedData[key] = groupedSeances[key];
  }
  return sortedData;
};


const groupAndSortDateTimes = (dateTimes) => {
  const groupedDateTimes = dateTimes.reduce((acc, dateTime) => {
    const date = dateTime.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(dateTime);
    return acc;
  }, {});

  for (const date in groupedDateTimes) {
    groupedDateTimes[date].sort(
      (a, b) =>
        new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
    );
  }
  return groupedDateTimes;
};

const getMoviesByRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findByPk(roomId);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    const movies = await Movie.findAll({
      include: [
        {
          model: Seance,
          as: 'seances',
          where: {roomId}
        }
      ]
    });
    const result = movies?.map((item) => {
      const movie = item.toJSON();
      movie.posterFullPath = movie.poster ? `${req.protocol}://${req.get("host")}/uploads/${movie.poster}` : null;
      movie.seances = groupSeances(movie.seances);
      return movie;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    let movie = await Movie.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Seance,
          as: 'seances',
          include: [
            { 
              model: Room,
              as: 'rooms',
            }
          ]
        }
      ],
    });
    if (movie) {
      movie = movie.toJSON();
      movie.posterFullPath = movie.poster ? `${req.protocol}://${req.get("host")}/uploads/${movie.poster}` : null;
      movie.seances = groupAndSortDateTimes(movie.seances);
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMoviesByRoom,
  getMovieById,
};
