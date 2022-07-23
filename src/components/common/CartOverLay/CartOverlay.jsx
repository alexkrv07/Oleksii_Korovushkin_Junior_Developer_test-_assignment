import React, { Component } from 'react';
import ButtonCartOverlay from '../ButtonCartOverlay/ButtonCartOverlay';
import styles from './styles.module.css';


class CartOverlay extends Component {
  state = {
    isOpen: false,
  }

  getProductCounts = () => {
    return this.props.productsInCart.reduce((result, product) => {
      return result + product.count;
    },0);
  }

  render() {
    const count = this.getProductCounts()
    return (
      <div className={`${styles.cartOverlayWrp} ${this.props.className ? this.props.className : ''}`}>
        <ButtonCartOverlay
          items={count}
        />

      </div>
    );
  }
}

export default CartOverlay;
