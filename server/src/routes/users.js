const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_usuarios', (err, rows, fields) => {
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
    const query = 'SELECT * FROM ff_usuarios where id_usuario = ?';

    mysqlConnection.query(query, [id], (err, rows, fields) => {
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
router.post('/', (req, res) => {
    const { id_empresa, id_rol, nombres, apellidos, email, password, direccion, celular } = req.body;
    const query = `INSERT INTO ff_usuarios 
    ('id_empresa', 'id_rol', 'nombres', 'apellidos', 
    'email', 'password', 'direccion', 'celular') 
    VALUES ('?', '?', '?', '?', '?', '?', '?', '?');`;
    const values = [id_empresa, id_rol, nombres, apellidos, email, password, direccion, celular];

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User created' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_empresa, id_rol, nombres, apellidos, email, password, direccion, celular } = req.body;
    const query = `UPDATE ff_usuarios SET id_empresa = '?', id_rol = '?', 
                  nombres = '?', apellidos = '?', email = '?', password = '?', 
                  direccion = '?', celular = '?' WHERE id_usuario = ?`;
    const setvalues = [id_empresa, id_rol, nombres, apellidos, email, password, direccion, celular, id];

    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User updated' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM ff_usuarios WHERE id_usuario = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User deleted' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;