import React, { Component } from 'react';
import { fetchPokemonCharacter } from '../../utils/services/pokemonCharacter';
import ListCard from '../../components/ListCard/index.js';
import Modal from '../../components/Modal/index.js';
import throttle from '../../utils/helpers/throttle.js';

class HomePage extends Component {
  state = {
    data: null,
    selectedItem: null,
    hasMore: true,
    isLoadingMore: false,
    offset: 20,
  }

  async componentDidMount() {
    await this.handleFetchData();
    window.addEventListener('scroll', this.throttleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll);
  }

  handleSelectItem = (item) => {
    this.setState({ selectedItem: item });
  }

  renderLoading = () => {
    const { data, isLoadingMore } = this.state;
    if (!data || isLoadingMore) {
      return (
        <p className="u-textAlignCenter u-paddingVertical16">Please wait...</p>
      )
    }
  }

  renderContent = () => {
    const { data } = this.state;
    this.renderLoading()
    return data && data.map((item, index) => (
      <ListCard
        key={`${item.name}-${index}`}
        item={item}
        handleSelectItem={() => this.handleSelectItem(item)}
      />
    ))
  }

  handleFetchData = async () => {
    const { data, offset } = this.state;
    this.setState({ isLoadingMore: true })
    try {
      if (!data) {
        const { data: respData } = await fetchPokemonCharacter();
        this.setState({ data: respData.results, hasMore: true, isLoadingMore: false });
      } else {
        const { data: respData } = await fetchPokemonCharacter(offset + 10, 10);
        this.setState({ data: [...data, ...respData.results], offset: offset + 10 });
        if (respData.results.length < 10) {
          this.setState({ isLoadingMore: false, hasMore: false });
        } else {
          this.setState({ isLoadingMore: false, hasMore: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  throttleScroll = throttle(() => this.handleScroll(), 150)

  handleScroll = async () => {
    const { isLoadingMore, hasMore } = this.state;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || window.pageYOffset || 0;
    const scroll = window.innerHeight + scrollTop;
    const height = doc.offsetHeight;
    if (isLoadingMore || !hasMore) return;
    if (scroll >= height) {
      await this.handleFetchData();
    }
  }

  render() {
    const { selectedItem } = this.state;
    return (
      <div className="homePage-container">
        <Modal
          item={selectedItem}
          handleSelectItem={this.handleSelectItem}
        />
        {this.renderContent()}
        {this.renderLoading()}
      </div>
    )
  }
}

export default HomePage;
