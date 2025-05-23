const express = require('express');
const { HandlerGetAllAuthor, HandlerAuthorByID, HandlerCreateAuthor, HandlerUpdateAuthor, HandlerDeleteAuthor } = require('../controllers/authorController');
const router = express.Router();
router.get('/', HandlerGetAllAuthor);
router.get('/:authorID', HandlerAuthorByID);
router.post('/', HandlerCreateAuthor);
router.put('/:authorID', HandlerUpdateAuthor);
router.delete('/:authorID', HandlerDeleteAuthor);
module.exports = router;