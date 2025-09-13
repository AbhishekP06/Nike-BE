const express = require('express'); // Importing express
const app = express(); // Creating an express app
const cors = require("cors");

const allowedOrigins = [
    'https://nike-fe-bice.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

//body parser
app.use(express.json());
require("dotenv").config();
const connectDB = require('./db');
const product = require('./productRoute');
const shoeType = require('./shoeRoute');
const user = require('./userRoute');
const checkoutRoute = require('./checkoutRoute');

connectDB();

// Create a route that sends a response when visiting the homepage

app.use('/products', product);
app.use('/spotlight', shoeType);
app.use('/user', user);
app.use('/payment', checkoutRoute);

app.get('/', (req, res) => {
    res.send('<h1>Hello, Shoe Server!</h1>');
});

// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});