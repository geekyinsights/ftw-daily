import { getProductsByStoreHash } from '../../util/api/getProductsByStoreHash';

const KEY = '@PRODUCT_IDS';
const fetchURL = process.env.REACT_APP_ENV === 'production' ? '/api' : 'http://localhost:4000/api';
export const getProductIdsFromStorage = () => {
  const ids = window.localStorage.getItem(KEY);

  if (ids) {
    return JSON.parse(ids);
  } else return [];
};

export const finishOrder = () => window.localStorage.setItem(KEY, JSON.stringify([]));

export const addProductIdToCart = productId => {
  const ids = getProductIdsFromStorage();
  ids.push(productId);
  console.log(ids);
  window.localStorage.setItem(KEY, JSON.stringify(ids));

  return ids;
};

export const createOrder = async order => {
  const newOrder = await fetchUtil('/orders', { method: 'POST' });
  console.log('ORDER', newOrder);
  /* try {
    console.log('TEST', _stripe.orders.create);
    return await _stripe.orders.create(order);
  } catch (e) {
    throw e;
  } */
  //return new Promise((resolve, reject) => {}); */
};

export const processPayment = async (token, amount, shippingInfo, orderInfo) => {
  const body = JSON.stringify({
    token,
    amount,
    shippingInfo,
    orderInfo,
  });
  return fetchUtil('/pay', { method: 'POST', body });
};
export const getSummaryProducts = async () => {
  const ids = getProductIdsFromStorage();
  const products = (await getProductsByStoreHash()).data;
  return products.filter(pr => ids.includes(pr.id));
};

const fetchUtil = async (url, options = {}) => {
  const _fetchURL = 'http://localhost:4000/api';
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    console.log({ ...options, headers: headers });
    const res = await fetch(_fetchURL + url, { ...options, headers });

    return await res.json();
  } catch (e) {
    throw e;
  }
};
