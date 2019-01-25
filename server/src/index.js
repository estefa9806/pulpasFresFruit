const express = require('express');
const app = express();
const pulpsRoutes = require('./routes/pulps.js');

// Setthings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(pulpsRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server running on port ' , app.get('port'));
});