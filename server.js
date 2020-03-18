
// REQUIRES
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// EXPRESS APP CONFIG
const app = express();
const PORT = process.env.PORT || 8080;

// STATIC PATH
app.use(express.static(path.join(__dirname, './app/public')));

// MIDDLEWARE 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// APP ROUTES
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// PORT LISTENING
app.listen(PORT, function () {
    console.log('Listening on PORT: ' + PORT);
});
