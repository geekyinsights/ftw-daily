import React, { useState, useEffect } from 'react';
import { Page } from '../../components';
import { getProductIdsFromStorage } from './checkoutUtils';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import { StripeFormWizard } from './stripeFormWizard';

const CheckoutForm = props => {
  const [productIds, setProductIds] = useState([]);
  useEffect(() => {
    const productIds = getProductIdsFromStorage();
    setProductIds(productIds);
  }, []);
  const service = createCheckoutService();

  return (
    <>
      <StripeFormWizard />
    </>
  );
};

CheckoutForm.displayName = 'CheckoutPage';

export default CheckoutForm;
