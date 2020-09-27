const router = require('express').Router();
const r = require('../config/rethink');

const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
	try {
		//req user has the payload
		r.findById('users', req.user)
			.then(resId => {
				res.json(resId);
			})
			.catch(errorGetId => console.log(errorGetId));
	} catch (error) {
		console.log(error.message);
		res.status(500).json('Server Error');
	}
});

module.exports = router;
