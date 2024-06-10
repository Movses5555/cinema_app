const express = require("express");
const router = express.Router();
const { roomController } = require("../../controllers/admin");
const { 
  getAllRooms, 
  createRoom,
  updateRoom, 
  deleteRoom 
} = roomController;
const { validateRoom } = require('../../middleware/validateMovie');

router.get("/", getAllRooms);
router.post("/", validateRoom, createRoom);
router.put("/:id", validateRoom, updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
