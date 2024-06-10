const { Booking, Seat, Movie, Room, Seance } = require("../../models");


const getAllBookedSeats = async ({roomId, movieId, date, time}) => {
  let seance = await Seance.findOne({
    where: {roomId: roomId, movieId: movieId, date, time: time}
  });
  if(!seance) {
    return [];
  }
  const bookings = await Booking.findAll({
    where: { seanceId: seance.id },
    include: {
      model: Seat,
      as: "seat",
      attributes: ["id", "row", "number"],
    }
  });
  let bookedSeats = {};
  bookings?.forEach((booking) => {
    booking = booking.toJSON();
    if (booking.seat.row in bookedSeats) {
      bookedSeats[booking.seat.row] = [
        ...bookedSeats[booking.seat.row],
        booking.seat.number,
      ];
    } else {
      bookedSeats[booking.seat.row] = [booking.seat.number];
    }
  });
  return bookedSeats;
}


const createBooking = async (req, res) => {
  try {
    const { roomId, movieId, date, time, seats } = req.body;
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    let seance = await Seance.findOne({
      where: {
        roomId: roomId,
        movieId: movieId,
        date: date,
        time: time,
      }
    });

    if (!seance) {
      return res.status(404).json({ message: "Seance not found" });
    }
    seance = seance.toJSON();
  
    for (const requestedSeat of seats) {
      let seat = await Seat.findOne({
        where: {
          row: requestedSeat.row.toString(),
          number: requestedSeat.seat.toString(),
        }
      });
      if (!seat) {
        return res.status(404).json({ message: "Seat not found" });
      }
      seat = seat.toJSON();
    
      const option = {
        seatId: seat.id, 
        seanceId: seance.id
      }
      const count = await Booking.count({ where: option });
      if (count) {
        return res
          .status(400)
          .json({ message: "Seats are already booked by someone else." });
      }
      await Booking.create(option);
    }
    const bookedSeats = await getAllBookedSeats({roomId, movieId, date, time})
    return res.status(201).json({bookedSeats});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookedSeats = async (req, res) => {
  try {
    const { movieId, roomId } = req.params;
    const { date, time } = req.query;
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const movieById = await Movie.findByPk(movieId);
    if (!movieById) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const bookedSeats = await getAllBookedSeats({roomId, movieId, date, time})
    res.status(200).json(bookedSeats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookedSeats,
};
