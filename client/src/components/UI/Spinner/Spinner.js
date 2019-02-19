import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => (
  <div className="py-5">
    <div className={classes.loader}>Loading...</div>
  </div>
);

export default Spinner;
