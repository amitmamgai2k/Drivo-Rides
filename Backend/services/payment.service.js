const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');

require('dotenv').config();


Cashfree.XClientId = process.env.PAYMENT_CLIENT_ID;
Cashfree.XClientSecret = process.env.PAYMENT_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const generateOrderId = () => {
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256');
  hash.update(uniqueId);
  const orderId = hash.digest('hex');
  return orderId.substr(0, 12);
};


const createPaymentSession = async (price) => {
  const orderId = generateOrderId();

  const request = {
    order_amount: price,
    order_currency: 'INR',
    order_id: orderId,
    customer_details: {
      customer_id: 'webcodder01',
      customer_phone: '9999999999',
      customer_name: 'Web Codder',
      customer_email: 'webcodder@example.com',
    },
  };

  try {
    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating payment session');
  }
};


const verifyPayment = async (orderId) => {
  try {
    const response = await Cashfree.PGOrderFetchPayments('2023-08-01', orderId);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error verifying payment');
  }
};

module.exports = {
  createPaymentSession,
  verifyPayment,
};
