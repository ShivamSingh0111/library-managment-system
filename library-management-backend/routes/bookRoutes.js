const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { validateBookMiddleware } = require('../middlewares/validationMiddleware');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBookMiddleware, createBook);
router.put('/:id', validateBookMiddleware, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;