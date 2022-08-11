import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import CurrencyList from '../CurrencyList/CurrencyList';
import { GET_CURRENCIES } from '../../../constants/query/getCurrencies';
import styles from './styles.module.css';

class CurrencySwitcher extends Component {
  state = {
    isOpen: false,
  };

  toggleDropDown = (evt) => {
    evt.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
    document.addEventListener('click', this.closeCurrencyDropDown);
  };

  closeCurrencyDropDown = () => {
    this.setState( { isOpen: false });
    document.removeEventListener('click', this.closeCurrencyDropDown);
  };

  changeCurrency = (currency) => {
    this.closeCurrencyDropDown();
    this.props.setActiveCurrency(currency);
  };

  getCurrencies = (data) => {
    return data.currencies.map(currency => {
      return {
        label: currency.label,
        symbol: currency.symbol
      }
    });
  };

  setInitialCurrency = (data) => {
    const currencies = this.getCurrencies(data);
    const initialCurrency = currencies[0];
    this.props.setActiveCurrency(initialCurrency);
  }

  render() {
    const activeCurrency = this.props.activeCurrency;

    return (
      <Query
        query={GET_CURRENCIES}
        onCompleted={(data) => this.setInitialCurrency(data)}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error) {
            return `Error! ${error}`;
          }

          const currencies = this.getCurrencies(data);

          return (
            <div className={`${styles.currencyWrp} ${this.props.className ? this.props.className : ''}`}>
              {/* <div className={styles.currencySwitcher}>
                <CurrencySymbol
                  className={styles.currencyValue}
                  currency={activeCurrency}
                />
                <button
                  className={
                    this.state.isOpen
                    ? `${styles.currencySelect} ${styles.open}`
                    : styles.currencySelect}
                    onClick={this.toggleDropDown}
                 />
              </div> */}
              <button
                className={`${styles.currencyWrp} ${this.props.className ? this.props.className : ''}`}
                onClick={this.toggleDropDown}
              >
                <CurrencySymbol
                  className={styles.currencyValue}
                  currency={activeCurrency}
                />
                <span
                  className={
                    this.state.isOpen
                    ? `${styles.currencySelect} ${styles.open}`
                    : styles.currencySelect}
                />

                {/* </span> */}
              </button>
              {this.state.isOpen &&
                <CurrencyList
                  className={styles.currencyList}
                  currencies={currencies}
                  changeCurrency={this.changeCurrency}
                />
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CurrencySwitcher;
