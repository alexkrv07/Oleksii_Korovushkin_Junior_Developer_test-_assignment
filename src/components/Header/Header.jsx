import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import styles from './styles.module.css';

class Header extends Component {
  render() {
    const isRender = this.props.categories
      && this.props.activeCategory;
    console.log(this.props.categories);

    console.log(this.props.activeCategory);
    if (isRender) {
      return (
        <header className={styles.header}>
          <div className="container">
            <div className={styles.container}>
              <Navbar
                className="menu"
                categories={this.props.categories}
                activeCategory={this.props.activeCategory}
                setActiveCategory={this.props.setActiveCategory}
              ></Navbar>
              <Logo/>
            </div>
          </div>
        </header>
      );
    }
   return null
  }
}

export default Header;
