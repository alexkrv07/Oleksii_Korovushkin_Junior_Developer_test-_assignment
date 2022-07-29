import React, { Component } from 'react';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import styles from './styles.module.css';

class CurrencyList extends Component {

  render() {
    return (
      <ul className={`${styles.currencyList} ${this.props.className ? this.props.className : ''}`}>
        {this.props.currencies.map((currency, index) =>
          <li
            className={styles.currencyItem}
            key={index}
            onClick={() => this.props.changeCurrency(currency)}
          >
            <CurrencySymbol
              className={styles.currencySymbol}
              currency={currency}
            />
              <span className={styles.currencyLabel}>{currency.label}</span>
          </li>
        )}
      </ul>
    );
  }
}

export default CurrencyList;
