import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
        id
        name
        inStock
        brand
        gallery
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        description
        attributes {
          id
          type
          name
          items {
            id
            value
            displayValue
          }
        }
      }
  }
`;
