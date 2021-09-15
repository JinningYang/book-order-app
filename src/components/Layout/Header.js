import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import libraryImage from '../../assets/library.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Library</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={libraryImage} alt='A library full of books!' />
      </div>
    </Fragment>
  );
};

export default Header;