const express = require('express')
const userRoutes = require('./routes/userRoute')
const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())

// log all the incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// login and signup user routes
app.use('/api/user', userRoutes)

// suppressing the warnings
mongoose.set('strictQuery', false);
// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // starting the server
        app.listen(port, () => {
            console.log('connected to db & listening on port', port)
        });
    })
    .catch((err) => {
        console.log(err)
    })

const db = mongoose.connection

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to the database:', db.name);
});

// routes
app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>')
})