const pageUrl = new URL(window.location);
const searchParams = pageUrl.searchParams;
// Inject the current page origin into the getting started text so it will be correct for the current context
document.getElementById("page-origin").innerHTML = pageUrl.origin;

/*
    Utility functions for rendering
*/

// Based on the browser locale, provide a localized price
function formatLocalizedPrice (price) {
    return new Intl.NumberFormat(navigator.language, {style: 'currency', currency: price.currencyCode}).format(price.value);
}

// Create a srcset string for responsive images
function renderSrcset(image) {
    return `${image.img320px} 320w, ${image.img640px} 640w, ${image.img960px} 960w, ${image.img1280px} 1280w`
}

// Function to strip HTML from product descriptions, leaving just the text
function stripHtml(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

/*
    Page rendering logic
*/
function renderPage(data) {
    // Set up the add-to-cart-url format
    const addToCartURLFormat = `${data.site.settings.url.vanityUrl}/cart.php?action=add&product_id=`
    // Render the HTML for the product listing by looping over each product in the response
    document.getElementById('product-listing').innerHTML = `${data.site.products.edges.map(node => renderProduct(node.product, addToCartURLFormat)).reduce((productsHtml, productHtml) => productsHtml += productHtml)}`;
}

function renderProduct(product, addToCartURLFormat) {
    // Render the product into a bootstrap "card"
    return `
        <div class="card" style="min-width: 25%;">
        ${product.defaultImage ? `<img loading="lazy" class="card-img-top" style="min-height: 25%; object-fit: contain;" src="${product.defaultImage.img960px}" srcset="${renderSrcset(product.defaultImage)}" alt="${product.defaultImage.altText}">` : ''
         }
        <div class="card-body">
          <h5 class="card-title">${product.name} ${renderPrice(product.prices)}</h5>
          <p class="card-text text-truncate">${stripHtml(product.description)}</p>
          
          <a href="${addToCartURLFormat}${product.entityId}" class="btn btn-primary">Add to cart</a>
        </div>
      </div>`
}

function renderPrice(prices) {
    // Render the price component from the supplied prices
    return `<span class="card-text text-muted">(${prices.retailPrice ? `<del><span class="font-italic">${formatLocalizedPrice(prices.price)}</span></del> ` : ''}${formatLocalizedPrice(prices.price)})</span>`
}


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

// Set up default params
let params = {
    store_url: null,
    product_ids: null,
    token: null
};

// Fill in supplied URL params
Object.keys(params).forEach(function (key) {
    if (searchParams.get(key)) {
        params[key] = searchParams.get(key);
    }
});

// Check for required parameters, throw an error if they're not found
if (!(params.store_url && params.token)) {
    throw new Error('At least one of the required URL parameters (Store URL, Token) was not supplied or was invalid');
} else {
    // Put the supplied parameters into the form so it can easily re-submitted
    document.getElementById('store-url-field').value = params.store_url;
    document.getElementById('api-token-field').value = params.token;

    // It seems like the required parameters were supplied, try to load the product data from the Storefront API
    getProductAndSiteInfo(params).then(data => {
        // With our data loaded, render the product listing
        renderPage(data);

        // Set the header to the name of the store
        document.getElementById('main-title').textContent = `${data.site.settings.storeName}`;
        document.title = `${data.site.settings.storeName}`;

        // Render the customer information if there's a session
        document.getElementById('customer').innerHTML = `${data.customer ? `Logged in as ${data.customer.firstName} ${data.customer.lastName} (${data.customer.email}) <a href="${params.store_url}/login.php?action=logout" class="badge badge-danger">Sign out</a>` : ''}`;

        // Hide the getting started content
        document.getElementById('getting-started').classList.add('d-none');
    }).catch(e => {
      // Some error was encountered
      document.getElementById('error-message').textContent = `Error returned from API: - check that your store url and API token are valid, and that your token's CORS origin is correctly configured. Check the browser console for more details of this error.`;
      errorMessageElement.classList.replace('d-none', 'd-flex');
      throw(e);
    });
}
