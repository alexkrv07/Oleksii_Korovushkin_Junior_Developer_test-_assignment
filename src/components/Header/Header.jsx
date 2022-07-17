import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import styles from './styles.module.css';

class header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className="container">
          <div className={styles.container}>
            <nav className="menu"></nav>
            <Logo/>
          </div>
        </div>
      </header>
    );
  }
}

export default header;
