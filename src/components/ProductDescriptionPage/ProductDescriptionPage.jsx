import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import styles from './styles.module.css';

const GET_PRODUCT_BY_ID = gql`
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

class ProductDescriptionPage extends Component {
  state = {
    activeImage: '',
  }

  setActiveImage = (imageSrc) => {
    this.setState({
      activeImage: imageSrc,
      productId: null
    });
  };

  getProduct = (data) => {
    return data.product;
  }

  render() {
    const id = this.props.productId;
    console.log(id);
    return (
      <div
        className={`${styles.productDescriptionPage} ${this.props.className ? this.props.className : ''}`}
      >
        <Query
          query={GET_PRODUCT_BY_ID}
          variables={ {id} }
          // onCompleted={() => console.log(data)}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return `Error! ${error}`;
            }
            const product = this.getProduct(data);

            return (
              <div>
                {console.log(product)}
                {`${product}`}
              </div>
            );
          }}
        </Query>
        <ul className={styles.imageList}>

        </ul>

      </div>
    );
  }
}

export default ProductDescriptionPage;
