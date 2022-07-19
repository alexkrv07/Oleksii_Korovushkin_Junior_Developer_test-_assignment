import React, { Component } from 'react';
import styles from './styles.module.css';

class Image extends Component {
  render() {
    return (
      <img
        className={`${styles.image} ${this.props.className ? this.props.className : ''}`}
        alt={this.props.alt}
        src={this.props.src}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Image;
