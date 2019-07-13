import React, { Component } from 'react';
import './index.css'

class ExpandableCard extends Component {
  render() {
    const { item, handleSelectItem } = this.props;

    return (
      <div
      className="listCardContainer u-height50 u-cursorPointer u-flex u-flexAlignItemsCenter u-flexJustifyContentSpaceBetween u-borderBottom1 u-borderColorGrey u-capitalize u-paddingHorizontal16"
      onClick={handleSelectItem}
      >
        <p className="u-marginNone">{item.name}</p>
      </div>
    )
  }
}

export default ExpandableCard;
