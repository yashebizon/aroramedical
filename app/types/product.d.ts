export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    params:string
  }

  export interface WooRestApiParams {
    per_page?: number;
    page?: number;
    [key: string]: any; // Allow other params as needed
  }