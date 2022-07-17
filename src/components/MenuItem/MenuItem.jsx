import React, { Component } from 'react';
import styles from './styles.module.css';

class MenuItem extends Component {
  setActiveCategory = () => {
    this.props.setActiveCategory(this.props.category);
  };

  render() {
    return (
      <li
        className={
          this.props.category === this.props.activeCategory
            ? `${styles.menuItem} ${styles.active}`
            : styles.menuItem
        }
        onClick={this.setActiveCategory}
      >
        {this.props.category}
      </li>
    );
  }
}

export default MenuItem;
