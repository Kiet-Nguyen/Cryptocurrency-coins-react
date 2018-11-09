import React from 'react';

import globalClasses from '../../containers/App.module.css';
import classes from './Coin.module.css';
import icons from '../../assets/icons';

const formatPriceUSD = (num) => {
  let numSplit;
  let intPart;
  let decimalPart;
  let result;

  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');
  intPart = numSplit[0];
  // Add ',' to seperate thousand
  if (intPart.length > 9) {
    intPart = `${intPart.substring(0, intPart.length - 9)},${intPart.substring(intPart.length - 9, intPart.length - 6)},${intPart.substring(intPart.length - 6, intPart.length - 3)},${intPart.substring(intPart.length - 3, intPart.length)}`;
  } else if (intPart.length > 6) {
    intPart = `${intPart.substring(0, intPart.length - 6)},${intPart.substring(intPart.length - 6, intPart.length - 3)},${intPart.substring(intPart.length - 3, intPart.length)}`;
  } else if (intPart.length > 3) {
    intPart = `${intPart.substring(0, intPart.length - 3)},${intPart.substring(intPart.length - 3, intPart.length)}`;
  }
  decimalPart = numSplit[1];

  result = `${intPart}.${decimalPart}`;
  return result;
};

const Coin = ({
  idCoins, nameCoins, symbolCoins, rankCoins, priceUSDCoins, change24HCoins, markerCapCoins, volumn24HCoins, change1HCoins, change7DaysCoins, cirSupply, totalSupply, maxSupply 
}) => {
  return (
    <div className="col-sm-6 col-md-4">
      <div className={classes.card}>
        <input type="checkbox" id={nameCoins} className={classes.more} aria-hidden="true" />
        <div className={[classes.coinCard, classes.front].join(' ')}>
          <div className="mb-2">
            <img
              src={icons[symbolCoins.toLowerCase()]
                ? icons[symbolCoins.toLowerCase()]
                : `https://s2.coinmarketcap.com/static/img/coins/16x16/${idCoins}.png`
              }
              alt={symbolCoins}
            />
          </div>

          <h2 className={`${globalClasses.heading2} mb-4`}>
            {`${nameCoins} (${symbolCoins})`}
          </h2>

          <h3 className={`${globalClasses.heading3} mb-4`}>
            {`Rank: ${rankCoins}`}
          </h3>

          <ul className="list-unstyled">
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Price: </p>
              <span className={classes.textBlue}>${formatPriceUSD(priceUSDCoins)}</span>
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Change (24h): </p>
              <span style={(change24HCoins > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
                {change24HCoins}
                %
              </span>
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Volumn (24h): </p>
              <span>${formatPriceUSD(volumn24HCoins)}</span>
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Market cap: </p>
              <span>${formatPriceUSD(markerCapCoins)}</span>
            </li>
          </ul>

          <label
            htmlFor={nameCoins}
            aria-hidden="true"
            className={`btn mt-3 ${classes.flipButton}`}
          >
            More details
          </label>
        </div>

        <div className={[classes.coinCard, classes.back].join(' ')}>
          <ul className="list-unstyled">
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Change (1h): </p>
              <span style={(change1HCoins > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
                {change1HCoins}
                %
              </span>
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Change (1h): </p>
              <span style={(change7DaysCoins > 0) ? { color: '#55b3e9' } : { color: '#d94040' }}>
                {change7DaysCoins}
                %
              </span>
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Circularlating supply: </p>
              {formatPriceUSD(cirSupply)}
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Total supply: </p>
              {formatPriceUSD(totalSupply)}
            </li>
            <li className="mb-2">
              <p className={`${classes.textHighlight} mb-0`}>Max supply: </p>
              {formatPriceUSD(maxSupply)}
            </li>
          </ul>
          <label
            htmlFor={nameCoins}
            aria-hidden="true"
            className={`btn mt-3 ${classes.flipButton}`}
          >
            Return
          </label>
        </div>
      </div>
    </div>
  );
};

export default Coin;
