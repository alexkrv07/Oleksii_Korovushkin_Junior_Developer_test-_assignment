import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import CartItem from '../common/CartItem/CartItem';
import TotalPrice from '..//common/TotalPrice/TotalPrice';
import styles from './styles.module.css';

class CartPage extends Component {

  state = {
    isRedirect: false
  }

  handlerCheckout = () => {
    console.log(this.props.productsInCart);
    this.setState({
      isRedirect: true
    });
  }

  render() {

    if (this.state.isRedirect) {
      return <Navigate to='/'/>
    }

    if (!this.props.activeCurrency.label) {
      return null;
    }

    return (
      <div
        className={`${styles.cartPage} ${this.props.className ? this.props.className : ''}`}
      >
        <h2 className={styles.title}>Cart</h2>
        <ul
          className={styles.productInCartList}
        >
          {
            this.props.productsInCart.map((product, index) => {
              return (
              <CartItem
                className={styles.cartItem}
                index={index}
                key={product.id}
                activeCurrency={this.props.activeCurrency}
                selectedAttributeList={product.selectedAttributeList}
                isCart={true}
                product={product}
                incrementProductCount={this.props.incrementProductCount}
                decrementProductCount={this.props.decrementProductCount}
              />)
            })
          }
        </ul>
        <TotalPrice
          className={styles.totalPrice}
          productsInCart={this.props.productsInCart}
          activeCurrency={this.props.activeCurrency}
        />
        <button
          className={styles.btnOrder}
          onClick={this.handlerCheckout}
        >
          Order
        </button>


      </div>
    );
  }
}

export default CartPage;
