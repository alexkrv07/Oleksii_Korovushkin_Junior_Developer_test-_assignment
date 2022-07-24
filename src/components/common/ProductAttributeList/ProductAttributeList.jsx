import React, { Component } from 'react';
import { getSelectedAttributeId } from '../../../helpers/Product';
import ProductAttributeItem from '../ProductAttributeItem/ProductAttributeItem';
import styles from './styles.module.css';

class ProductAttributeList extends Component {
  updateAttributeList = (id) => {
    const { name } = this.props.arrtibuteList
    this.props.updateAttributeList({
      id,
      name
    })
  }

  render() {
    const { type, name, items } = this.props.arrtibuteList;
    let selectedAttributeId  = '';

    if (this.props.selectedAttributeList.length) {
      selectedAttributeId = getSelectedAttributeId(this.props.selectedAttributeList, name);
    }

    return (
      <div className={`${styles.attributeListWrp} ${this.props.className ? this.props.className : ''}`}
      >
        <h4 className={styles.attributeTitle}>
          {`${name} :`}
        </h4>
        <ul
          className={styles.attributeList}
        >
          {
            items.map(attribute => {
              return (
                <ProductAttributeItem
                  key={attribute.id}
                  type={type}
                  attribute={attribute}
                  selectedAttributeId={selectedAttributeId}
                  updateAttributeList={this.updateAttributeList}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default ProductAttributeList;
