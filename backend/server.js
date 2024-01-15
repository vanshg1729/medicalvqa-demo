const cors = require('cors')
const path = require('path')
const express = require('express')
const userRoutes = require('./routes/userRoute')
const categoryRoutes = require('./routes/categoryRoute')
const tagRoutes = require('./routes/tagRoute')
const imageRoutes = require('./routes/imageRoute')
const questionRoutes = require('./routes/questionRoute')
const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.PORT || 5000;
const subpath = process.env.SUBPATH || '';
console.log(`Subpath: ${subpath}`);

const app = express()

app.use(express.json())
app.use(cors())

// log all the incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
    next()
})

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// login and signup user routes
app.use('{subpath}/api/user', userRoutes)

// Category routes
app.use('{subpath}/api/category', categoryRoutes)

// Tag routes
app.use('{subpath}/api/tag', tagRoutes)

// Image routes
app.use('{subpath}/api/image', imageRoutes)

// Question routes
app.use('{subpath}/api/question', questionRoutes)

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
