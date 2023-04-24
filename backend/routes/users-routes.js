const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
// const fileUpload = require('../middleware/file-upload');
const upload = require('../middleware/upload1');
const singleUpload = require('../middleware/multer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password given by user
 *       example:
 *         name: Ayush Singla
 *         email: ayush.s20@iiits.in
 *         password: password_0.0
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/users/getPost:
 *   get:
 *     summary: Get post by id
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The book description
 */

/**
 * @swagger
 * /api/users/deletePost/{id}:
 *   delete:
 *     summary: Delete an user
 *     tags: [Post]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 * 
 *     responses:
 *       200:
 *         description: User successfully deleted4
 *       404:
 *         description: no such user
 *       500:
 *         description: Internal server error
 */

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  upload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);
router.get('/userDetails/:email', usersController.getUser);
router.post('/copy-order', usersController.sendCopy);

router.post('/uploadpost',singleUpload ,usersController.postCreate);
router.get('/getPost', usersController.getPost);
router.delete('/deletePost/:id', usersController.deletePost);
router.post('/addSubscription', usersController.addSubscription);
router.get('/getSubscriptions', usersController.getSubscriptions);


module.exports = router;
