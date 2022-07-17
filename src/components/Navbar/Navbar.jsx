import React, { Component } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import styles from './styles.module.css';

class Navbar extends Component {
  setActiveCategory = (category) => {
    this.props.setActiveCategory(category);
  };

  setActiveCurrency = (currency) => {
    this.props.setActiveCategory(currency);
  };

  render() {
    const categories = this.props.categories;
    const activeCategory = this.props.activeCategory;
    return (
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {categories.map((category, index) =>
            <MenuItem
              key={index}
              setActiveCategory={this.setActiveCategory}
              category={category}
              activeCategory={activeCategory}
            />
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
