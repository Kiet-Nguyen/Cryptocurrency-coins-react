import React from 'react';

import globalClasses from '../../containers/App.module.css';
import classes from './Coin.module.css';
import icons from '../../assets/icons';

const formatPriceUSD = (num) => {
  let numSplit = [];
  let intPart = null;
  let decimalPart = null;
  let result = '';

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

  result = `$${intPart}.${decimalPart}`;
  return result;
};

const formatPriceBTC = (num) => {
  const number = parseFloat(num);
  const formatedNum = number.toFixed(4);
  return formatedNum;
};

const Coin = ({
  nameCoins, symbolCoins, rankCoins, priceUSDCoins, priceBTCCoins, markerCapCoins 
}) => {
  return (
    <div className="col-3">
      <div className={classes.coinCard}>
        <div className="mb-2">
          <img
            src={icons[symbolCoins.toLowerCase()] ? icons[symbolCoins.toLowerCase()] : icons.dai}
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
          <li className="mb-1">
            {`Price: ${formatPriceUSD(priceUSDCoins)}`}
          </li>
          <li className="mb-1">
            Price BTC:
            {formatPriceBTC(priceBTCCoins)}
          </li>
          <li className="mb-1">
            Market cap:
            <br />
            {formatPriceUSD(markerCapCoins)}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Coin;
