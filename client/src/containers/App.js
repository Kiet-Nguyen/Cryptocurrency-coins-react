/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

import classes from './App.module.css';
import Header from '../components/Header/Header';
import Coins from '../components/Coins/Coins';
import Spinner from '../components/UI/Spinner/Spinner';
import Button from '../components/UI/Button/Button';

class App extends Component {
  state = {
    coins: [],
    searchInput: '',
    searchCoins: [],
    changeTimeout: null,
    startValue: 0,
    error: false,
    hasMore: true,
    isLoading: false,
    descending: true,
  }

  changeSearchInputHandler = (event) => {
    this.setState({ searchInput: event.target.value });

    if (this.state.changeTimeout) {
      clearTimeout(this.state.changeTimeout);
    }

    const timeout = setTimeout(this.searchCoins, 500);
    this.setState({
      changeTimeout: timeout,
    });
  }

  searchCoins = () => {
    if (this.state.searchInput !== '') {
      const inputValue = this.state.searchInput.toUpperCase();
      const filteredData = [];

      this.state.coins.map((coin) => {
        const coinName = coin.name.toUpperCase();
        const partOfCoinName = coinName.includes(inputValue);

        if (partOfCoinName) {
          filteredData.push(coin);
        }
        return filteredData;
      });
      this.setState({ searchCoins: filteredData });
    } else {
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ searchCoins: this.state.coins });
    }
  }

  apiResultToArray = (result) => {
    const transformedData = Object.keys(result.data.data)
      .map(key => [...Array(result.data.data[key])]
        .map(coin => coin))
      .reduce((arr, el) => arr.concat(el), []);
    return transformedData;
  }

  handleScroll = () => {
    const {
      loadCoinCards,
      state: {
        error,
        isLoading,
        hasMore,
      },
    } = this;

    if (error || isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadCoinCards();
    }
  }

  loadCoinCards = () => {
    const {
      state: {
        startValue,
        coins,
        searchCoins,
      },
    } = this;

    this.setState({ isLoading: true }, async () => {
      try {
        const results = await axios.get('/api/coins');
        const resultsArray = this.apiResultToArray(results);
        console.log('resultsArray:', resultsArray);
        this.setState({
          startValue: startValue + 13,
          isLoading: false,
          coins: [
            ...coins,
            ...resultsArray,
          ],
          searchCoins: [
            ...searchCoins,
            ...resultsArray,
          ],
        });
      } catch (error) {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      }
    });
  }

  sortCoinCard = (des, type) => {
    const {
      state: {
        searchCoins,
        descending,
      },
    } = this;
    // Check sort mode: descending or ascending
    const mod = des ? 1 : -1;

    const sortCoinCards = [...searchCoins];
    let valueA;
    let valueB;

    sortCoinCards.sort((a, b) => {
      if (type === 'price') {
        valueA = a.quote.USD[type];
        valueB = b.quote.USD[type];
      } else {
        valueA = a[type];
        valueB = b[type];
      }
      // Switch mode
      if (valueA < valueB) {
        return 1 * mod;
      } if (valueA > valueB) {
        return -1 * mod;
      }
      return 0;
    });

    if (descending) {
      this.setState({ descending: false });
    } else {
      this.setState({ descending: true });
    }
    this.setState({ searchCoins: sortCoinCards });
  }

  getSortTypeDataFromChild = (dataFromChild) => {
    const sortTypeArr = dataFromChild;
    return sortTypeArr;
  }

  componentWillMount = () => {
    this.loadCoinCards();
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const {
      searchInput,
      searchCoins,
      error,
      hasMore,
      isLoading,
      descending,
    } = this.state;

    const sortValueArr = ['name', 'cmc_rank', 'price'];

    return (
      <div className={classes.bgLightGray}>
        <Header
          searchInputApp={searchInput}
          changeSearchValueApp={this.changeSearchInputHandler}
        />

        <div className="container">
          <Button
            clickedSortApp={this.sortCoinCard}
            desOrAsceApp={descending}
            sortValueNameApp={sortValueArr[0]}
          >
            Sort by name
          </Button>
          <Button
            clickedSortApp={this.sortCoinCard}
            desOrAsceApp={descending}
            sortValueNameApp={sortValueArr[1]}
          >
            Sort by rank
          </Button>
          <Button
            clickedSortApp={this.sortCoinCard}
            desOrAsceApp={descending}
            sortValueNameApp={sortValueArr[2]}
          >
            Sort by price
          </Button>

          <Coins coinsDataApp={searchCoins} />

          <div className="container text-center pb-5">
            {error && (
              <div style={{ color: '#900' }}>
                {error}
              </div>
            )}

            {isLoading && (
              <Spinner />
            )}

            {!hasMore && (
              <div>You reached the end!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
