const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Famous = require('../models/Famous.model');

/* GET home page */
router.get("/", (req, res) => {
  Movie
    .find()
    .then(all => res.render('movies/movies', { all }))
    .catch(err => console.log(err))
});

router.get("/create", (req, res) => {
  Famous
    .find()
    .then(allFamousPeople => {
      res.render("movies/new-movie", { allFamousPeople });
    })
    .catch(err => console.log(err))
});

router.post("/create", (req, res) => {
  Movie
    .create(req.body)
    .then(results => {
      res.redirect('/movies')
    })
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  Movie
    .findById(req.params.id).populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.error(err))
})

router.post('/:id/delete', (req, res) => {
  Movie
    .findByIdAndRemove(req.params.id)
    .then(res.redirect('/movies'))
    .catch(err => console.error(err))
})

router.get('/:id/edit-movie', (req, res) => {
  Famous
    .find()
    .then(famous => {
    Movie
      .findById(req.params.id)
      .then(movie => res.render('movies/edit-movie', { famous, movie }))
      .catch(err => console.log(`Movie Error: ${err}`))
    })
    .catch(err => console.log(`Famous Error: ${err}`))
})

router.post('/:id/edit-movie', (req, res) => {
  Movie
    .findByIdAndUpdate(req.params.id, req.body)
    .then(res.redirect('/movies'))
    .catch(err => console.error(err))
})


module.exports = router;