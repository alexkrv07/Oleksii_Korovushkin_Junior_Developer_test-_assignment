import React, { Component } from 'react';
import styles from './styles.module.css';

class CurrencySymbol extends Component {
  render() {
    return (
      <div className={`${styles.currencySymbol} ${this.props.className ? this.props.className : ''}`}>
        {this.props.currency.symbol}
      </div>
    );
  }
}

export default CurrencySymbol;
