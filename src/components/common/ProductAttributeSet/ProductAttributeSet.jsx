import React, { Component } from 'react';
import ProductAttributeList from '../ProductAttributeList/ProductAttributeList';
import styles from './styles.module.css';

class ProductAttributeSet extends Component {

  render() {

    let mainStyle = `${this.props.className ? this.props.className : ''}`;
    if (this.props.isOverlay) {
      mainStyle += ' ' + styles.attributeSetOverlay;
    } else if (this.props.isCart) {
      mainStyle += ' ' + styles.attributeSetCart;
    } else {
      mainStyle += ' ' + styles.attributeSet;
    }
    return (
      <ul
        className={mainStyle}
      >
        {this.props.arrtibuteSet.map((attributeList, index) => {
          return (
            <ProductAttributeList
              key={index}
              className={styles.attrbuteList}
              arrtibuteList={attributeList}
              selectedAttributeList={this.props.selectedAttributeList}
              updateAttributeList={this.props.updateAttributeList}
              isOverlay={this.props.isOverlay}
              isCart={this.props.isCart}
            />
          )
        })}
      </ul>
    );
  }
}

export default ProductAttributeSet;
