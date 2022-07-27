import React, { Component } from 'react';
import Header from '../Header/Header';
import ProductDescriptionPage from '../ProductDescriptionPage/ProductDescriptionPage';
import ProductListPage from '../ProductListPage/ProductListPage';
import { getProductWithSameAttributesInCart } from '../../helpers/Product';
import './app.css';
import CartPage from '../CartPage/CartPage';

class App extends Component {

  state = {
    activeCategory: '',
    activeCurrency: {},
    productsInCart: [],
    productId: null,
    isOverlay: false,
    isCart: false
  }

  setActiveCategory = (category) => {
    this.setState({
      activeCategory: category,
      productId: null
    });
    this.toggleIsCart(false)
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

  incrementProductCount = (index) => {

    const productsInCart = [...this.state.productsInCart];
    productsInCart[index].count += 1;
    console.log(productsInCart[index].count)
    this.setState({
      productsInCart: [...productsInCart]
    });
  }

  decrementProductCount = (index) => {

    const productsInCart = [...this.state.productsInCart];
    if (productsInCart[index].count === 0) {
      return;
    }
    productsInCart[index].count -= 1;

    this.setState({
      productsInCart: [...productsInCart]
    });
  }

  removeProductsWithCountZero = () => {
    const productsInCart = this.state.productsInCart.filter(
      product => product.count !== 0
    );
    this.setState({
      productsInCart: [...productsInCart]
    });
  }

  toggleOverlay = (isOverlay) => {
    this.setState({
      isOverlay: isOverlay
    });
    this.removeProductsWithCountZero();
  }

  toggleIsCart = (isCart) => {
    this.setState({
      isCart: isCart
    });
    this.removeProductsWithCountZero();
  }

  render() {
    return (
      <>
        <Header
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
          productsInCart={this.state.productsInCart}
          toggleOverlay={this.toggleOverlay}
          isOverlay={this.state.isOverlay}
          incrementProductCount={this.incrementProductCount}
          decrementProductCount={this.decrementProductCount}
          toggleIsCart={this.toggleIsCart}
        />
        <main className="main">
          {this.state.isOverlay && <div className="overlay"></div>}

          <div className="container">

            {!this.state.productId && !this.state.isCart &&
              <ProductListPage
                category={this.state.activeCategory}
                productId={this.props.productId}
                activeCurrency={this.state.activeCurrency}
                setProductId={this.setProductId}
                addProductToCart={this.addProductToCart}
              />
            }

            {this.state.productId && !this.state.isCart &&
              <ProductDescriptionPage
                productId={this.state.productId}
                activeCurrency={this.state.activeCurrency}
                addProductToCart={this.addProductToCart}
                setSelectedAttributes={this.setSelectedAttributes}
                selectedAttributeList={this.state.selectedAttributeList}
              />
            }

            {this.state.isCart &&
              <CartPage
                productsInCart={this.state.productsInCart}
                activeCurrency={this.state.activeCurrency}
                selectedAttributeList={this.state.selectedAttributeList}
                incrementProductCount={this.incrementProductCount}
                decrementProductCount={this.decrementProductCount}
                toggleIsCart={this.toggleIsCart}
              />
            }

          </div>

        </main>
      </>
    );
  }
}

export default App;
