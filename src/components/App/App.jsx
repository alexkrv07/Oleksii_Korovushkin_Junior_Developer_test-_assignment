import React, { Component } from 'react';
import Header from '../Header/Header';
import { gql } from '@apollo/client';
import './app.css';

const GET_CATEGORIES = gql`
  query GetCategories  {
    categories {
      name
    }
  }
`;

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

class App extends Component {

  state = {
    categories: [],
    currencies: [],
    activeCategory: '',
    activeCurrency: {}
  }

  componentDidMount = async () => {
    await this.getCategory();
    await this.getCurrencies();
  }

  getCategory = async () => {
    const {client } = this.props;
    const { data } = await client.query({query: GET_CATEGORIES});
    const newCategories = data.categories.map(category => category.name);
    this.setState({
      categories: newCategories,
      activeCategory: newCategories[0],
    });
  };

  getCurrencies = async () => {
    const {client } = this.props;
    const { data } = await client.query({query: GET_CURRENCIES});
    const newCurrencies = data.currencies.map(currency => {
      return {
        label: currency.label,
        symbol: currency.symbol
      }
    });
    this.setState({
      currencies: newCurrencies,
      activeCurrency: newCurrencies[0],
    });
  };

  setActiveCategory = (category) => {
    this.setState({
      activeCategory: category,
    });
  };

  setActiveCurrency = (currency) => {
    this.setState({
      activeCurrency: currency,
    });
  };

  render() {
    return (
      <div className="app">
        <Header
          categories={this.state.categories}
          currencies={this.state.currencies}
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
        >
        </Header>
      </div>
    );
  }
}

export default App;
