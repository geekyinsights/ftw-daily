export const getProductsByStoreHash = async () => {
  const data = await fetch('/api/products', {
    method: 'GET',
  });

  return await data.json();
};
