const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_pedidos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json(data);
});

// Get one
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    mysqlConnection.query('SELECT * FROM ff_pedidos where id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// Insert
router.post('/', (req, res) => {
    const { observacion } = req.body;

    mysqlConnection.query('INSERT INTO ff_pedidos SET() VALUES(?)', [observacion], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order saved'});
        } else {
            console.log(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { observacion } = req.body;
    const { id } = req.params;
    
    mysqlConnection.query('UPDATE ff_pedidos SET observacion = ? WHERE id_pedido = ?', [observacion, id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order updated'});
        } else {
            console.log(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    mysqlConnection.query('DELETE FROM ff_pedidos WHERE id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;