import React, { Component } from 'react';
import { useParams, } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import ProductList from '../common/ProductList/ProductList';
import { GET_PRODUCTS_BY_CATEGORY } from '../../constants/query/getProductsByCategory';
import styles from './styles.module.css';
import Page404 from '../Page404/Page404';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

class ProductListPage extends Component {

  getProducts = (data) => {
    return data.category.products;
  };

  render() {

    if (!this.props.categories.length) {
      return null;
    }

    let { category } = this.props.params;
    if (!category) {
      category = this.props.categories[0];
    }

    if (category !== this.props.category) {
      this.props.setActiveCategory(category)
    }

    if (category && !this.props.categories.includes(category) ) {
      return (
        <Page404/>
      )
    }

    const input = {
      title: category,
    }

    return (
      <div
        className={`${styles.productPage} ${this.props.className ? this.props.className : ''}`}
      >
        <h2 className={styles.title}>{this.props.category}</h2>
        <Query
          query={GET_PRODUCTS_BY_CATEGORY}
          variables={ {input} }
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return `Error! ${error}`;
            }

            const products = this.getProducts(data);

            return (
              <ProductList
                products={products}
                activeCurrency={this.props.activeCurrency}
                // setProductId={this.props.setProductId}
                addProductToCart={this.props.addProductToCart}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withParams(ProductListPage);
