const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Juan Berrocal
 *         email:
 *           type: string
 *           example: juan@email.com
 *         role:
 *           type: string
 *           enum: [superuser, user]
 *           example: user
 *         created:
 *           type: string
 *           format: date-time
 *           example: 2026-02-05T10:30:00Z
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Juan Berrocal
 *         email:
 *           type: string
 *           example: juan@email.com
 *         password:
 *           type: string
 *           example: mySecurePassword123
 *         role:
 *           type: string
 *           enum: [superuser, user]
 *           example: user
 */

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management endpoints
 */


/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all registered users (password excluded).
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers);


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUserById);


/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user and hashes the password before saving.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already exists or validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', createUser);


/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Updates name, email or role of a user (password not included here).
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Updated
 *               email:
 *                 type: string
 *                 example: updated@email.com
 *               role:
 *                 type: string
 *                 enum: [superuser, user]
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateUser);


/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Permanently deletes a user from the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteUser);


module.exports = router;

