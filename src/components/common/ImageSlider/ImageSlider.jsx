import React, { Component } from 'react';
import Image from '../Image/Image';
import styles from './styles.module.css';

class ImageSlider extends Component {
  state = {
    activeImage: 0
  }

  setActveImage = (activeImageNumber) => {
    this.setState({
      activeImage: activeImageNumber
    });
  }

  getPrevImage = () => {
    const length = this.props.gallery.length;
    if (this.state.activeImage === 0) {
      return length - 1;
    }
    return this.state.activeImage - 1;
  }

  getNextImage = () => {
    const length = this.props.gallery.length;
    if (this.state.activeImage === length - 1) {
      return 0;
    }
    return this.state.activeImage + 1;
  }

  render() {

    const activeImage = this.state.activeImage;
    const prevImage = this.getPrevImage();
    const nextImage = this.getNextImage();


    if (this.props.gallery.length === 1) {
      return (
        <div
          className={`${styles.mainImageWrp} ${this.props.className ? this.props.className : ''}`}
        >
          <Image
            className={styles.mainImage}
            alt={this.props.alt}
            src={this.props.gallery[0]}
          />
        </div>
      )
    }
    return (
      <div
        className={`${styles.mainImageWrp} ${this.props.className ? this.props.className : ''}`}
      >
        <ul
          className={styles.imageList}
        >
          {this.props.gallery.map((imgSrc, index) => {
            let styleImageItem = styles.imageItem;
            if (index === activeImage) {
              styleImageItem += ' ' + styles.activeImageItem
            } else if (index === prevImage) {
              styleImageItem += ' ' + styles.prevImageItem
            } else if (index === nextImage) {
              styleImageItem += ' ' + styles.nextImageItem
            }

            return (
              <li
                key={index}
                className={styleImageItem}
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
        <div className={styles.blockBtn}>
          <button
            className={styles.btnSlidePrev}
            onClick={() => this.setActveImage(prevImage)}
          >
            <span className={styles.btnIcon}></span>
          </button>
          <button
            className={styles.btnSlideNext}
            onClick={() => this.setActveImage(nextImage)}
          >
            <span className={styles.btnIcon}></span>
          </button>
        </div>

      </div>
    );
  }
}

export default ImageSlider;
