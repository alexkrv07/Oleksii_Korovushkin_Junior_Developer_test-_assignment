import React, { Component } from 'react';
import ProductCard from '../ProductCord/ProductCard';
import styles from './styles.module.css';

class ProductList extends Component {
  render() {
    return (
      <ul
        className={`${styles.productList} ${this.props.className ? this.props.className : ''}`}
      >
         {this.props.products.map((product) => {
          return (
            <ProductCard
              className={styles.productItem}
              key={product.id}
              product={product}
              activeCurrency={this.props.activeCurrency}
              setProductId={this.props.setProductId}
            />
          )})}
      </ul>
    );
  }
}

export default ProductList;
