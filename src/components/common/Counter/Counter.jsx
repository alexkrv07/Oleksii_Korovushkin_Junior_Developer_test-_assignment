import React, { Component } from 'react';
import styles from './styles.module.css';

class Counter extends Component {
  render() {
    return (
      <div
        className={`${styles.counter} ${this.props.className ? this.props.className : ''}`}
      >
        <button
          className={`${styles.counterBtn} ${styles.btnIncrement}`}
          onClick={ this.props.incrementCount }
        />
        <div
          className={styles.counerValue}
        >
          {this.props.count}
        </div>
        <button
          className={`${styles.counterBtn} ${styles.btnDecrement}`}
          onClick={ this.props.decrementCount }
          />
      </div>
    );
  }
}

export default Counter;
