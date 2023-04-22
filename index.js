const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const db = mongoose.connection;

const corsAnywhere = require('cors-anywhere');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const Port = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "there is no fate but what we make for ourselves",
    resave: true,
    saveUninitialized: true
}));

app.use(cors(
    {
        origin: ['*']
    }
));

app.use(morgan('dev'));

const songsController = require('./controllers/songs.js');
app.use('/songs', songsController);

const favoritesController = require('./controllers/favorites.js');
app.use('/favorites', favoritesController);

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

const corsProxy = corsAnywhere.createServer({
    originWhitelist: ['http://localhost:3000', 'https://musicapp-3xgy.onrender.com/'], 
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

app.use('/proxy', (req, res) => {
    req.url = req.url.replace('/proxy/', '/');
    corsProxy.emit('request', req, res);
});

app.listen(Port, () => {
    console.log('listening on port', Port);
});