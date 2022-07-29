import React, { Component } from 'react';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import styles from './styles.module.css';


class Price extends Component {
  render() {
    return (
      <div
        className={`${styles.price} ${this.props.className ? this.props.className : ''}`}
      >
        <CurrencySymbol
          className={styles.currencyValue}
          currency={this.props.price.currency}
        />
        <div>{this.props.price.amount}</div>
      </div>
    );
  }
}

export default Price;
