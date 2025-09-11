const express = require('express'); // Importing express
const app = express(); // Creating an express app
const cors = require("cors");

app.use(cors({
    origin: "*", // Allow all origins (not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
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