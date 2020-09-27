const router = require('express').Router();
const authorization = require('../middleware/authorization');
const UsersService = require('../data/userService');

router.get('/', authorization, async (req, res) => {
	const db = req.app.get('db');

	try {
		//req user has the payload
		UsersService.getById(db, req.user)
			.then(responseGetId => {
				res.json(responseGetId);
			})
			.catch(errorGetId => console.log(errorGetId));
	} catch (error) {
		console.log(error.message);
		res.status(500).json('Server Error');
	}
});

module.exports = router;
