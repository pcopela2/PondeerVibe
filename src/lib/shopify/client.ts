import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const createShopifyClient = (domain: string, accessToken: string) => {
  const httpLink = createHttpLink({
    uri: `https://${domain}/api/2024-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

// Mock data for development
export const MOCK_STORES = [
  {
    id: 'store_1',
    name: 'Fashion Store',
    shopifyDomain: 'fashion-store.myshopify.com',
    stripeAccountId: 'acct_fashion123',
    location: 'New York, NY',
  },
  {
    id: 'store_2',
    name: 'Home Goods',
    shopifyDomain: 'home-goods.myshopify.com',
    stripeAccountId: 'acct_homegoods123',
    location: 'Los Angeles, CA',
  },
];