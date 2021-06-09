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
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/cartRouter'))

// Admin Routes
app.use('/api', require('./routes/admin/authRouterAd'))


// connect db
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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