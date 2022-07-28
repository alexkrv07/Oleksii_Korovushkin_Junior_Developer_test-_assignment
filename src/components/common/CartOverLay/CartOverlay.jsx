import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonCartOverlay from '../ButtonCartOverlay/ButtonCartOverlay';
import TotalPrice from '../TotalPrice/TotalPrice';
import { getProductsTotalCount } from '../../../helpers/Product';
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';

class CartOverlay extends Component {
  state = {
    isOpen: false,
  }

  handlerOnClick = () => {
    this.props.toggleOverlay(!this.props.isOverlay);
  }

  handlerCheckout = () => {
    console.log(this.props.productsInCart);
    this.props.toggleOverlay(false);
  }

  handlerViewBag = () => {
    this.props.toggleOverlay(false);
    this.props.toggleIsCart(true);
  }

  render() {
    const count = getProductsTotalCount(this.props.productsInCart);
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
              <ul className={styles.productList}>
                {
                  this.props.productsInCart.map((product, index) => {
                    return (
                    <CartItem
                      index={index}
                      key={product.id}
                      activeCurrency={this.props.activeCurrency}
                      selectedAttributeList={product.selectedAttributeList}
                      isOverlay={true}
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
                isOverlay={true}
              />
              <div className={styles.bntBlock}>
                <Link
                  className={styles.btnBag}
                  to={`/cart`}
                  onClick={this.handlerViewBag}
                >
                {/* <button
                  className={styles.btnBag}
                  onClick={this.handlerViewBag}
                > */}
                  Wiew bag
                {/* </button> */}
                </Link>
                <button
                  className={styles.btnCheckout}
                  onClick={this.handlerCheckout}
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
