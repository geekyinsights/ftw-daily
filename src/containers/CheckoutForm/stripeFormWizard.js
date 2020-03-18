import React, { useReducer, useEffect, useState } from 'react';
import { getSummaryProducts, getProductIdsFromStorage } from './checkoutUtils';
import css from './checkout.css';
import { CheckoutSummary } from './checkoutComponents/checkoutSummary';
import { PaymentForm } from './checkoutComponents/paymentForm';
import { CheckoutDone } from './checkoutComponents/checkoutDone';
import { CheckoutEmpty } from './checkoutComponents/checkoutEmpty';
export const StripeFormWizard = props => {
  const [formState, dispatch] = useReducer(stateReducer, initialOrderState);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  const [checkoutFinished, setCheckoutFinished] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [errorKeys, setErrorKeys] = useState({});
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
  const isEmpty = getProductIdsFromStorage().length === 0;
  const { email, name, city, line1, state, country, postal_code } = formState;

  const onChange = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  if (isEmpty && !checkoutFinished) return <CheckoutEmpty />;
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
                <div className={css.formField}>
                  <input
                    name="email"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={email}
                    placeholder="Email"
                  />
                  {errorKeys.email && <span className={css.errorLabel}>Email is required</span>}
                </div>

                <div className={css.formField}>
                  <input
                    name="name"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={name}
                    placeholder="Name"
                  />
                  {errorKeys.name && <span className={css.errorLabel}>Name is required</span>}
                </div>
              </div>

              <div className={css.checkoutSection}>
                <h4>Shipping adress</h4>
                <div className={css.formField}>
                  <input
                    name="city"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={city}
                    placeholder="City"
                  />
                  {errorKeys.city && <span className={css.errorLabel}>City is required</span>}
                </div>
                <div className={css.formField}>
                  <input
                    name="line1"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={line1}
                    placeholder="Line"
                  />
                  {errorKeys.line1 && <span className={css.errorLabel}>Line1 is required</span>}
                </div>
                <div className={css.formField}>
                  <input
                    name="state"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={state}
                    placeholder="State"
                  />
                  {errorKeys.state && <span className={css.errorLabel}>State is required</span>}
                </div>
                <div className={css.formField}>
                  <input
                    name="country"
                    className={css.checkoutField}
                    onChange={onChange}
                    value={country}
                    placeholder="Country"
                  />
                  {errorKeys.country && <span className={css.errorLabel}>Country is required</span>}
                </div>
                <div className={css.formField}>
                  <input
                    className={css.checkoutField}
                    name="postal_code"
                    onChange={onChange}
                    value={postal_code}
                    placeholder="ZIP code"
                  />
                  {errorKeys.zip && <span className={css.errorLabel}>Zip Code is required</span>}
                </div>
              </div>
              <div className={css.checkoutSection}>
                <h4>Payment method</h4>
                <PaymentForm
                  cartTotal={cartTotal}
                  shippingInfo={formState}
                  orderInfo={orderInfo}
                  onFormError={errorMap => setErrorKeys(errorMap)}
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
