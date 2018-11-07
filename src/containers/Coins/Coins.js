import React, { Component } from 'react';
import axios from 'axios';

import Coin from '../../components/Coin/Coin';

class Coins extends Component {
  state = {
    coins: [],
  }

  componentDidMount = async () => {
    try {
      const results = await axios.get('/ticker/?limit=2000');
      const numOfCoins = results.data.slice(0, 99);
      this.setState({ coins: numOfCoins });
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    const { coins } = this.state;

    let coinsData = <p>Something went wrong</p>;
    if (coins !== null) {
      coinsData = coins.map(coin => (
        <Coin
          key={coin.name}
          nameCoins={coin.name}
          symbolCoins={coin.symbol}
          rankCoins={coin.rank}
          priceUSDCoins={coin.price_usd}
          priceBTCCoins={coin.price_btc}
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
  }
}

export default Coins;
