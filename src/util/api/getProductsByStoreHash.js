export const getProductsByStoreHash = async () => {
  const data = await fetch('http://localhost:4000/api/products', {
    method: 'GET',
  });

  return await data.json();
};
