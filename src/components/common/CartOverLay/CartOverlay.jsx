import React, { Component } from 'react';
import ButtonCartOverlay from '../ButtonCartOverlay/ButtonCartOverlay';
import styles from './styles.module.css';


class CartOverlay extends Component {
  state = {
    isOpen: false,
  }

  render() {
    return (
      <div className={`${styles.cartOverlayWrp} ${this.props.className ? this.props.className : ''}`}>
        <ButtonCartOverlay
          items="1"
        />

      </div>
    );
  }
}

export default CartOverlay;
