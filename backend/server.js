require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const usersRoutes = require('./routes/Auth.js')
const transactionsRoutes = require('./routes/Transactions.js')

// Express App
const app = express()

// Cors
app.use(cors());
app.use(
  cors({
    origin: "https://split-the-bills-eight.vercel.app/",
    methods: ['GET', 'DELETE', 'POST', 'PATCH'],
  })
)

// Middleware
app.use(express.json());       
app.use(express.urlencoded());
app.use(cookieParser());

// Routes
app.use('/api/users/', usersRoutes);
app.use('/api/transactions/', transactionsRoutes);


app.listen(process.env.PORT, () => {
    console.log("connected to db & listening on port", process.env.PORT);
})

module.exports = app;