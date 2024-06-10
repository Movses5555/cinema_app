const { Room, Seat } = require("../../models");


const generateSeatsForRoom = async (roomId, rows = 10, numberPerRow = 8) => {
  try {
    for (let row = 0; row < rows; row++) {
      for (let number = 0; number < numberPerRow; number++) {
        await Seat.create({ roomId, row, number });
      }
    }
  } catch (error) {
    throw error;
  }
};


const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    await generateSeatsForRoom(room.id);
    res.json(room);
  } catch (error) {
    next(error); 
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    const [updated] = await Room.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRoom = await Room.findByPk(req.params.id);
      res.json(updatedRoom);
    } else {
      res.status(500).json({ message: "Something went wrong." });
    }
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    await Room.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
