import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import css from './ProductList.css';

class ProductList extends Component{

    constructor(props) {
        super(props);
        
        const { rootClassName, className } = this.props;
        const classes = classNames(rootClassName || css.root, className);
        this.state = {
            params: {
                store_url: "https://museebath.com",
                    product_ids: [245, 84, 181, 85, 86, 87, 89, 90, 353, 95, 96, 179, 180, 246, 98],
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE1ODgzMTY0MDAsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHBzOi8vbXVzZWViYXRoLmNvbSJdLCJjaWQiOjEsImlhdCI6MTU4MzY2Mzc0Miwic3ViIjoibnBjaXg5azB5ZHViNWE3emcxcmYwNjMzYTY1dGs2YyIsInNpZCI6OTk5NjU3MDY5LCJpc3MiOiJCQyJ9.KqdCnaPNdyi8UVdJqNEDpAbVi9GyQHIgQzAxS-ULt57FsmOVjPlSto_COfaqQDrEhiVh-dokDWh9qhJozf-dxg"
                ,
            },
            responseText: {},
            SectionProducts: (responseText) => {
                var productArray = [];
                if(responseText.data == null) return "";
    
                for (let i = 0; i < responseText.data.site.products.edges.count; i++) {
                    var  currentproduct = responseText.data.site.products.edges[i];
                    
                    function productCard(product) {
                        var productimage = product.defaultImage.img320px;
                        var productname = product.name;
                        var productprice = product.prices.price.value;
                        var productid = product.entityId;
                        return (
                            <div className={css.card}>
                                <div className={css.cardImgTop}>
                                    <img src={productimage} />
                                    <div className={css.cardBody}>
                                        <h5 className={css.cardTitle}> {productname}</h5>
                                        <h5 className={css.cardPrice}>{productprice}</h5>
                                            <a href={"https://museebath.com"+"/cart.php?action=add&product_id="+productid} className={css.enquirySubmitButtonWrapper}>Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    productArray.push(productCard(currentproduct));
                }
                return (
                    <div className={classes}>
                        <div className={css.productTitle}>
                            <FormattedMessage id="SectionProducts.title" />
                        </div>
                        {productArray}
                    </div>
                );
            },
            getProductAndSiteInfo: (params) => {
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
                            products (entityIds: params.product_ids){
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
                    headers: {
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Connection': 'keep-alive',
                        'DNT': '1' ,
                        'Origin': 'https://museebath.com',
                        'Authorization': `Bearer ${params.token} --data-binary`
                    },
                    body: JSON.stringify({ query: graphQLQuery})
                });
            }
        };
        
    }
    
    componentDidMount() {
        // preform graphQL query with creds.
        // then run the setState and assign results as shown below.

        // It seems like the required parameters were supplied, try to load the product data from the Storefront API
        this.state.getProductAndSiteInfo(this.state.params).then(data => {
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

    render() {
        return (
            <div>{this.state.SectionProducts((this.state.responseText || ""))}</div>
        );
    }

}
export default ProductList;