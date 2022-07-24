import React, { Component } from 'react';
import Counter from '../common/Counter/Counter';
import Header from '../Header/Header';
import ProductDescriptionPage from '../ProductDescriptionPage/ProductDescriptionPage';
import ProductListPage from '../ProductListPage/ProductListPage';
import { getProductWithSameAttributesInCart } from '../../helpers/Product';
import './app.css';

class App extends Component {

  state = {
    activeCategory: '',
    activeCurrency: {},
    productsInCart: [],
    productId: null,
    // selectedAttributeList: [],
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

  // setSelectedAttributes = (selectedAttributes) => {
  //  this.setState({
  //     selectedAttributeList: selectedAttributes
  //   });
  // }

  addProductToCart = (product) => {
    const productsInCart = [...this.state.productsInCart];
    const productInCartWithSameAttributes = getProductWithSameAttributesInCart(productsInCart, product);

    if (!productInCartWithSameAttributes) {
      productsInCart.push(product);
     } else {
      productInCartWithSameAttributes.count += 1;
    }

    this.setState({
      productsInCart: [...productsInCart]
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
                // setSelectedAttributes={this.setSelectedAttributes}
                // selectedAttributeList={this.state.selectedAttributeList}
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
