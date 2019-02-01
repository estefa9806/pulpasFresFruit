const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', async (req, res) => {
    await mysqlConnection.query('SELECT * FROM ff_usuarios', (err, rows, fields) => {
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
    const query = 'SELECT * FROM ff_usuarios where id_usuario = ?';

    await mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {            
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ status: 'User not found' });
            }
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', async (req, res) => {
    const { observacion } = req.body;
    const query = `INSERT INTO ff_usuarios 
    ('id_empresa', 'id_rol', 'nombres', 'apellidos', 
    'email', 'password', 'direccion', 'celular') 
    VALUES ('?', '?', '?', '?', '?', '?', '?', '?');`;

    await mysqlConnection.query(query, [observacion], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User saved' });
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
    const query = 'UPDATE ff_usuarios SET observacion = ? WHERE id_usuario = ?';

    await mysqlConnection.query(query, [observacion, id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User updated' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await mysqlConnection.query('DELETE FROM ff_usuarios WHERE id_usuario = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User deleted' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;