import React, { Component } from 'react';
import styles from './styles.module.css';

class ProductAttributeItem extends Component {
  render() {
    const { id, value } = this.props.attribute;
    const isActive = this.props.selectedAttributeId === this.props.attribute.id;
    const isSwatch = this.props.type === 'swatch';

    let mainStyle = '';
    if (this.props.isOverlay) {
      mainStyle += isSwatch ? ' ' + styles.attributeItemSwatchOverlay : ' ' + styles.attributeItemTextOverLay;
    } else if (this.props.isCart) {
      mainStyle += isSwatch ? ' ' + styles.attributeItemSwatchCart : ' ' + styles.attributeItemTextCart;
    } else {
      mainStyle += isSwatch ? ' ' + styles.attributeItemSwatch : ' ' + styles.attributeItemText;
    }

    const activeStyle = isActive ? styles.active : '';
    const styleAttributeItem = `${mainStyle} ${activeStyle} ${this.props.className ? this.props.className : ''}`;

    if (isSwatch) {
      return (
        <li
          className={styleAttributeItem}
          key={id}
          style={{backgroundColor: value }}
          onClick={() => this.props.updateAttributeList(id)}
        />
      )
    }

    return (
      <li
        className={styleAttributeItem}
        key={id}
        onClick={() => this.props.updateAttributeList(id)}
      >
        {value}
      </li>
    )
  }
}

export default ProductAttributeItem;
