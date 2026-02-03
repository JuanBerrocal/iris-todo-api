const express = require("express");
const router = express.Router();
const pool = require('../db');

router.get("/test", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ok: true, dbTime: result.rows[0]});
    }
    catch (error) {
        res.status(500).json({ok: false, error: error.message});
    }
});

module.exports = router;