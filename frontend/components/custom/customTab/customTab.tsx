// CustomTab.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

interface TabItem {
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  color?: string;
  size?: number;
}

interface CustomTabProps {
  tabs: TabItem[];
  initialRouteName: string;
  activeTintColor?: string;
  inactiveTintColor?: string;
  tabBarStyle?: object;
  tabBarLabelStyle?: object;
  tabBarItemStyle?: object;
}

const CustomTab: React.FC<CustomTabProps> = ({
  tabs,
  initialRouteName,
  activeTintColor = 'tomato',
  inactiveTintColor = 'gray',
  tabBarStyle = {},
  tabBarLabelStyle = {},
  tabBarItemStyle = {}
}) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => {
        const currentTab = tabs.find(tab => tab.name === route.name);
        return {
          tabBarIcon: ({ color, size }) => {
            if (currentTab) {
              return <Icon name={currentTab.icon} size={currentTab.size || size} color={color} />;
            }
            return null;
          },
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle,
          tabBarLabelStyle,
          tabBarItemStyle,
        };
      }}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false 
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default CustomTab;
