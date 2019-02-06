const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');

// Get all
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ff_empresas', (err, rows, fields) => {
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
    const query = 'SELECT * FROM ff_empresas where id_empresa = ?';

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ status: 'Company not found' });
            }
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Insert
router.post('/', (req, res) => {
    const { razon_social, nit, telefono } = req.body;
    const query = `INSERT INTO ff_empresas ('razon_social', 'nit', 'telefono') VALUES ('?', '?', '?');`;
    const values = [razon_social, nit, telefono];

    mysqlConnection.query(query, values, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Company created' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { razon_social, nit, telefono } = req.body;
    const query = `UPDATE ff_empresas SET razon_social = '?', nit = '?', 
                    telefono = '?' WHERE id_empresa = ?`;
    const setvalues = [razon_social, nit, telefono, id];

    mysqlConnection.query(query, setvalues, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Company updated' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM ff_empresas WHERE id_empresa = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Company deleted' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;