import React, { Component } from 'react';
import Counter from '../common/Counter/Counter';
import Header from '../Header/Header';
import ProductDescriptionPage from '../ProductDescriptionPage/ProductDescriptionPage';
import ProductListPage from '../ProductListPage/ProductListPage';
import './app.css';

class App extends Component {

  state = {
    activeCategory: '',
    activeCurrency: {},
    productsInCart: [],
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

  addProductToCart = (product) => {
    this.setState({
      productsInCart: [...this.state.productsInCart, product]
    });
  };

  render() {
    return (
      <>
        <Header
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
          productsInCart={this.state.productsInCart}
        />
        <main className="main">
          <div className="container">

            {!this.state.productId &&
              <ProductListPage
                category={this.state.activeCategory}
                productId={this.props.productId}
                activeCurrency={this.state.activeCurrency}
                setProductId={this.setProductId}
                addProductToCart={this.addProductToCart}
              />
            }

            {this.state.productId &&
              <ProductDescriptionPage
                productId={this.state.productId}
                activeCurrency={this.state.activeCurrency}
                addProductToCart={this.addProductToCart}
              />
            }
          <Counter
            className="counter"
          />
          </div>

        </main>
      </>
    );
  }
}

export default App;
