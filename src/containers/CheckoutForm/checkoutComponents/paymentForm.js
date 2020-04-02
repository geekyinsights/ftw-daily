import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { processPayment, finishOrder } from '../checkoutUtils';
import css from '../checkout.css';
const PaymentHandler = props => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [shippingInfo, setShippingInfo] = useState(props.shippingInfo);
  const [orderInfo, setOrderInfo] = useState(props.orderInfo);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setShippingInfo(props.shippingInfo);
    setOrderInfo(props.orderInfo);
  }, [props.shippingInfo]);
  const handleChange = event => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    let errors = checkErrors();
    if (result.error) {
      setError(result.error.message);
    }
    if (errors) {
      props.onFormError(errors);
    }
    if (!result.error && !errors) {
      setError(null);
      console.log('TRYING', window.LeadDyno);

      const payment = await processPayment(
        result.token.id,
        props.cartTotal,
        shippingInfo,
        orderInfo
      );
      window.LeadDyno.recordPurchase(
        shippingInfo.email,
        { purchase_amount: props.cartTotal },
        function() {}
      );
      finishOrder();
      props.onPaymentDone(payment);
    }
    setProcessing(false);
  };

  const checkErrors = () => {
    let errorMap = {};
    if (!shippingInfo.name) errorMap.name = true;
    if (!shippingInfo.email) errorMap.email = true;
    if (!shippingInfo.city) errorMap.city = true;
    if (!shippingInfo.line1) errorMap.line1 = true;
    if (!shippingInfo.state) errorMap.state = true;
    if (!shippingInfo.country) errorMap.country = true;
    if (!shippingInfo.postal_code) errorMap.zip = true;
    if (Object.keys(errorMap).length === 0 && errorMap.constructor === Object) return null;

    return errorMap;
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div class="form-row">
        <label for="card-element">Credit or debit card</label>
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        <div className={css.errorLabel} role="alert">
          {error}
        </div>
      </div>

      <button type="submit" className={css.checkoutSubmit} disabled={processing}>
        {processing ? 'Processing' : 'Place order'}
      </button>
    </form>
  );
};

export const PaymentForm = props => {
  const [shippingInfo, setShippingInfo] = useState(props.shippingInfo);
  const [orderInfo, setOrderInfo] = useState(props.orderInfo);
  useEffect(() => {
    setShippingInfo(props.shippingInfo);
    setOrderInfo(props.orderInfo);
  }, [props.shippingInfo]);
  const stripeInit = loadStripe('pk_live_mYCnHHQJx8KCQ8ZKqjisOSvc');

  return (
    <Elements stripe={stripeInit}>
      <PaymentHandler {...props} shippingInfo={shippingInfo} orderInfo={orderInfo} />
    </Elements>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
    hidePostalCode: true,
  },
};
