require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const connectDB = require('./config/db');

const app = express();
let gfs;
//Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World');
});


//Define Routes
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/seguimiento', require('./routes/api/seguimiento'));
app.use('/api/orgs', require('./routes/api/orgs'));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });	
