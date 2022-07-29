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
    let mainStyle = `${this.props.className ? this.props.className : ''}`;
    if (this.props.isOverlay) {
      mainStyle += ' ' + styles.attributeListWrpOverlay;
    } else if (this.props.isCart) {
      mainStyle += ' ' + styles.attributeListWrpCart;
    } else {
      mainStyle += ' ' + styles.attributeListWrp;
    }

    const { type, name, items } = this.props.arrtibuteList;
    let selectedAttributeId  = '';

    if (this.props.selectedAttributeList.length) {
      selectedAttributeId = getSelectedAttributeId(this.props.selectedAttributeList, name);
    }

    return (
      <div className={mainStyle}
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
                  isOverlay={this.props.isOverlay}
                  isCart={this.props.isCart}
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
