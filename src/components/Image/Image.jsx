import React, { Component } from 'react';
import styles from './styles.module.css';

class Image extends Component {
  render() {
    return (
      <div  className={`${styles.imageWrp} ${this.props.className ? this.props.className : ''}`}>
        <img
          className={styles.image}
          alt={this.props.alt}
          src={this.props.src}
        />
      </div>

    );
  }
}

export default Image;
