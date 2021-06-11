require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api', require('./routes/auth.router'))
app.use('/api', require('./routes/category.router'))
app.use('/api', require('./routes/product.router'))
app.use('/api', require('./routes/cart.router'))

// Admin Routes
app.use('/api', require('./routes/admin/auth.admin.router'))


// connect db
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected mongodb')
})

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello from server"
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})