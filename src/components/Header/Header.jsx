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
            ></Navbar>
            <Logo className={styles.logo}/>
            <CurrencySwitcher
              className={styles.curencySwitcher}
              activeCurrency={this.props.activeCurrency}
              setActiveCurrency={this.props.setActiveCurrency}
            />
            <CartOverlay
              productsInCart={this.props.productsInCart}
              toggleOverlay={this.props.toggleOverlay}
              isOverlay={this.props.isOverlay}
              activeCurrency={this.props.activeCurrency}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
