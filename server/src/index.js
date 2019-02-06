// Modules
const express = require('express');
const app = express();
const morgan = require('morgan');

// Imports
const ordersRoutes = require('./routes/orders.js');
const usersRoutes = require('./routes/users.js');
const companiesRoutes = require('./routes/companies.js');
const rolesRoutes = require('./routes/roles.js');
const productsRoutes = require('./routes/products.js');
const productOrdersRoutes = require('./routes/productOrders.js');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/product-orders', productOrdersRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server running on port ' , app.get('port'));
});