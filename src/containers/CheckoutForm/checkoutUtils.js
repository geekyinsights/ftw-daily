const KEY = '@PRODUCT_IDS';

export const getProductIdsFromStorage = () => {
  const ids = window.localStorage.getItem(KEY);

  if (ids) {
    return JSON.parse(ids);
  } else return [];
};

export const addProductIdToCart = productId => {
  const ids = getProductIdsFromStorage();
  ids.push(productId);
  console.log(ids);
  window.localStorage.setItem(KEY, JSON.stringify(ids));

  return ids;
};

export const getCartData = async productIds => {
  try {
    const order = productIds.map(id => {
      return {
        quantity: 1,
        productId: id,
      };
    });
    const res = await fetch('https://museebath.com/api/storefront/cart', {
      body: JSON.stringify({ lineItems: order }),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (e) {
    console.log('Error getting cart data', e);
  }
};
