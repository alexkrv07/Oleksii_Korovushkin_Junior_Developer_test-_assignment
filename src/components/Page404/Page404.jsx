import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

class Page404 extends Component {
  render() {
    return (
      <div
        className={`${styles.page404} ${this.props.className ? this.props.className : ''}`}
      >
        <h2 className={styles.title}>
          <span className={styles.code}>404 Not Found</span>
          Go to
          <Link to={`/`}> Home </Link>
          page
        </h2>

      </div>
    );
  }
}

export default Page404;
