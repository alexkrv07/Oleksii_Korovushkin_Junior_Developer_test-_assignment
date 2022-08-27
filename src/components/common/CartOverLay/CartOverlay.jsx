import React, { Component } from "react";
import { Link } from "react-router-dom";
import ButtonCartOverlay from "../ButtonCartOverlay/ButtonCartOverlay";
import TotalPrice from "../TotalPrice/TotalPrice";
import { getProductsTotalCount } from "../../../helpers/Product";
import styles from "./styles.module.css";
import CartItem from "../CartItem/CartItem";

class CartOverlay extends Component {
  handlerOnClick = (evt) => {
    evt.stopPropagation();
    this.props.toggleCurrencyOverlay(false);
    this.props.toggleOverlay(!this.props.isOverlay);
    document.addEventListener("click", this.closeCartOverlay);
  };

  closeCartOverlay = (evt) => {
    const CartOverlay = document.querySelector(".cartOverlay");
    if (evt.target === CartOverlay) {
      return;
    }
    this.props.toggleOverlay(false);
    document.removeEventListener("click", this.closeCartOverlay);
  };

  handlerCheckout = (evt) => {
    console.log(this.props.productsInCart);
    this.closeCartOverlay(evt);
  };

  handlerViewBag = (evt) => {
    this.closeCartOverlay(evt);
  };

  render() {
    const count = getProductsTotalCount(this.props.productsInCart);
    const items = count === 1 ? "item" : "items";

    return (
      <div
        className={`${styles.cartOverlayWrp} cartOverlay ${
          this.props.className ? this.props.className : ""
        }`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <ButtonCartOverlay items={count} handler={this.handlerOnClick} />
        {this.props.isOverlay && (
          <div className={styles.cartOverlay}>
            <h3 className={styles.cartOverlayTitle}>
              My bag,
              <span>{` ${count} ${items}`}</span>
            </h3>
            <ul className={styles.productList}>
              {this.props.productsInCart.map((product, index) => {
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
                  />
                );
              })}
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
                Wiew bag
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
