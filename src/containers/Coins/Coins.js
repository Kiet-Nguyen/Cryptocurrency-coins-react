import React from 'react';
import { objectOf, oneOfType, object, array } from 'prop-types';

import Coin from '../../components/Coin/Coin';

const Coins = ({ coinsDataApp }) => {
  let coinsData = <p>Something went wrong</p>;
  if (coinsDataApp !== null) {
    coinsData = coinsDataApp.map(coin => (
      <Coin
        key={coin.name}
        idCoins={coin.id}
        nameCoins={coin.name}
        symbolCoins={coin.symbol}
        rankCoins={coin.rank}
        priceUSDCoins={coin.quotes.USD.price}
        volumn24HCoins={coin.quotes.USD.volume_24h}
        change24HCoins={coin.quotes.USD.percent_change_24h}
        markerCapCoins={coin.quotes.USD.market_cap}
        change1HCoins={coin.quotes.USD.percent_change_1h}
        change7DaysCoins={coin.quotes.USD.percent_change_7d}
        cirSupply={coin.circulating_supply}
        totalSupply={coin.total_supply}
        maxSupply={coin.max_supply}
      />
    ));
  }

  return (
    <div className="container">
      <div className="my-5 pt-6">
        <div className="row">
          {coinsData}
        </div>
      </div>
    </div>
  );
};

Coins.propTypes = {
  coinsDataApp: objectOf(oneOfType([object, array])).isRequired,
};

export default Coins;
