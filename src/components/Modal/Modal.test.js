import React from 'react';
import { shallow } from "enzyme";
import HomePage from '../../pages/Home';
import Modal from "./index";

const selectedItem = { name: "spearow", url: "https://pokeapi.co/api/v2/pokemon/21/" }

describe('ModalComponent', () => {
  it('it should contain opened classname when theres a selected item', () => {
    const ModalComponent = shallow(<Modal item={selectedItem} />);
    expect(ModalComponent.childAt(0).hasClass('opened'));
  });

  it('it should reset detailData state when closed', () => {
    const HomePageComponent = shallow(<HomePage />);
    const handleSelectItem = HomePageComponent.instance().handleSelectItem;
    const ModalComponent = shallow(<Modal handleSelectItem={() => handleSelectItem(null)} item={selectedItem} />);

    ModalComponent.simulate('onClick', ModalComponent.instance().handleCloseModal());
    expect(ModalComponent.state().detailData).toBeNull()
  })
});