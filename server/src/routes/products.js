const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_productos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Get one
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM ff_productos where id_producto = ?';

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ status: 'Product not found' });
            }
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', (req, res) => {
    const { nombre_producto, in_stock } = req.body;
    const query = `INSERT INTO ff_productos ('nombre_producto', 'in_stock') VALUES ('?', '?');`;
    const values = [nombre_producto, in_stock];

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product created' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_producto, in_stock } = req.body;
    const query = `UPDATE ff_productos SET nombre_producto = '?', in_stock = '?' WHERE id_producto = ?`;
    const setvalues = [nombre_producto, in_stock, id];

    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product updated' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM ff_productos WHERE id_producto = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Product deleted' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;