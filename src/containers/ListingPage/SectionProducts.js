import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
   
import { NamedLink } from '../../components';
   
import css from './ListingPage.css';
   
import helsinkiImage from '../../assets/bestthing_smaller.png';
   
   
class ProductImage extends Component {
    render() {
       const { alt, ...rest } = this.props;
       return <img alt={alt} {...rest} />;
    }
   }
const LazyImage = lazyLoadWithDimensions(ProductImage);
   
const productLink = (name, image) => {
    const nameText = <span className={css.locationName}>{name}</span>;
    return (
       <NamedLink name="SearchPage" className={css.location}>
         <div className={css.imageWrapper}>
           <div className={css.aspectWrapper}>
             <LazyImage src={image} alt={name} className={css.productImage} />
           </div>
         </div>
         <div className={css.linkText}>
           <FormattedMessage
             id="SectionLocations.listingsInLocation"
             values={{ name: nameText}}
           />
         </div>
       </NamedLink>
     );
};

const state = {    
    //put api keys below
    //Accress token
    //client_id
  
};
  
  componentDidMount() {
      var data = JSON.stringify({});
  
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
  
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText); /// This is where I get the storefront key
  
  
        let params = {
            store_url: null,
            product_ids: null,
            token: null
        };
  
  
          /*
              API fetching
          */
         function getProductAndSiteInfo(params) {
            const storeUrl = new URL(params.store_url);
  
            // Use the store's canonical URL which should always resolve
            const graphQLUrl = `${storeUrl.origin}/graphql`;
  
            // Set up GraphQL query
            // If specific product IDs were supplied, fetch them, else just get the first few products
            const graphQLQuery = `
                query StaticSiteExample {
                  customer {
                    firstName
                    lastName
                    email
                  }
                          site {
                            products${params.product_ids ? `(entityIds:[${params.product_ids}])` : ''} {
                              edges {
                                product: node {
                                  ...ProductFields
                                }
                              }
                            }
                          settings {
                            storeName
                            url {
                              vanityUrl
                            }
                          }
                        }
                      }
                  fragment ProductFields on Product {
                    id
                    entityId
                    name
                    sku
                    path
                    description
                    defaultImage {
                      img320px: url(width: 320)
                      img640px: url(width: 640)
                      img960px: url(width: 960)
                      img1280px: url(width: 1280)
                      altText
                    }
                      prices {
                        price {
                          value
                          currencyCode
                        }
                    retailPrice {
                      value
                      currencyCode
                    }
                  }
                }`
  
          // Fetch data from the GraphQL Storefront API
          return fetch(graphQLUrl, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json',
                     'Authorization': `Bearer ${params.token}`},
            body: JSON.stringify({ query: graphQLQuery}),
          })
          .then(res => res.json())
          .then(res => res.data);
      }
  
  
      // It seems like the required parameters were supplied, try to load the product data from the Storefront API
      getProductAndSiteInfo(params).then(data => {
        // With our data loaded, render the product listing
          console.log(data);
          this.setState({
            responseText: data
          });
  
        }).catch(e => {
          // Some error was encountered
          console.log(e);
          throw(e);
        });
  
            }
          });
  
          xhr.open("POST", "https://api.bigcommerce.com/stores/store_hash/v3/storefront/api-token");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-auth-client", "j0dd7uh4z9awmvfzhpksn3m3eunwkim");
          xhr.setRequestHeader("x-auth-token", "bfv7raui86hh86d62v3ms02mndpcq6d");
  
          xhr.send(data);
   }
  
const SectionProducts = props => {
    const { rootClassName, className } = props;
    
    const classes = classNames(rootClassName || css.root, className);
   
    return (
       <div className={classes}>
           <div className={css.title}>
               <FormattedMessage id="SectionProducts.title" />
           </div>
   
           <div className={css.card}>
               <div className={css.cardImgTop} >
                 <img loading='lazy' src='../../assets/bestthing_smaller.png'/>
                       {/*1. Write html product boxes as a list 
                2. React JSX, link html to state
                <h2>It is {this.state.responseText.productNmae()}.</h2> */
                       <div className={css.cardBody}>
                           <h5 className={css.cardTitle}>'Test' 'Test'</h5>
                           <p className={css.cardText}>test</p>
                       
                       <a href="" >Add to cart</a>
                       </div>
                   </div>`
           </div>
       </div>
     );
   };
   
SectionProducts.defaultProps = { rootClassName: null, className: null };
   
const { string } = PropTypes;
   
SectionProducts.propTypes = {
    rootClassName: string,
    className: string,
};
   

   
export default SectionProducts;
