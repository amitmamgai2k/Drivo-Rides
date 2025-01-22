const paymentService = require('../services/payment.service');

/**
 * Handle payment session creation
 * @param {object} req Request object
 * @param {object} res Response object
 */
const createPaymentSession = async (req, res) => {
  try {
    const paymentSession = await paymentService.createPaymentSession();
    res.status(200).json(paymentSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handle payment verification
 * @param {object} req Request object
 * @param {object} res Response object
 */
const verifyPayment = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    const paymentDetails = await paymentService.verifyPayment(orderId);
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentSession,
  verifyPayment,
};
