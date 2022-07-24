import React, { Component } from 'react';
import styles from './styles.module.css';

class ProductAttributeItem extends Component {
  render() {
    const { id, value } = this.props.attribute;
    const isActive = this.props.selectedAttributeId === this.props.attribute.id;
    const isSwatch = this.props.type === 'swatch';

    const mainStyle = isSwatch ? styles.attributeItemSwatch : styles.attributeItemText;
    const activeStyle = isActive ? styles.active : '';
    const styleAttributeItem = `${mainStyle} ${activeStyle} ${this.props.className ? this.props.className : ''}`;

    return (
      <li
        className={styleAttributeItem}
        key={id}
        style={{backgroundColor: isSwatch ? value : ''}}
        onClick={() => this.props.updateAttributeList(id)}
      >
        {!isSwatch && value}
      </li>
    )
  }
}

export default ProductAttributeItem;
