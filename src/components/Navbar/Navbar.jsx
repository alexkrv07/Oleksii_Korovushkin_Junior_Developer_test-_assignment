import React, { Component } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import styles from './styles.module.css';

const GET_CATEGORIES = gql`
  query GetCategories  {
    categories {
      name
    }
  }
`;

class Navbar extends Component {

  getCategories = (data) => {
    return data.categories.map(category => category.name);
  };

  setInitialCategory = (data) => {
    const categories = this.getCategories(data);
    const initialCategory = categories[0];
    this.props.setActiveCategory(initialCategory);
  };

  render() {
    const activeCategory = this.props.activeCategory;

    return (
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          <Query
            query={GET_CATEGORIES}
            onCompleted={(data) => this.setInitialCategory(data)}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return null;
              }

              if (error) {
                return `Error! ${error}`;
              }

              const categories = this.getCategories(data);

              return (
                categories.map((category, index) =>
                  <MenuItem
                    key={index}
                    setActiveCategory={this.props.setActiveCategory}
                    category={category}
                    activeCategory={activeCategory}
                  />
                )
              );
            }}
          </Query>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
