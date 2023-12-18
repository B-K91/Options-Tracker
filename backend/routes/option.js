const router = require('express').Router();
let Option = require('../models/option.model');

// creates a new option request
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const email = req.body.email;
  
  const newOption = new Option({
    name,
    description,
    email
  });

  newOption.save()
  .then(() => res.json('Thank you for your details, our team members will reach out to you'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// get all option requests
router.route('/').get((req, res) => {
  Option.find()
    .then(options => res.json(options))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
