// Navigation.tsx
import React from 'react';
import HomeScreen from '../../pages/home';
import DetailsScreen from '../../pages/details';
import Prove from '../../pages/prova';
import CustomTab from '../custom/customTab/customTab';

const tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
    color: 'blue',
    size: 25,
  },
  {
    name: 'Details',
    component: DetailsScreen,
    icon: 'information-circle',
    color: 'green',
    size: 25,
  },
  {
    name: 'Prove',
    component: Prove,
    icon: 'barcode',
    color: 'red',
    size: 25,
  },
];

const Navigation: React.FC = () => {
  return <CustomTab tabs={tabs} initialRouteName="Home" />;
};

export default Navigation;
