const express = require("express");
const router = express.Router();
const { bookingController } = require("../../controllers/client");

const { createBooking, getBookedSeats } = bookingController;

router.post("/", createBooking);
router.get("/booked-seats/movie/:movieId/room/:roomId", getBookedSeats);

module.exports = router;
