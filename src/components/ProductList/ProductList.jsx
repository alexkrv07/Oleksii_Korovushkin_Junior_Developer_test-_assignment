import React, { Component } from 'react';
import ProductCard from '../ProductCord/ProductCard';
import styles from './styles.module.css';

class ProductList extends Component {
  render() {
    return (
      <ul className={styles.productList}>
         {this.props.products.map((product) => {
          return (
            <ProductCard
              className={styles.productItem}
              // className={`${styles.imageWrp} ${this.props.className ? this.props.className : ''}`}
              key={product.id}
              product={product}
              activeCurrency={this.props.activeCurrency}
            />
          )})}
      </ul>
    );
  }
}

export default ProductList;
