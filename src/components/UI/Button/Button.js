import React from 'react';
import { string, func, bool } from 'prop-types';

import classes from './Button.module.css';

const Button = ({
  children,
  clickedSortApp,
  desOrAsceApp,
  sortValueNameApp,
}) => (
  <button
    type="button"
    className={classes.sortButton}
    onClick={() => clickedSortApp(desOrAsceApp, sortValueNameApp)}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: string.isRequired,
  clickedSortApp: func.isRequired,
  desOrAsceApp: bool.isRequired,
  sortValueNameApp: string.isRequired,
};

export default Button;
