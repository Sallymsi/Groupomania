const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.json());

// Evite les bloquage CORS en autorisant les entêtes :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app
