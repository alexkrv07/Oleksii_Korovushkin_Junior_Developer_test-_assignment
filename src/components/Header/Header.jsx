import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import CurrencySwitcher from '../CurrencySwitcher/CurrencySwitcher';
import CartOverlay from '../CartOverLay/CartOverlay';
import styles from './styles.module.css';

class Header extends Component {
  render() {
    const isRender = true;
      // this.props.activeCurrency
      // && this.props.currencies.length;

    if (isRender) {
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
                // currencies={this.props.currencies}
                setActiveCurrency={this.props.setActiveCurrency}
              />
              <CartOverlay/>
            </div>
          </div>
        </header>
      );
    }
   return null
  }
}

export default Header;
