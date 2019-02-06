const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_roles', (err, rows, fields) => {
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
    const query = 'SELECT * FROM ff_roles where id_rol = ?';

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ status: 'Role not found' });
            }
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', (req, res) => {
    const { nombre_rol } = req.body;
    const query = `INSERT INTO ff_roles ('nombre_rol') VALUES ('?');`;
    const values = [nombre_rol];

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Role created' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_rol } = req.body;
    const query = `UPDATE ff_roles SET nombre_rol = '?' WHERE id_rol = ?`;
    const setvalues = [nombre_rol, id];

    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Role updated' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM ff_roles WHERE id_rol = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Role deleted' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;