import React, { useReducer, useEffect, useState } from 'react';
import { getSummaryProducts } from './checkoutUtils';
import css from './checkout.css';
import { CheckoutSummary } from './checkoutComponents/checkoutSummary';
import { PaymentForm } from './checkoutComponents/paymentForm';
import { CheckoutDone } from './checkoutComponents/checkoutDone';
export const StripeFormWizard = props => {
  const [formState, dispatch] = useReducer(stateReducer, initialOrderState);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  const [checkoutFinished, setCheckoutFinished] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let calcTotal = 0;
        const products = await getSummaryProducts();
        const productMap = {};
        products.forEach((pr, i) => {
          productMap['PRODUCT-' + (i + 1)] = pr.id;
          calcTotal += pr.price;
        });

        setOrderInfo(productMap);

        setCartTotal(calcTotal);
        setCartProducts(products);
      } catch (e) {
        console.log('Error generating checkout summary', e);
      }
    })();
  }, []);
  const { email, name, city, line1, state, country, postal_code } = formState;

  const onChange = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  return (
    <>
      {checkoutFinished ? (
        <CheckoutDone paymentData={paymentData} />
      ) : (
        <div className={css.checkoutContainer}>
          <div className={css.checkoutWrapper}>
            <div className={css.checkoutForm}>
              <h2>Checkout</h2>
              <div className={css.checkoutSection}>
                <h4>Billing details</h4>
                <input
                  name="email"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={email}
                  placeholder="Email"
                />
                <input
                  name="name"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={name}
                  placeholder="Name"
                />
              </div>

              <div className={css.checkoutSection}>
                <h4>Shipping adress</h4>
                <input
                  name="city"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={city}
                  placeholder="City"
                />
                <input
                  name="line1"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={line1}
                  placeholder="Line"
                />
                <input
                  name="state"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={state}
                  placeholder="State"
                />
                <input
                  name="country"
                  className={css.checkoutField}
                  onChange={onChange}
                  value={country}
                  placeholder="Country"
                />
                <input
                  className={css.checkoutField}
                  name="postal_code"
                  onChange={onChange}
                  value={postal_code}
                  placeholder="ZIP code"
                />
              </div>
              <div className={css.checkoutSection}>
                <h4>Payment method</h4>
                <PaymentForm
                  cartTotal={cartTotal}
                  shippingInfo={formState}
                  orderInfo={orderInfo}
                  onPaymentDone={paymentData => {
                    setPaymentData(paymentData);
                    setCheckoutFinished(true);
                  }}
                />
              </div>
              {/*   <button onClick={() => submitOrder()} className={css.checkoutSubmit}>
            Place order
          </button> */}
            </div>
            <div className={css.checkoutSummary}>
              <CheckoutSummary cartTotal={cartTotal} cartProducts={cartProducts} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const stateReducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const initialOrderState = {
  currency: 'usd',
  email: '',
  items: [],
  name: '',
  city: '',
  line1: '',
  state: '',
  country: '',
  postal_code: '',
};
