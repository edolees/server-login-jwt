const router = require('express').Router();
const r = require('../config/rethink');

router.post('/', async (req, res) => {
	r.insertUser('users', [
		{ name: 'priviet', age: 26 },
		{ name: 'test2', age: 25 },
	]).then(data => res.json(data));
});

module.exports = router;
