import React, { Component } from 'react';
import ProductAttributeList from '../ProductAttributeList/ProductAttributeList';
import styles from './styles.module.css';

class ProductAttributeSet extends Component {

  render() {
    return (
      <ul
        className={`${styles.attributeSet} ${this.props.className ? this.props.className : ''}`}
      >
        {this.props.arrtibuteSet.map(attributeList => {
          return (
            <ProductAttributeList
              key={attributeList.id}
              className={styles.attrbuteList}
              arrtibuteList={attributeList}
            />
          )
        })}
      </ul>
    );
  }
}

export default ProductAttributeSet;
