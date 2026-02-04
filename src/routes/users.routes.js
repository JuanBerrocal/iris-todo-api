const express = require("express");
const router = express.Router();
const {getUsers} = require('../controllers/users.controller');

/**
 * @openapi
 * /api/users/getusers:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                      type: object
 */
router.get('/getusers', getUsers);

module.exports = router;

