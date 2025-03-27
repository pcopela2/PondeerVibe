import { gql } from '@apollo/client';
import { createShopifyClient } from './client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    title
    description
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      edges {
        node {
          url
          altText
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`;

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const fetchStoreProducts = async (
  domain: string,
  accessToken: string
): Promise<ShopifyProduct[]> => {
  const client = createShopifyClient(domain, accessToken);

  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
      variables: { first: 50 },
    });

    return data.products.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      image: node.images.edges[0]?.node.url || '',
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Mock products for development
export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'prod_1',
    title: 'Designer T-Shirt',
    description: 'Premium cotton t-shirt with unique design',
    price: 29.99,
    image: 'https://picsum.photos/400/400',
  },
  {
    id: 'prod_2',
    title: 'Ceramic Vase',
    description: 'Handcrafted ceramic vase for home decor',
    price: 49.99,
    image: 'https://picsum.photos/400/400',
  },
];