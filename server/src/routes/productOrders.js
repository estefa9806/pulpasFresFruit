const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_productopedido', (err, rows, fields) => {
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
    
    mysqlConnection.query('SELECT * FROM ff_productopedido where id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', (req, res) => {
    const { id_producto, id_pedido, cantidad } = req.body;
    const query = `INSERT INTO ff_productopedido SET('id_pedido','id_producto','cantidad') VALUES('?','?','?')`;
    const values = [id_producto, id_pedido, cantidad];                 

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Product Order created'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { id_producto, id_pedido, cantidad } = req.body;
    const { id } = req.params;
    const query = `UPDATE ff_productopedido SET id_producto = '?', id_pedido = '?', 
                    cantidad = '?' WHERE id_pedido = ?`;
    const setvalues = [id_producto, id_pedido, cantidad, id];                
    
    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Product Order updated'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    mysqlConnection.query('DELETE FROM ff_productopedido WHERE id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Product Order deleted'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;