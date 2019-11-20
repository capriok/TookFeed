const router = require('express').Router()
let User = require('../models/user.model.js')
let authMiddleware = require('../middleware/auth')
// let data = require('../../client/src/components/AccModal/Login/login.js')

router.route('/').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
	const username = req.body.username
	const password = req.body.password

	const newUser = new User({ username, password })

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

router.route('/protected').get(authMiddleware, (req, res) => {
	console.log(req.user.username + ' is authenticated')
})

module.exports = router
