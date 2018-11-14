import React from 'react';
import { string, func } from 'prop-types';

import classes from './Header.module.css';
import icons from '../../assets/icons';

const Header = ({ searchInputApp, changeSearchValueApp }) => (
  <nav className={`navbar navbar-expand-lg navbar-light py-3 ${classes.bgBlue}`}>
    <div className="container">
      <a className="navbar-brand text-white" href="/">
        <h1 className="h4">Cryptocurrencies</h1>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="ml-auto">
          <form className="form-block my-2 my-lg-0 position-relative">
            <input
              className={`${classes.inputCustom} form-control mr-sm-2 position-relative`}
              type="search"
              placeholder="Search name"
              aria-label="Search"
              value={searchInputApp}
              onChange={changeSearchValueApp}
            />
            <span className={`my-2 my-sm-0 ${classes.buttonPosition}`}>
              <img src={icons.search} alt="Search" />
            </span>
          </form>
        </div>
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  searchInputApp: string.isRequired,
  changeSearchValueApp: func.isRequired,
};

export default Header;
