const { getProducts, processPayment } = require('./paymentUtils');

const getSkus = async (req, res) => {
  try {
    res.send(await getProducts());
  } catch (e) {
    console.log('Error getting SKUs', e);

    res.send(e);
  }
};

const payOrder = async (req, res) => {
  try {
    res.send(
      await processPayment(
        req.body.token,
        req.body.amount,
        req.body.shippingInfo,
        req.body.orderInfo
      )
    );
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  getSkus,
  payOrder,
};
