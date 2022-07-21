import React, { Component } from 'react';
import Image from '../Image/Image';
import styles from './styles.module.css';

class ImageList extends Component {
  render() {
    return (
      <ul
        className={`${styles.imageList} ${this.props.className ? this.props.className : ''}`}
      >
        {this.props.gallery.map((imgSrc, index) => {
          return (
            <li
              key={index}
              className={styles.imageItem}
              onClick={() => this.props.setActiveImage(imgSrc)}
            >
              <Image
                className={styles.image}
                src={imgSrc}
                alt={this.props.alt}
              />
            </li>
          )
        })}
      </ul>
    );
  }
}

export default ImageList;
