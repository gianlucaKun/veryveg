import TabBar from '@/components/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Tabs
      initialRouteName="scansiona"
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen 
        name="details"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen 
        name="scansiona"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen 
        name="home"
        options={{
          title: "",
        }}
      />
    </Tabs>
  );
};

export default Layout;