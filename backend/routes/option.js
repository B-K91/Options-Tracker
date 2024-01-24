const router = require('express').Router();
let Option = require('../models/option.model');
const date_utility = require('../common/date_utility');
const calculator_utility = require('../common/calculator_utility');

// create an option
router.route('/option/add').post((req, res) => {
	const symbol = req.body.symbol;
	const strike_price = req.body.strike_price;
	const date_opened = date_utility.getCurrentDate();
	const date_closed = req.body.date_of_expiry;
	const date_of_expiry = req.body.date_of_expiry;
	const type = req.body.type;
	const premium = req.body.premium;
	const collateral = req.body.collateral;
	const is_open = true;
	const realized_gain_loss = 0;
	const option_return = Number(calculator_utility.getOptionReturn(premium, collateral));
	const option_arr = Number(calculator_utility.getOptionARRReturn(date_opened, date_of_expiry, premium, collateral));
	
	const newOption = new Option({
		symbol, strike_price, date_opened, date_closed, date_of_expiry, type,
		premium, collateral, is_open, realized_gain_loss, option_return,
		option_arr
	});

	newOption.save()
	.then((savedOption) => res.json({
		message: 'Option added successfully !!',
		optionId: savedOption._id
	}))
	.catch(err => res.status(400).json('Error: ' + err));
});


// get all options
router.route('/option/').get((req, res) => {
	Option.find()
	.then(options => res.json(options))
	.catch(err => res.status(400).json('Error: ' + err));
});


// get all open options
router.route('/option/open').get((req, res) => {
	Option.find({ is_open: true })
	.then(options =>res.json(options))
	.catch(err => res.status(400).json('Error'+err));
});


// get all closed options
router.route('/option/closed').get((req, res) => {
	Option.find({ is_open: false })
	.then(options =>res.json(options))
	.catch(err => res.status(400).json('Error'+err));
});


// get all open options for symbol
router.route('/option/open/:symbol').get((req, res) => {
	Option.find({ symbol: req.params.symbol, is_open: true })
	.then(options =>res.json(options))
	.catch(err => res.status(400).json('Error'+err));
});


// get all closed options for symbol
router.route('/option/closed/:symbol').get((req, res) => {
	Option.find({ symbol: req.params.symbol, is_open: false })
	.then(options =>res.json(options))
	.catch(err => res.status(400).json('Error'+err));
});


// find a option by id
router.route('/option/:id').get((req, res) => {
	Option.findById(req.params.id)
	.then(option =>res.json(option))
	.catch(err => res.status(400).json('Error'+err));
});


// update an option
router.route('/option/update/:id').post((req, res) => {
	Option.findById(req.params.id)
	.then(option => {
		option.strike_price = req.body.strike_price;
		option.date_closed = req.body.date_closed;
		if(req.body.is_open) {
			option.date_of_expiry = req.body.date_of_expiry;
		} else {
			option.date_of_expiry = req.body.date_closed;
			option.realized_gain_loss = req.body.premium;
		}
		option.category = req.body.category;
		option.type = req.body.type;
		option.premium = req.body.premium;
		option.collateral = req.body.collateral;
		option.is_open = req.body.is_open;
		option.option_return = Number(calculator_utility.getOptionReturn(option.premium, option.collateral));
		option.option_arr = Number(calculator_utility.getOptionARRReturn(option.date_opened, option.date_of_expiry, option.premium, option.collateral));
		
		option.save()
		.then((savedOption) => res.json({
			message: 'Option updated successfully !',
			optionId: savedOption._id
		}))
		.catch(err => res.status(400).json('Error'+err));
	})
	.catch(err => res.status(400).json('Error'+err));
});


// delete option
router.route('/option/:id').delete((req, res) => {
	Option.findByIdAndDelete(req.params.id)
	.then(() =>res.json('Option deleted !!'))
	.catch(err => res.status(400).json('Error'+err));
});


module.exports = router;
