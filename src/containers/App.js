/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

import classes from './App.module.css';
import Header from '../components/Header/Header';
import Coins from './Coins/Coins';
import Spinner from '../components/UI/Spinner/Spinner';

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
        const results = await axios.get(`?start=${startValue}&limit=12`);
        const resultsArray = this.apiResultToArray(results);
        this.setState({
          startValue: startValue + 13,
          hasMore: coins.length < 2093,
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
    } = this.state;

    return (
      <div className={classes.bgLightGray}>
        <Header
          searchInputApp={searchInput}
          changeSearchValueApp={this.changeSearchInputHandler}
        />

        <Coins
          coinsDataApp={searchCoins}
        />

        <div className="container text-center">
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
    );
  }
}

export default App;
