const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    poster: { type: String }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `moviePoster-${Date.now()}`);
    }
});

movieSchema.statics.uploadPoster = multer({ storage }).single("poster");

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;