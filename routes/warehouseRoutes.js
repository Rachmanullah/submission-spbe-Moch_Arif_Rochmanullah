const express = require('express');
const { HandlerGetAllWarehouse, HandlerWarehouseByID, HandlerCreateWarehouse, HandlerUpdateWarehouse, HandlerDeleteWarehouse } = require('../controllers/warehouseController');
const router = express.Router();
router.get('/', HandlerGetAllWarehouse);
router.get('/:warehouseID', HandlerWarehouseByID);
router.post('/', HandlerCreateWarehouse);
router.put('/:warehouseID', HandlerUpdateWarehouse);
router.delete('/:warehouseID', HandlerDeleteWarehouse);
module.exports = router;