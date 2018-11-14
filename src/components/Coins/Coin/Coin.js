import React from 'react';

import globalClasses from '../../../containers/App.module.css';
import classes from './Coin.module.css';
import icons from '../../../assets/icons';

const formatPriceUSD = (num) => {
  let number = num;
  number = Math.abs(number);
  number = number.toFixed(2);

  const numSplit = number.split('.');
  let intPart = numSplit[0];
  const decimalPart = numSplit[1];
  // Add ',' to seperate thousand
  if (intPart.length >= 4) {
    intPart = intPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  const result = `${intPart}.${decimalPart}`;
  return result;
};

const Coin = ({ coin }) => (
  <div className="col-sm-6 col-md-4 col-lg-3">
    <div className={classes.card}>
      <input type="checkbox" id={coin.name} className={classes.more} aria-hidden="true" />
      <div className={[classes.coinCard, classes.front].join(' ')}>
        <div className="mb-2">
          <img
            src={icons[coin.symbol.toLowerCase()]
              ? icons[coin.symbol.toLowerCase()]
              : `https://s2.coinmarketcap.com/static/img/coins/16x16/${coin.id}.png`
            }
            alt={coin.symbol}
          />
        </div>

        <h2 className={`${globalClasses.heading2} mb-4`}>
          {`${coin.name} (${coin.symbol})`}
        </h2>

        <h3 className={`${globalClasses.heading3} mb-4`}>
          {`Rank: ${coin.rank}`}
        </h3>

        <ul className="list-unstyled">
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Price: </p>
            <span className={classes.textBlue}>
              $
              {formatPriceUSD(coin.quotes.USD.price)}
            </span>
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Change (24h): </p>
            <span style={(coin.quotes.USD.percent_change_24h > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
              {coin.quotes.USD.percent_change_24h}
              %
            </span>
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Volumn (24h): </p>
            <span>
              $
              {formatPriceUSD(coin.quotes.USD.volume_24h)}
            </span>
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Market cap: </p>
            <span>
              $
              {formatPriceUSD(coin.quotes.USD.market_cap)}
            </span>
          </li>
        </ul>

        <label htmlFor={coin.name} aria-hidden="true" className={`btn mt-3 ${classes.flipButton}`}>
          More details
        </label>
      </div>

      <div className={[classes.coinCard, classes.back].join(' ')}>
        <ul className="list-unstyled">
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Change (1h): </p>
            <span style={(coin.quotes.USD.percent_change_1h > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
              {coin.quotes.USD.percent_change_1h}
              %
            </span>
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Change (1h): </p>
            <span style={(coin.quotes.USD.percent_change_7d > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
              {coin.quotes.USD.percent_change_7d}
              %
            </span>
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Circularlating supply: </p>
            {formatPriceUSD(coin.circulating_supply)}
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Total supply: </p>
            {formatPriceUSD(coin.total_supply)}
          </li>
          <li className="mb-2">
            <p className={`${classes.textHighlight} mb-0`}>Max supply: </p>
            {formatPriceUSD(coin.max_supply)}
          </li>
        </ul>

        <label htmlFor={coin.name} aria-hidden="true" className={`btn mt-3 ${classes.flipButton}`}>
          Return
        </label>
      </div>
    </div>
  </div>
);

export default Coin;
