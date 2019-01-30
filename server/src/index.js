const express = require('express');
const app = express();
const morgan = require('morgan');
const ordersRoutes = require('./routes/orders.js');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use('/api/orders', ordersRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server running on port ' , app.get('port'));
});