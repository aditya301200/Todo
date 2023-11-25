const express = require('express');
const dbConnect = require('./config/database')
const cors = require('cors');
require('dotenv').config();
const todoRoute = require('./routes/todoRoute')

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/todoApi/v1/', todoRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req,res) => {
    res.send("Hello World");
})

dbConnect();