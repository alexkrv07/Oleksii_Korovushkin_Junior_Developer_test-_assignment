import React, { Component } from 'react';
import styles from './styles.module.css';

class ProductAttributeList extends Component {
  render() {
    const { type, name, items } = this.props.arrtibuteList;

    return (
      <div className={`${styles.attributeListWrp} ${this.props.className ? this.props.className : ''}`}
      >
        <h4 className={styles.attributeTitle}>
          {`${name} :`}
        </h4>
        <ul
          className={styles.attributeList}
        >
          {type === 'text'
            ? items.map(attribute => {
              return (
                <li
                  className={styles.attributeItemText}
                  key={attribute.id}
                >
                  {attribute.value}
                </li>
              )
            })
            : items.map(attribute => {
              return (
                <li
                  className={styles.attributeItemSwatch}
                  key={attribute.id}
                  style={{backgroundColor: attribute.value}}
                >
                </li>
              )
            })
          }
        </ul>
      </div>


    );
  }
}

export default ProductAttributeList;
