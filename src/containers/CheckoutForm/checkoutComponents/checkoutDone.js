import React from 'react';
import css from './checkoutDone.css';
export const CheckoutDone = props => {
  const { paymentData } = props;
  console.log(paymentData);
  return (
    <div className={css.doneWrapper}>
      <div className={css.doneContainer}>
        <div className={css.svgContainer}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check-circle"
            className={css.doneIcon}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
            ></path>
          </svg>
        </div>
        <h2>Your payment has been processed.</h2>
        <h5 className={css.doneText}>
          Thanks for your purchase {paymentData.shipping.name}, your receipt ID is{' '}
          <strong>{paymentData.id}</strong>. We will send you a confirmation to{' '}
          <strong>{paymentData.receipt_email}</strong>
        </h5>
        <div className={css.optionsWrapper}>
          <button className={css.action}>
            <a href={paymentData.receipt_url} target="_blank">
              Get Receipt
            </a>
          </button>
          <button className={css.action}>Go Home</button>
        </div>
      </div>
    </div>
  );
};
