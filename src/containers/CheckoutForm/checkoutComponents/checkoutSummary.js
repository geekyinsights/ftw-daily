import React, { useEffect, useState } from 'react';
import { getSummaryProducts } from '../checkoutUtils';
import css from './summary.css';
export const CheckoutSummary = props => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setProducts(props.cartProducts);
    setTotal(props.cartTotal);
  }, [props.cartTotal, props.cartProducts]);
  return (
    <div>
      <h3>Your order</h3>
      {products.map(product => (
        <SummaryProduct {...product} key={product.id} />
      ))}

      <h3>Total:{total}$</h3>
    </div>
  );
};

const SummaryProduct = props => {
  console.log(props);
  return (
    <div className={css.summaryProductWrapper}>
      <div className={css.imageWrapper}>
        {props.images[0] && (
          <div
            className={css.productImage}
            style={{ backgroundImage: 'url(' + props.images[0].url_thumbnail + ')' }}
          />
        )}
      </div>
      <div>
        <h4 className={css.title}>{props.name}</h4>
        <h4 className={css.price}>{props.price}$</h4>
      </div>
    </div>
  );
};
