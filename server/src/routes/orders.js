const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', async (req, res) => {
    await mysqlConnection.query('SELECT * FROM ff_pedidos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Get one
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    await mysqlConnection.query('SELECT * FROM ff_pedidos where id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', async (req, res) => {
    const { observacion } = req.body;

    await mysqlConnection.query('INSERT INTO ff_pedidos SET() VALUES(?)', [observacion], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order saved'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', async (req, res) => {
    const { observacion } = req.body;
    const { id } = req.params;
    
    await mysqlConnection.query('UPDATE ff_pedidos SET observacion = ? WHERE id_pedido = ?', [observacion, id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order updated'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    await mysqlConnection.query('DELETE FROM ff_pedidos WHERE id_pedido = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order deleted'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;