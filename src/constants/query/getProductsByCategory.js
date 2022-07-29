import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($input: CategoryInput) {
    category (input: $input) {
      name
      products {
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
        attributes {
          name
          type
          items{
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;
