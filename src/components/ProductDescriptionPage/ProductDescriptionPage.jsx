import React, { Component } from 'react';
import parse from 'html-react-parser';
import { Query } from '@apollo/client/react/components';
import Image from '../Image/Image';
import ImageList from '../ImageList/ImageList';
import ProductAttributeSet from '../ProductAttributeSet/ProductAttributeSet';
import Price from '../Price/Price';
import { GET_PRODUCT_BY_ID } from '../../constants/query/getProducrById';
import styles from './styles.module.css';

class ProductDescriptionPage extends Component {
  state = {
    activeImage: '',
  }

  getPrice = (product) => {
    return product.prices.filter(price => {
      return  price.currency.label === this.props.activeCurrency.label;
    })[0];
  };

  setActiveImage = (imageSrc) => {
    this.setState({
      activeImage: imageSrc,
    });
  };

  setInitialImage = (data) => {
    const { product } = data;
    const { gallery } = product;
    this.setActiveImage(gallery[0]);
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

            const { product } = data;
            const { gallery } = product;
            const isAttributeSet = !!product.attributes.length;
            const price = this.getPrice(product);

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
                  {isAttributeSet &&
                    <ProductAttributeSet
                      className={styles.attributeSet}
                      arrtibuteSet={product.attributes}
                    />
                  }
                  <div className={styles.productPrice}>
                    <h4 className={styles.productPriceTitle}>Price:</h4>
                    <Price
                      className={styles.productPriceAmount}
                      price={price}
                    />
                  </div>
                  <button
                    className={styles.buttonAddToCart}
                  >
                    Add to Cart
                  </button>
                  <div
                    className={styles.productDescription}
                  >
                    {parse(product.description)}
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductDescriptionPage;
