import React, { useState, useEffect } from 'react';

import { StripeFormWizard } from './stripeFormWizard';
import TopbarContainer from '../TopbarContainer/TopbarContainer';

const CheckoutForm = props => {
  return (
    <div style={{ overflowY: 'hidden' }}>
      <TopbarContainer />
      <StripeFormWizard />
    </div>
  );
};

CheckoutForm.displayName = 'CheckoutPage';

export default CheckoutForm;
