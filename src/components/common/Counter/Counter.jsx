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
          onClick={ this.props.increment }
        />
        <div
          className={styles.counerValue}
        >
          {this.props.count}5
        </div>
        <button
          className={`${styles.counterBtn} ${styles.btnDecrement}`}
          onClick={ this.props.decrement }
          />
      </div>
    );
  }
}

export default Counter;
