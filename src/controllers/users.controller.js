const pool = require ('../db');

// GET /api/users
// Controller to get all users.
const getUsers = async (req, res) => {

    try {
        const result = await pool.query('SELECT id, name, email, role, created from users');
        res.json({ok: true, users: result.rows});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ok: false, error: error.message});
    }
}

// GET /api/users/:id
// Controller to get one user by id
const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query('SELECT id, name, email, role, created FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ok: false, message: "User not found"});
        }
        res.json({ok: true, user: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ok: false, error: error.message});
    }
}

// POST /api/users
// Controller to create one user
const createUser = async (req, res) => {
    const bcrypt = require('bcrypt')
    const {name, email, password, role} = req.body;
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created',
            [name, email, hashedPassword, role || 'user']
        );
        res.status(201).json({ok: true, user: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ok: false, error: error.message});
    } 
}

// PUT /api/users/:id
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users
             SET name = $1, email = $2, role = $3
             WHERE id = $4
             RETURNING id, name, email, role, created`,
            [name, email, role, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ ok: false, message: 'User not found' });

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};



