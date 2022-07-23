import React, { Component } from 'react';
import styles from './styles.module.css';

class ButtonCartOverlay extends Component {
  render() {
    const totalCartItems = this.props.items;
    return (
      <button
        className={`${styles.buttonCartOverlay} ${this.props.className ? this.props.className : ''}`}
        onClick={this.props.handler}
      >
        <span className={styles.cartButtonIcon}></span>
        { totalCartItems &&
            <span className={styles.cartButtonBadge}>{totalCartItems}</span>
        }
      </button>
    );
  }
}

export default ButtonCartOverlay;
