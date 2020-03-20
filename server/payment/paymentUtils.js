const _stripe = require('stripe')('sk_live_DulBDBWnE5noYoS0l1wbRbp100bnMSJcmy');

const getStripeInstance = () => _stripe;

const processPayment = async (token, amount, shippingInfo, orderInfo) => {
  try {
    const charge = await getStripeInstance().charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: shippingInfo.name + '_' + new Date().getTime(),
      source: token,
      metadata: orderInfo,
      receipt_email: shippingInfo.email,
      shipping: {
        address: {
          line1: shippingInfo.line1,
          city: shippingInfo.city,
          postal_code: shippingInfo.postal_code,
          state: shippingInfo.state,
        },
        name: shippingInfo.name,
      },
    });
    return charge;
  } catch (e) {
    return e;
  }
};
const getProducts = async () => {
  return await getStripeInstance().skus.list();
};
module.exports = {
  getStripeInstance,
  getProducts,
  processPayment,
};
