import React, { Component } from 'react';
import axios from 'axios';
import cls from 'classnames';
import './index.css';

class Modal extends Component {
  state = {
    detailData: null,
  }

  handleGetDetailData = async () => {
    const { item } = this.props;
    const { data } = await axios.get(item.url);
    this.setState({ detailData: data });
  }

  async componentDidUpdate(prevProps) {
    const { item } = this.props;
    if (!prevProps.item && item) {
      this.handleGetDetailData();
    } else if (prevProps.item && item) {
      if (prevProps.item.name !== item.name) {
        this.handleGetDetailData();
      }
    }
  }

  renderImages = () => {
    const { detailData } = this.state;
    if (!detailData) return null;
    const { front_default, back_default, front_shiny, back_shiny } = detailData.sprites;
    return (
      <div className="images u-flex u-flexJustifyContentSpaceBetween">
        <img src={front_default} alt="" />
        <img src={back_default} alt="" />
        <img src={front_shiny} alt="" />
        <img src={back_shiny} alt="" />
      </div>
    )
  }

  renderDetail = () => {
    const { detailData } = this.state;
    if (!detailData) return null;
    const { species, height, weight, base_experience } = detailData;
    return (
      <div className="details">
        <p>Species : {species.name}</p>
        <p>Height : {height} cm</p>
        <p>Weight : {weight} kg</p>
        <p>Base Experience : {base_experience}</p>
      </div>
    )
  }

  renderAbilities = () => {
    const { detailData } = this.state;
    if (!detailData) return null;
    const { abilities } = detailData;

    return (
      <div className="abilities">
        Abilities:
        {
          abilities.map((item, i) => (
            <p key={item.ability.name}>
              {i + 1}. {item.ability.name}
            </p>
          ))
        }
      </div>
    )
  }

  renderLoading = () => (
    <p>
      Please wait...
    </p>
  )

  handleCloseModal = () => {
    const { handleSelectItem } = this.props;
    this.setState({ detailData: null });
    handleSelectItem(null)

  }

  render() {
    const { detailData } = this.state;
    const { item } = this.props;
    const isItemExist = item;

    return (
      <div className={cls("modale", {
        'opened': item,
      })} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-header">
            <h2 className="u-capitalize">{isItemExist && item.name}</h2>
            <div className="btn-close u-cursorPointer closemodale" aria-hidden="true" onClick={this.handleCloseModal}>&times;</div>
          </div>
          <div className="modal-body">
            {!detailData && this.renderLoading()}
            {this.renderImages()}
            {this.renderDetail()}
            {this.renderAbilities()}
          </div>
          <div className="modal-footer">

          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
