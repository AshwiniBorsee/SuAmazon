const asyncErrorHandle = require('../middlewares/asyncErrorHandler');
const secureHttp = require('https');
const PaymentModel = require('../models/paymentModel');
const ErrorHandle = require('../utils/errorHandler');
const { v4: uniqueId } = require('uuid');
const ProductModel = require('../models/productModel');

// Process Payment
exports.processPayment = asyncErrorHandle(async (request, response, next) => {

    const { totalAmount, userEmail, userPhone, orderItems } = request.body;

    const orderIdentity = "oid" + uniqueId();

    const paymentSuccess = totalAmount <= 100000000;
    console.log(orderItems);
    if (true) {
       // Simulate adding payment to the database
       orderItems.forEach(async (item) => {
            const productItem = await ProductModel.findById(item.product);
            productItem.stock -= item.quantity;
            await productItem.save({ validateBeforeSave: false });
        });


        response.status(200).json({
            success: paymentSuccess,
            orderIdentity: orderIdentity,
            message: "Payment processed successfully",
        });
        
    } else {
        response.status(400).json({ error: "Payment Failed" });
    }
});

const simulatePayment = async (paymentData) => {
    try {
        console.log("Payment Successful!");

    } catch (error) {
         console.log("Payment Failed!");
    }
    //updateStock
}

exports.getPaymentStatus = asyncErrorHandle(async (request, response, next) => {

    const paymentRecord = await PaymentModel.findOne({ orderId: request.params.id });

    if (!paymentRecord) {
        return next(new ErrorHandle("Payment Details Not Found", 404));
    }

    const transaction = {
        id: paymentRecord.transactionId,
        status: paymentRecord.resultInformation.resultStatus,
    }

    response.status(200).json({
        success: true,
        transaction,
    });
});
