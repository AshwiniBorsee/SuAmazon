const express = require('express');
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');

const router = express.Router();

router.route('/payment/process').post(processPayment);
module.exports = router;