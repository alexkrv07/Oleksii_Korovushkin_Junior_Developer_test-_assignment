import React, { Component } from 'react';
import Image from '../Image/Image';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import styles from './styles.module.css';

class ProductCard extends Component {

  getPrice = () => {
    return this.props.product.prices.filter(price => {
      return  price.currency.label === this.props.activeCurrency.label;
    })[0];
  }

  render() {
    const product = this.props.product;
    const price = this.getPrice();
    const isInStock = this.props.product.inStock;

    return (
      <li
        // className={styles.productCard}
        className={`${styles.productCard} ${this.props.className ? this.props.className : ''} ${!isInStock ? styles.disable : ''}`}
      >
        <Image
          className={styles.productCardImage}
          src={product.gallery[0]}
          alt={product.id}
          width={300}
        />
        <h3 className={styles.productCardTitle}>{`${product.brand} ${product.name}`}</h3>
        <h4 className={styles.price}>
          <CurrencySymbol
            className={styles.currencyValue}
            currency={price.currency}
          />
          <div>{price.amount}</div>
        </h4>
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
