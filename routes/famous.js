const router = require("express").Router();
const Famous = require('../models/Famous.model');

/* GET home page */
router.get("/", (req, res) => {

  Famous
    .find()
    .then(all => res.render('famous/famous', { all }))
    .catch(err => console.log(err))

});

router.get("/create", (req, res) => res.render("famous/new-famous"));

router.post("/create", (req, res) => {

  Famous
    .create(req.body)
    .then(results => {
      console.log(results)
      res.redirect('/famous')
    })
    .catch(err => console.log(err))

});






module.exports = router;