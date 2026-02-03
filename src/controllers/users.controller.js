const pool = require ('../db');

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

module.exports = {getUsers}