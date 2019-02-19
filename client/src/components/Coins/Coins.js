import React from 'react';
import {
  object,
  arrayOf,
} from 'prop-types';

import Coin from './Coin/Coin';

const Coins = ({ coinsDataApp }) => {
  let coinsData = <p>Something went wrong</p>;
  if (coinsDataApp !== null) {
    coinsData = coinsDataApp.map(coin => (
      <Coin
        key={coin.name}
        coin={coin}
      />
    ));
  }

  return (
    <div className="py-4">
      <div className="row">
        {coinsData}
      </div>
    </div>
  );
};

Coins.propTypes = {
  coinsDataApp: arrayOf(object).isRequired,
};

export default Coins;
