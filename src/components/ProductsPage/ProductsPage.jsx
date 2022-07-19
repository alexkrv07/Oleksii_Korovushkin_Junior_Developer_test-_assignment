import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import Image from '../Image/Image';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
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

class ProductsPage extends Component {

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
      <Query
        query={GET_PRODUCTS_BY_CATEGORY}
        variables={ {input} }
        // onCompleted={(data) => console.log(this.getProducts(data))}
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
            <div className={`${styles.cardWrp} ${this.props.className ? this.props.className : ''}`}>
              {products.map((product)=> {
                const price = product.prices.filter(price => {
                 return  price.currency.label === this.props.activeCurrency.label;
                })[0];
                console.log(price.currency)
                return (
                  <div className="card" key={product.id}>
                    <Image
                      key={product.id}
                      src={product.gallery[0]}
                      alt={product.id}
                      width={300}
                    />
                    <h3>{`${product.brand} ${product.name}`}</h3>
                    <h4 className={styles.price}>
                      <CurrencySymbol
                        className={styles.currencyValue}
                        currency={price.currency}
                      />
                      <div>{price.amount}</div>
                    </h4>
                  </div>

                )
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductsPage;
