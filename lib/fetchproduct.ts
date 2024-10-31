// import api from './wooCommerce';
// import { Product } from '../app/types/product';
// import { WooRestApiParams } from '../app/types/product';

// export const fetchProducts = async (): Promise<Product[]> => {
//   let products: Product[] = [];
//   let page = 1;
//   let totalPages = 1;

//   try {
//     do {
//       const params: WooRestApiParams = {
//         per_page: 100, // Adjust the number of products per page as needed
//         page,
//       };
//       const response = await api.get('customers', params);
//       products = products.concat(response.data);
//       totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
//       page += 1;
//     } while (page <= totalPages);

//     return products;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// };

// export const fetchProduct = async (id: number): Promise<Product | null> => {
//   try {
//     const response = await api.get(`customers/${id}` as 'products');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// };
