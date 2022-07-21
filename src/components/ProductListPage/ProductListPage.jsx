import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import ProductList from '../ProductList/ProductList';
import styles from './styles.module.css';

const GET_PRODUCTS_BY_CATEGORY = gql`
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

class ProductListPage extends Component {

  getProducts = (data) => {
    return data.category.products;
  };

  render() {
    if (!this.props.activeCurrency) {
      return
    }
    const input = {
      title: this.props.category,
    }
    return (
      <div className={styles.productPage}>
        <h2 className={styles.title}>{this.props.category}</h2>
        <Query
          query={GET_PRODUCTS_BY_CATEGORY}
          variables={ {input} }
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return `Error! ${error}`;
            }

            const products = this.getProducts(data);

            return (

              <ProductList
                products={products}
                activeCurrency={this.props.activeCurrency}
                setProductId={this.props.setProductId}
              />
            );
          }}
        </Query>
      </div>

    );
  }
}

export default ProductListPage;
