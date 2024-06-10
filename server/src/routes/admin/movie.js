const express = require("express");
const router = express.Router();
const { movieController } = require("../../controllers/admin");
const { 
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = movieController;
const { validateMovie, validateUpdateMovie } = require('../../middleware/validateMovie');

router.get("/", getAllMovies);
router.post("/", validateMovie, createMovie);
router.get("/:id", getMovieById);
router.put("/:id", validateUpdateMovie, updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
