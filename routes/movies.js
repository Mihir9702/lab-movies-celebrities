const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Famous = require("../models/Famous.model");

/* GET home page */
router.get("/", (req, res) => {
  Movie.find()
    .then(all => res.render("movies/movies", { all }))
    .catch(err => console.log(err));
});

router.get("/create", (req, res) => {
  Famous.find()
    .then(allFamousPeople => res.render("movies/new-movie", { allFamousPeople }))
    .catch(err => console.log(err));
});

router.post("/create", (req, res) => {
  Movie.create(req.body)
    .then(res.redirect("/movies"))
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then(movie => res.render("movies/movie-details", movie))
    .catch(err => console.error(err));
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(res.redirect("/movies"))
    .catch(error => console.error(error));
});

router.get("/:id/edit-movie", async (req, res) => {

  const fame = await Famous.find()
  const movie = await Movie.findById(req.params.id)

  try { res.render('movies/edit-movie', { fame, movie }) }
  catch (error) { console.log(error) }

});

router.post("/:id/edit-movie", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(res.redirect("/movies"))
    .catch(err => console.error(err));
});

module.exports = router;
