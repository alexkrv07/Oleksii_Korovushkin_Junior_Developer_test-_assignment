import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import Image from '../Image/Image';
import styles from './styles.module.css';
import ImageList from '../ImageList/ImageList';

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
    });
  };

  setInitialImage = (data) => {
    const product = this.getProduct(data);
    const gallery = product.gallery;
    this.setActiveImage(gallery[0]);
  }

  getProduct = (data) => {
    return data.product;
  }

  render() {
    const id = this.props.productId;
    return (
      <div
        className={`${styles.productDescriptionPage} ${this.props.className ? this.props.className : ''}`}
      >
        <Query
          query={GET_PRODUCT_BY_ID}
          variables={ {id} }
          onCompleted={(data) => this.setInitialImage(data)}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return `Error! ${error}`;
            }
            const product = this.getProduct(data);
            const gallery = product.gallery;

            return (
              <div
                className={`${styles.wrapper} ${this.props.className ? this.props.className : ''}`}
              >
                <ImageList
                  className={styles.imageList}
                  gallery={gallery}
                  alt={product.name}
                  setActiveImage={this.setActiveImage}
                />
                <div className={styles.mainImageWrp}>
                  <Image
                    className={styles.mainImage}
                    alt={product.name}
                    src={this.state.activeImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>
                    <h3 className={styles.productBrand}>{product.brand}</h3>
                    <h4 className={styles.productName}>{product.name}</h4>
                  </div>

                </div>

              </div>
            );
          }}
        </Query>
        {/* <ul className={styles.imageList}>

        </ul> */}

      </div>
    );
  }
}

export default ProductDescriptionPage;
