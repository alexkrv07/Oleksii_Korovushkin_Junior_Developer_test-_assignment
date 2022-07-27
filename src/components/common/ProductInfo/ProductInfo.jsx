import React, { Component } from 'react';
import ProductAttributeSet from '../ProductAttributeSet/ProductAttributeSet';
import Price from '../Price/Price';
import { getPrice, isProductHasAttributes } from '../../../helpers/Product';
import styles from './styles.module.css';

class ProductInfo extends Component {
  render() {


    const price = getPrice(this.props.product, this.props.activeCurrency);
    let mainStyle = `${this.props.className ? this.props.className : ''}`;
    if (this.props.isOverlay) {
      mainStyle += ' ' + styles.productInfoOverlay;
    } else if (this.props.isCart) {
      mainStyle += ' ' + styles.productInfoCart;
    } else {
      mainStyle += ' ' + styles.productInfo;
    }



    return (
      <div className={mainStyle}>
        <div className={styles.productTitle}>
          <h3 className={styles.productBrand}>{this.props.product.brand}</h3>
          <h4 className={styles.productName}>{this.props.product.name}</h4>
        </div>
        <div className={styles.productPrice}>
          <h4 className={styles.productPriceTitle}>Price:</h4>
          <Price
            className={styles.productPriceAmount}
            price={price}
          />
        </div>
        {isProductHasAttributes(this.props.product) &&
          <ProductAttributeSet
            className={styles.attributeSet}
            arrtibuteSet={this.props.product.attributes}
            selectedAttributeList={this.props.selectedAttributeList}
            updateAttributeList={this.props.setSelectedAttributes}
            isOverlay={this.props.isOverlay}
            isCart={this.props.isCart}
          />
        }
      </div>
    );
  }
}

export default ProductInfo;
