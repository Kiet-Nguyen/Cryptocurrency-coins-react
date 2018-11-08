/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

import './App.module.css';
import Header from '../components/Header/Header';
import Coins from './Coins/Coins';

class App extends Component {
  state = {
    coins: [],
    searchInput: '',
    searchCoins: [],
    changeTimeout: null,
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

  componentDidMount = async () => {
    try {
      const results = await axios.get('/ticker/?limit=2000');
      const numOfCoins = results.data.slice(0, 99);
      this.setState({ coins: numOfCoins });
      this.setState({ searchCoins: numOfCoins });
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    const { searchInput, searchCoins } = this.state;
    return (
      <React.Fragment>
        <Header
          searchInputApp={searchInput}
          changeSearchValueApp={this.changeSearchInputHandler}
        />

        <Coins
          coinsDataApp={searchCoins}
        />
      </React.Fragment>
    );
  }
}

export default App;
