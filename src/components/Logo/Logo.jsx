import React, { Component } from 'react';
import LogoSVG from '../../assets/image/logo.svg';
import styles from './styles.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={this.props.className ? this.props.className : ''}>
        <img src={LogoSVG} className={styles.logo} alt="logo" width="31" height="30"/>
      </div>
    );
  }s
}

export default Logo;
