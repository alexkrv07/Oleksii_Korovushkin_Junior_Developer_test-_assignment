import React, { Component } from 'react';
import ButtonCartOverlay from '../ButtonCartOverlay/ButtonCartOverlay';
import TotalPrice from '../TotalPrice/TotalPrice';
import {  getTotalPrice, getProductsTotalCount} from '../../../helpers/Product';
import styles from './styles.module.css';

class CartOverlay extends Component {
  state = {
    isOpen: false,
  }

  handlerOnClick = () => {
    console.log(this.props.productsInCart);
    this.props.toggleOverlay();
  }

  render() {
    const count = getProductsTotalCount(this.props.productsInCart);
    const totalPrice = getTotalPrice(this.props.productsInCart, this.props.activeCurrency);
    const items = count === 1 ? 'item' : 'items';
    return (
      <div className={`${styles.cartOverlayWrp} ${this.props.className ? this.props.className : ''}`}>
        <ButtonCartOverlay
          items={count}
          handler={this.handlerOnClick }
        />
        {this.props.isOverlay
          && (
            <div className={styles.cartOverlay}>
              <h3 className={styles.cartOverlayTitle}>
                My bag,
                <span>{` ${count} ${items}`}</span>
              </h3>
              <TotalPrice
                className={styles.totalPrice}
                productsInCart={this.props.productsInCart}
                activeCurrency={this.props.activeCurrency}
                isOverlay={true}
              />
              <div className={styles.bntBlock}>
                <button
                  className={styles.btnBag}
                >
                  Wiew bag
                </button>
                <button
                  className={styles.btnCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
