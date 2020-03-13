import React, { useState, useEffect } from 'react';
import { Page } from '../../components';
import { getProductIdsFromStorage, getCartData } from './checkoutUtils';
import { UserData } from './UserData';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

const CheckoutForm = props => {
  const [productIds, setProductIds] = useState([]);
  useEffect(() => {
    const productIds = getProductIdsFromStorage();
    getCartData(productIds).then(cartData => console.log(cartData));
    setProductIds(productIds);
  }, []);
  const service = createCheckoutService();
  const initCheckout = async () => {
    // The checkout ID ideally would be retrieved from the storefront API, since we don't have access we can't create it
    const checkoutId = '';
    await service.loadCheckout(checkoutId);
    const state = await service.continueAsGuest({ email: 'test@gmail.com' });
    console.log('STATE', state);
  };

  return (
    <div style={{ width: '40%', margin: 'auto' }}>
      <UserData />
      {productIds.map(id => (
        <h3>Product ID:{id}</h3>
      ))}
      <button>Checkout</button>
    </div>
  );
};

CheckoutForm.displayName = 'CheckoutPage';

export default CheckoutForm;
