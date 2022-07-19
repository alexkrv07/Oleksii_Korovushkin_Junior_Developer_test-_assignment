import React, { Component } from 'react';
import Header from '../Header/Header';
import { gql } from '@apollo/client';
import './app.css';

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

// const GET_PRODUCTS_BY_CATEGORY = gql`
//   query GetProductsByCategory($category: String) {
//     category (input: {title: $category}) {
//       name
//       products {
//         id
//         name
//         inStock
//         brand
//         gallery
//         category
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//         attributes {
//           name
//           items{
//             id
//             value
//             displayValue
//           }
//         }
//       }
//     }
//   }
// `;

class App extends Component {

  state = {
    currencies: [],
    activeCategory: '',
    activeCurrency: {},
    cart: {
      items: 0,
      products: []
    },
    productId: null,
  }

  componentDidMount = async () => {
    await this.getCurrencies();
  }

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
          currencies={this.state.currencies}
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
        />
      </div>
    );
  }
}

export default App;
