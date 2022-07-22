import React, { Component } from 'react';
import Header from '../Header/Header';
import ProductDescriptionPage from '../ProductDescriptionPage/ProductDescriptionPage';
import ProductListPage from '../ProductListPage/ProductListPage';
import './app.css';

class App extends Component {

  state = {
    activeCategory: '',
    activeCurrency: {},
    cart: {
      items: 0,
      products: []
    },
    productId: null,
  }

  setActiveCategory = (category) => {
    this.setState({
      activeCategory: category,
      productId: null
    });
  };

  setActiveCurrency = (currency) => {
    this.setState({
      activeCurrency: currency,
    });
  };

  setProductId = (productId) => {
    this.setState({
      productId: productId,
    });
  }

  render() {
    return (
      <>
        <Header
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
        />
        <main className="main">
          <div className="container">

            {!this.state.productId &&
              <ProductListPage
                category={this.state.activeCategory}
                productId={this.props.productId}
                activeCurrency={this.state.activeCurrency}
                setProductId={this.setProductId}
              />
            }

            {this.state.productId &&
              <ProductDescriptionPage
                productId={this.state.productId}
                activeCurrency={this.state.activeCurrency}
              />
            }

          </div>
        </main>
      </>
    );
  }
}

export default App;
