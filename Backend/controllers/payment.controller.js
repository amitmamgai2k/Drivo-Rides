
const paymentService = require('../services/payment.service');
const Payment = require('../models/payment.model');
const Ride = require('../models/ride.model');


const createPaymentSession = async (req, res) => {
  try {
    const { price } = req.body;
    const paymentSession = await paymentService.createPaymentSession(price);
    res.status(200).json(paymentSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, rideId } = req.body;
  console.log("Received Order ID:", orderId, "Ride ID:", rideId);

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }
  if (!rideId) {
    return res.status(400).json({ error: "Ride ID is required" });
  }

  try {
    const paymentDetails = await paymentService.verifyPayment(orderId);
    if (!Array.isArray(paymentDetails) || paymentDetails.length === 0) {
      return res.status(404).json({ error: "No payment records found." });
    }

    const payment = paymentDetails[0];
    console.log("Extracted Payment Data:", payment);

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found." });
    }

    ride.orderID = orderId;
    await ride.save();

    let paymentMethod = "UNKNOWN";
    let upiId = null;

    if (typeof payment.payment_method === "string") {
      paymentMethod = payment.payment_method;
    } else if (typeof payment.payment_method === "object") {
      paymentMethod = Object.keys(payment.payment_method)[0];

      if (paymentMethod === "upi" && payment.payment_method.upi) {
        upiId = payment.payment_method.upi.upi_id;
      }
    }

    const newPayment = new Payment({
      orderId: payment.order_id,
      paymentId: payment.cf_payment_id,
      rideId: rideId,
      userId: ride.user,
      captainId: ride.captain,
      amount: payment.order_amount,
      paymentMethod: paymentMethod,
      upiId: upiId,
      paymentStatus: payment.payment_status,
      bankReference: payment.bank_reference || null,
      gatewayName: payment.payment_gateway_details.gateway_name || null,
      paymentTime: payment.payment_time,
      completionTime: payment.payment_completion_time || null,
    });

    await newPayment.save();
    console.log("Payment saved successfully:", newPayment);

    res.status(200).json({ success: true, message: "Payment verified and saved", payment: newPayment });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



module.exports = {
  createPaymentSession,
  verifyPayment,
};
