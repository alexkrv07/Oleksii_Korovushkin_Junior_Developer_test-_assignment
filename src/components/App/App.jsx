import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import ProductDescriptionPage from '../ProductDescriptionPage/ProductDescriptionPage';
import ProductListPage from '../ProductListPage/ProductListPage';
import { getProductWithSameAttributesInCart } from '../../helpers/Product';
import CartPage from '../CartPage/CartPage';
import './app.css';
import Page404 from '../Page404/Page404';

class App extends Component {

  state = {
    activeCategory: '',
    categories: [],
    activeCurrency: {},
    productsInCart: [],
    isCartOverlay: false,
    isCurrencyOverlay: false,
  }

  setCategories = (categories) => {
    this.setState({
      categories: categories,
    });
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
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  };

  incrementProductCount = (index) => {

    const productsInCart = [...this.state.productsInCart];
    productsInCart[index].count += 1;
    this.setState({
      productsInCart: [...productsInCart]
    });
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }

  decrementProductCount = (index) => {

    const productsInCart = [...this.state.productsInCart];
    productsInCart[index].count -= 1;
    if (productsInCart[index].count === 0) {
      this.removeProductsWithCountZero();
    } else {
      this.setState({
        productsInCart: [...productsInCart]
      });
    }
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }

  removeProductsWithCountZero = () => {
    const productsInCart = this.state.productsInCart.filter(
      product => product.count !== 0
    );
    this.setState({
      productsInCart: [...productsInCart]
    });
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }

  toggleOverlay = (isCartOverlay) => {
    this.setState({
      isCartOverlay: isCartOverlay
    });
    this.removeProductsWithCountZero();
  }

  toggleCurrencyOverlay = (isCurrencyOverlay) => {
    this.setState({
      isCurrencyOverlay: isCurrencyOverlay
    });
   }

  componentDidMount = () => {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    if (productsInCart) {

      this.setState({
        productsInCart: productsInCart.filter(
          product => product.count !== 0
        )
      });
    }
   }

  render() {
    return (
      <>
        <Header
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          setActiveCategory={this.setActiveCategory}
          setActiveCurrency={this.setActiveCurrency}
          setCategories={this.setCategories}
          productsInCart={this.state.productsInCart}
          toggleOverlay={this.toggleOverlay}
          isOverlay={this.state.isCartOverlay}
          isCurrencyOverlay={this.state.isCurrencyOverlay}
          toggleCurrencyOverlay={this.toggleCurrencyOverlay}
          incrementProductCount={this.incrementProductCount}
          decrementProductCount={this.decrementProductCount}
        />
        <main
          className={!this.state.isCartOverlay ? "main": "main oveflowHidden"}
        >
          {this.state.isCartOverlay && <div className="overlay"></div>}
          <div className="container">
            <Routes>
              <Route path='/'
                element={
                  <ProductListPage
                    category={this.state.activeCategory}
                    categories={this.state.categories}
                    setActiveCategory={this.setActiveCategory}
                    activeCurrency={this.state.activeCurrency}
                    addProductToCart={this.addProductToCart}
                  />
                }
              >
                <Route path='/:category'
                  element={
                    <ProductListPage
                      category={this.state.activeCategory}
                      categories={this.state.categories}
                      setActiveCategory={this.setActiveCategory}
                      activeCurrency={this.state.activeCurrency}
                      addProductToCart={this.addProductToCart}
                    />
                  }
                />
              </Route>
              <Route
                path='/cart'
                element={
                  <CartPage
                    productsInCart={this.state.productsInCart}
                    activeCurrency={this.state.activeCurrency}
                    selectedAttributeList={this.state.selectedAttributeList}
                    incrementProductCount={this.incrementProductCount}
                    decrementProductCount={this.decrementProductCount}
                  />
                }
              />
              <Route
                path='/products/:id'
                element={
                  <ProductDescriptionPage
                    activeCurrency={this.state.activeCurrency}
                    addProductToCart={this.addProductToCart}
                    setSelectedAttributes={this.setSelectedAttributes}
                    selectedAttributeList={this.state.selectedAttributeList}
                  />
                }
              />
             <Route path='*' element={<Page404/>}/>
            </Routes>
          </div>
        </main>
      </>
    );
  }
}

export default App;
