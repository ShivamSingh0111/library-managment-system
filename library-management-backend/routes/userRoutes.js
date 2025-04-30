const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, login, borrowBook, returnBook } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', login);
router.post('/:id/borrow', borrowBook);
router.post('/:id/return', returnBook);

module.exports = router;