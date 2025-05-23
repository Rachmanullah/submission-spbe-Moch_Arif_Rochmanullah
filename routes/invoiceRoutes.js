const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { HandlerGetInvoice } = require('../controllers/invoiceController');
const router = express.Router();
router.get('/', verifyToken, HandlerGetInvoice);
module.exports = router;