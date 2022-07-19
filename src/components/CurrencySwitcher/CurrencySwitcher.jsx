import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';
import CurrencyList from '../CurrencyList/CurrencyList';
import styles from './styles.module.css';

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencySwitcher extends Component {
  state = {
    isOpen: false,
  };

  toggleDropDown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeCurrencyDropDown = () => {
    this.setState({
      isOpen: false,
    });
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
              <div className={styles.currencySwitcher}>
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
              </div>
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
