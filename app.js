const express = require('express');
const exphbs = require('express-handlebars');
const compression = require('compression');

require('dotenv').config();
const db = require('./server/db');

db.authenticate().then(() => console.log('Database connected'));

const app = express();
const port = process.env.PORT || 5000;

// Parse application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// static files
app.use(express.static('public'));

// Templeting engines
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
