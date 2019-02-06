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
            res.status(500).json(err);
        }
    });
});

// Get one
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    mysqlConnection.query('SELECT * FROM ff_pedidos where id_pedido = ?', [id], (err, rows, fields) => {
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
    const { numero_factura, id_usuario, observacion_pedido, despachado, precio_total, fecha_estimada } = req.body;
    const query = `INSERT INTO ff_pedidos SET('numero_factura','id_usuario',
                  'observacion_pedido','despachado','precio_total','fecha_estimada')
                  VALUES('?','?','?','?','?','?')`;
    const values = [numero_factura, id_usuario, observacion_pedido, despachado, precio_total, fecha_estimada];                 

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order created'});
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { numero_factura, id_usuario, observacion_pedido, despachado, precio_total, fecha_estimada } = req.body;
    const { id } = req.params;
    const query = `UPDATE ff_pedidos SET numero_factura = '?', id_usuario = '?', 
                observacion_pedido = '?', despachado = '?', precio_total = '?', 
                fecha_estimada = '?' WHERE id_pedido = ?`;
    const setvalues = [numero_factura, id_usuario, observacion_pedido, despachado, precio_total, fecha_estimada, id];                
    
    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Order updated'});
        } else {
            console.log(err);
            res.status(500).json(err);
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
            res.status(500).json(err);
        }
    });
});

module.exports = router;