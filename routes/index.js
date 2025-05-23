const express = require('express');
const router = express.Router();

const AuthorRoutes = require('./authorRoutes');
const BookRoutes = require('./bookRoutes');
const BookProductRoutes = require('./bookProductRoutes');
const WarehouseRoutes = require('./warehouseRoutes');
const CustomerRoutes = require('./customerRoutes');
const CartRoutes = require('./cartRoutes');
const InvoiceRoutes = require('./invoiceRoutes');

router.use('/author', AuthorRoutes);
router.use('/books', BookRoutes);
router.use('/bookProduct', BookProductRoutes);
router.use('/warehouse', WarehouseRoutes);
router.use('/customer', CustomerRoutes);
router.use('/auth', CustomerRoutes);
router.use('/cart', CartRoutes);
router.use('/checkout', CartRoutes);
router.use('/invoices', InvoiceRoutes);

module.exports = router;