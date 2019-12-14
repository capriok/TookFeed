const router = require('express').Router()
let User = require('../models/user.model.js')
let authMiddleware = require('../middleware/auth')
// let data = require('../../client/src/components/AccModal/Login/login.js')

router.route('/').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/register').post((req, res) => {
	const username = req.body.username
	const password = req.body.password
	let today = new Date().toLocaleDateString()
	const joined = today
	const rand = Math.floor(Math.random(5) * 100)
	const seed = rand
	const newUser = new User({ username, password, joined, seed })

	newUser
		.save()
		.then(() => res.json('Account Created!'))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/login').post(async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findByCredentials(username, password)
		if (!user) {
			return res
				.status(401)
				.send({ error: 'Login failed! Check authentication credentials' })
		}
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (error) {
		res.status(400).send(error)
	}
})

router.route('/update').post(async (req, res) => {
	const id = req.body.id
	const edit = req.body.username
	console.log('Edit to =>', edit);
	try {
		const doc = await User.findByIdAndUpdate(id)
		doc.username = edit;
		await doc.save();
		console.log('Edit successful')
	} catch (error) {
		console.log('No user by that ID.');
	}
})

router.route('/delete').post(async (req, res) => {
	const id = req.body.id
	try {
		await User.findByIdAndRemove(id)
	} catch (error) {
		console.log('No user by that ID.');
	}
})

module.exports = router
