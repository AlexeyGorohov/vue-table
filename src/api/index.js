import { getProducts, deleteProducts } from '../request';

export const getItems = async () => {
  try {
    const items = await getProducts();
    return [null, items];
  } catch (error) {
    return [error, null];
  }
};

export const deleteItem = async () => {
  try {
    const items = await deleteProducts();
    return [null, items];
  } catch (error) {
    return [error, null];
  }
};