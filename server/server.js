const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
//LOCAL SERVER IMPORTING LOGIN DATA, ERROR REACT (TRY)
// const login = require('../client/src/components/Login/login')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//CONNECT TO MONGODB
const uri =
	'mongodb+srv://Tooky:Californeyea7*@cluster0-fatnt.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
})
const connection = mongoose.connection
connection.once('open', () => {
	console.log('MongoDB connected successfully')
})

//ROUTES
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

// const featuresRouter = require('./routes/features')
// app.use('/features', featuresRouter)

//SERVER PORT LISTENER
app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
