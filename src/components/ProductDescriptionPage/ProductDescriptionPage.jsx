import React, { Component } from 'react';
import parse from 'html-react-parser';
import { Query } from '@apollo/client/react/components';
import Image from '../common/Image/Image';
import ImageList from '../common/ImageList/ImageList';
import ProductAttributeSet from '../common/ProductAttributeSet/ProductAttributeSet';
import Price from '../common/Price/Price';
import { GET_PRODUCT_BY_ID } from '../../constants/query/getProducrById';
import { getPrice, isProductHasAttributes, isSelectedAllAttributes, setInitialtAttributes } from '../../helpers/Product';
import styles from './styles.module.css';

class ProductDescriptionPage extends Component {
  state = {
    activeImage: '',
    selectedAttributeList: [],
  }

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

  setInitialSelectedAttributes = (data) => {
    this.setState({
      selectedAttributeList: setInitialtAttributes(data.product)
    });
  }

  setSelectedAttributes = (selectedAttribute) => {
    const updatedAttributeList = [...this.state.selectedAttributeList];
    updatedAttributeList.forEach(attributeSet => {
      if (attributeSet.name === selectedAttribute.name) {
        attributeSet.id = selectedAttribute.id
      }
    });
    this.setState({
      selectedAttributeList: [...updatedAttributeList]
    });
  }

  addProductToCart = (product) => {
    if (isSelectedAllAttributes(product, this.state.selectedAttributeList)) {
      const productToCart = {
        ...product,
        selectedAttributeList: this.state.selectedAttributeList,
        count: 1
      }
      this.props.addProductToCart(productToCart);
    }
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
          onCompleted={(data) => {
            this.setInitialImage(data);
            this.setInitialSelectedAttributes(data)
          }}
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
            const price = getPrice(product, this.props.activeCurrency)

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
                  {isProductHasAttributes(product) &&
                    <ProductAttributeSet
                      className={styles.attributeSet}
                      arrtibuteSet={product.attributes}
                      selectedAttributeList={this.state.selectedAttributeList}
                      updateAttributeList={this.setSelectedAttributes}
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
                    onClick={() => this.addProductToCart(product)}
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
