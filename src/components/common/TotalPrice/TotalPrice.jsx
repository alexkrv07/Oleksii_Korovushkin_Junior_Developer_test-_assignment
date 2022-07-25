import React, { Component } from 'react';
import {  getTotalPrice, getProductsTotalCount, getTotalTax } from '../../../helpers/Product';
import Price from '../Price/Price';
import styles from './styles.module.css';

class TotalPrice extends Component {
  render() {
    const count = getProductsTotalCount(this.props.productsInCart);
    const totalPrice = getTotalPrice(this.props.productsInCart, this.props.activeCurrency);
    const taxPercent = 21;
    const taxForOutput = {
      amount: getTotalTax(totalPrice.amount, taxPercent),
      currency: this.props.activeCurrency
    }

    const mainStyle = this.props.isOverlay
      ? `${styles.totalPriceOverlay} ${this.props.className ? this.props.className : ''}`
      : `${styles.totalPrice} ${this.props.className ? this.props.className : ''}`;

    return (
      <div
        className={mainStyle}
      >
        <div className={styles.tax}>
          <div className={styles.taxTitle}>{`Tax, ${taxPercent}%: `}</div>
          <Price
            className={styles.taxAmount}
            price={taxForOutput}
          />
        </div>
        <div className={styles.count}>
          <div className={styles.countTitle}>Quantity:</div>
          <div className={styles.countAmount}>{count}</div>
        </div>
        <div className={styles.total}>
          <div className={styles.totalTitle}>Total</div>
          <Price
            className={styles.totalPriceAmount}
            price={totalPrice}
          />
        </div>


      </div>
    );
  }
}

export default TotalPrice;
