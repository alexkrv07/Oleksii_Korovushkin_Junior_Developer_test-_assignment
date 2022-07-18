import React, { Component } from 'react';
import styles from './styles.module.css';

class CurrencySwitcher extends Component {
  state = {
    isOpen: false,
  }

  toggleDropDown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeCurrencyDropDown = () => {
    this.setState({
      isOpen: false,
    });
  }

  changeCurrency = (currency) => {
    this.closeCurrencyDropDown();
    this.props.setActiveCurrency(currency);
  }

  render() {

    return (
      <div className={`${styles.currencyWrp} ${this.props.className ? this.props.className : ''}`}>
        <div className={styles.currencySwitcher}>
          <div className={styles.currencyValue}>{this.props.activeCurrency.symbol}</div>
          <button
            className={
              this.state.isOpen
              ? `${styles.currencySelect} ${styles.open}`
              : styles.currencySelect}
              onClick={this.toggleDropDown}
          ></button>
        </div>
        {this.state.isOpen &&
          <ul className={styles.currencyList}>
            {this.props.currencies.map((currency, index) =>
              <li
                className={styles.currencyItem}
                key={index}
                onClick={() => this.changeCurrency(currency)}
              >
                <span className={styles.currencySymbol}>{currency.symbol}</span>
                <span className={styles.currencyLabel}>{currency.label}</span>
              </li>
            )}
          </ul>
        }

      </div>
    );
  }
}

export default CurrencySwitcher;
