import React, { Component } from 'react';
import Logo from '../common/Logo/Logo';
import Navbar from '../common/Navbar/Navbar';
import CurrencySwitcher from '../common/CurrencySwitcher/CurrencySwitcher';
import CartOverlay from '../common/CartOverLay/CartOverlay';
import styles from './styles.module.css';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className="container">
          <div className={styles.container}>
            <Navbar
              className={styles.navbar}
              activeCategory={this.props.activeCategory}
              setActiveCategory={this.props.setActiveCategory}
              setCategories={this.props.setCategories}
            ></Navbar>
            <Logo className={styles.logo}/>
            <div className={styles.rightBlock}>
              <CurrencySwitcher
                className={styles.curencySwitcher}
                activeCurrency={this.props.activeCurrency}
                setActiveCurrency={this.props.setActiveCurrency}
                isCurrencyOverlay={this.props.isCurrencyOverlay}
                toggleCurrencyOverlay={this.props.toggleCurrencyOverlay}
                toggleOverlay={this.props.toggleOverlay}
              />
              <CartOverlay
                className={styles.cartOverLay}
                productsInCart={this.props.productsInCart}
                toggleOverlay={this.props.toggleOverlay}
                isOverlay={this.props.isOverlay}
                toggleCurrencyOverlay={this.props.toggleCurrencyOverlay}
                activeCurrency={this.props.activeCurrency}
                selectedAttributeList={this.props.selectedAttributeList}
                incrementProductCount={this.props.incrementProductCount}
                decrementProductCount={this.props.decrementProductCount}
                toggleIsCart={this.props.toggleIsCart}
              />
            </div>

          </div>
        </div>
      </header>
    );
  }
}

export default Header;
