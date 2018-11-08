import React from 'react';
import { arrayOf, object } from 'prop-types';

import Coin from '../../components/Coin/Coin';

const Coins = ({ coinsDataApp }) => {
  let coinsData = <p>Something went wrong</p>;
  if (coinsDataApp !== null) {
    coinsData = coinsDataApp.map(coin => (
      <Coin
        key={coin.name}
        nameCoins={coin.name}
        symbolCoins={coin.symbol}
        rankCoins={coin.rank}
        priceUSDCoins={coin.price_usd}
        volumn24HCoins={coin['24h_volume_usd']}
        change24HCoins={coin.percent_change_24h}
        markerCapCoins={coin.market_cap_usd}
      />
    ));
  }

  return (
    <div className="container">
      <div className="my-5">
        <div className="row">
          {coinsData}
        </div>
      </div>
    </div>
  );
};

Coins.propTypes = {
  coinsDataApp: arrayOf(object).isRequired,
};

export default Coins;
