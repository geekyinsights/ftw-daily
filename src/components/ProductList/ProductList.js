import React, { Component } from 'react';

import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import css from './ProductList.css';
import { getProductsByStoreHash } from '../../util/api/getProductsByStoreHash';
import { addProductIdToCart } from '../../containers/CheckoutForm/checkoutUtils';
import {
  NamedLink,
} from '../../components';
class ProductList extends Component {
  constructor(props) {
    super(props);
    console.log('GOING');
    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    this.state = {
      params: {},
      products: [],

      getProductAndSiteInfo: async params => {
        try {
          const { data } = await getProductsByStoreHash();

          return data;
        } catch (e) {
          throw e;
        }
      },
    };
  }

  componentDidMount() {
    // preform graphQL query with creds.
    // then run the setState and assign results as shown below.

    // It seems like the required parameters were supplied, try to load the product data from the Storefront API
    this.state
      .getProductAndSiteInfo(this.state.params)
      .then(data => {
        // With our data loaded, render the product listing
        console.log(data);
        this.setState({
          products: data,
        });
      })
      .catch(e => {
        // Some error was encountered
        console.log('Error getting products', e);
      });
  }

  render() {
    return (
      <div>
        {
          <div className={''}>
            <div className={css.productTitle}>
              <FormattedMessage id="SectionProducts.title" />
            </div>
            <div className={css.productsContainer}>
              {this.state.products.map((product, i) => {
                const productimage = product.images[0] ? product.images[0].url_zoom : '';
                const productname = product.name;
                const productprice = product.price;
                const productId = product.id;
                return (
                  <div className={css.card}>
                    <div className={css.cardImgTop}>
                      <div className={css.cardBody}>
                        <h5 className={css.cardTitle}> {productname}</h5>
                        <div className={css.cardImage}>
                          <img src={productimage} />
                        </div>
                        <h5 className={css.cardPrice}>{productprice}</h5>
                        <a
                          onClick={() => addProductIdToCart(productId)}
                          className={css.enquirySubmitButtonWrapper}
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
              
            </div>
           

          </div>
        }
      </div>
    );
  }
}
export default ProductList;

/*   */
