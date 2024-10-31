import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from 'graphql-tag';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,// Update with your WordPress site's GraphQL API endpoint
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});
export default client;

export const GET_MENU_BY_NAME = gql`
  query GET_MENU_BY_NAME{
    menus(where: {location: PRIMARY}) {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            url
            title
          }
        }
      }
    }
  }
`;


