const express = require("express");
const router = express.Router();

const moviesRoutes = require("./movie");
const roomsRoutes = require("./room");
const { errorHandler } = require('../../middleware/errorHandler');


router.use("/movies", moviesRoutes);
router.use("/rooms", roomsRoutes);

router.use(errorHandler);

module.exports = router;

