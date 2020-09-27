const router = require('express').Router();
const bcrypt = require('bcryptjs');

const UsersService = require('../data/userService');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//register Route
router.post('/register', validInfo, async (req, res) => {
	const db = req.app.get('db');
	try {
		// destructure req.body(username,email,password)

		const { username, email, password } = req.body;

		//Bcrypt the user Password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const bcryptPassword = await bcrypt.hash(password, salt);
		const newUser = [
			{
				username: username,
				email: email,
				password: bcryptPassword,
			},
		];

		UsersService.getByEmail(db, email).then(responseEmail => {
			// check if user exists
			if (responseEmail) {
				return res.status(401).send('user Exists');
			}

			//Enter new User inside DB
			UsersService.insertUser(db, newUser)
				.then(responseInsert => {
					const token = jwtGenerator(responseInsert.id);
					res.json({ token });
				})
				.catch(errorInsert => {
					console.log(errorInsert.message);
					res.status(400).send('Something went wrong with insertion');
				})
				.catch(errorGetEmail => {
					console.log(errorGetEmail.message);
					res.status(400).send('Something went wrong with finding the user');
				});
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

router.post('/login', validInfo, async (req, res) => {
	const db = req.app.get('db');
	try {
		// destructure req.body(email,password)
		const { email, password } = req.body;

		//Getting Email
		UsersService.getByEmail(db, email)
			.then(async responseGetEmail => {
				//Checking if Email Exists
				if (!responseGetEmail) {
					return res.status(401).send('Password or Email incorrect');
				}
				//Validating Password
				const validPassword = await bcrypt.compare(
					password,
					responseGetEmail.password
				);
				//Checking if ValidPassword is True
				if (!validPassword) {
					return res.status(401).send('Password or Email incorrect');
				}

				const token = jwtGenerator(responseGetEmail.id);
				res.json({ token });
			})
			.catch(errorGetEmail => {
				console.log(errorGetEmail.message);
			});
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

router.get('/verify', authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
