import React, { Component } from 'react';
import Image from '../Image/Image';
import styles from './styles.module.css';
import Price from '../Price/Price';

class ProductCard extends Component {

  getPrice = () => {
    return this.props.product.prices.filter(price => {
      return  price.currency.label === this.props.activeCurrency.label;
    })[0];
  };

  goToPageProductDescriptionPage = () => {
    this.props.setProductId(this.props.product.id);
  };

  render() {
    const product = this.props.product;
    const price = this.getPrice();
    const isInStock = this.props.product.inStock;

    return (
      <li
        className={`${styles.productCard} ${this.props.className ? this.props.className : ''} ${!isInStock ? styles.disable : ''}`}
        // className={`${styles.productCard} ${this.props.className ? this.props.className : ''} `}
        onClick={this.goToPageProductDescriptionPage}
      >
        <Image
          className={styles.productCardImage}
          src={product.gallery[0]}
          alt={product.id}
          width={300}
        />
        <h3 className={styles.productCardTitle}>{`${product.brand} ${product.name}`}</h3>
        <Price
          price={price}
        />
        <button className={styles.buttonAddToCart}>
          <span className={styles.buttonAddToCartIcon}></span>
        </button>
        {!isInStock &&
           <div className={styles.disactive}>
              Out of stock
            </div>
        }

      </li>
    );
  }
}

export default ProductCard;
