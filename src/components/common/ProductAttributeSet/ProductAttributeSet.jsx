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
              selectedAttributeList={this.props.selectedAttributeList}
              updateAttributeList={this.props.updateAttributeList}
            />
          )
        })}
      </ul>
    );
  }
}

export default ProductAttributeSet;
