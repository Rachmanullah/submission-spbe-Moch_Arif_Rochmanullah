const express = require('express');
const { HandlerGetCartByCustomerID, HandlerCreateItemCart, HandlerCheckout } = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();
router.get('/', verifyToken, HandlerGetCartByCustomerID);
router.post('/items', verifyToken, HandlerCreateItemCart);
router.post('/', verifyToken, HandlerCheckout);
module.exports = router;