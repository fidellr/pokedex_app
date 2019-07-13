import React from 'react';
import { shallow } from "enzyme";
import HomePage from './index';
import ListCard from '../../components/ListCard';

const item = { name: "spearow", url: "https://pokeapi.co/api/v2/pokemon/21/" }
describe('HomePage', () => {
  it('should render ListCard component when data was exists', async () => {
    const HomePageComponent = shallow(<HomePage />);
    await HomePageComponent.instance().componentDidMount();
    expect(HomePageComponent.state().data.length).toBeGreaterThan(1);

    const handleSelectItem = HomePageComponent.instance().handleSelectItem;
    const ListCardComponent = shallow(<ListCard handleSelectItem={handleSelectItem} item={item} />);
    expect(HomePageComponent.containsMatchingElement(ListCardComponent))
  });
});