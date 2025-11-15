const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesControllers');
const { verifyToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const {
  createSaleSchema,
  updateSaleSchema,
} = require('../validators/salesValidators');

router.use(verifyToken);

router.get('/chart/data', salesController.getChartData);

router.get('/summary', salesController.getSummary);

router.post(
  '/',
  validate(createSaleSchema),
  salesController.createSale
);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.put(
  '/:id',
  validate(updateSaleSchema),
  salesController.updateSale
);

router.delete('/:id', salesController.deleteSale);

router.delete('/all/deleteAll', salesController.deleteAllSales);

module.exports = router;