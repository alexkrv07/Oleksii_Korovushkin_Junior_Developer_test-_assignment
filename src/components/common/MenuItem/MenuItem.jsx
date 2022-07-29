import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link
          className={styles.link}
          to={`/${this.props.category}`}
        >
          {this.props.category}
        </Link>
      </li>
    );
  }
}

export default MenuItem;
