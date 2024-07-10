import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    details: (props) => <MaterialIcons name="details" size={36} color="black" {...props} />,
    home: (props) => <AntDesign name="home" size={36} color="white" {...props} />,
    scansiona: (props) => <MaterialIcons name="add-circle-outline" size={36} color="black" {...props}/>
  };

  const indicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: state.index,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  const translateX = indicatorPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [Dimensions.get('window').width*0,Dimensions.get('window').width*0.3, Dimensions.get('window').width*0.603]
  });

  return (
    <View style={styles.tabbar}>
      <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text style={isFocused ? styles.focus : styles.noFocus}>
              {label}
              {icons[route.name]({
                color: isFocused ? styles.focus.color : styles.noFocus.color
              })}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#100429',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focus: {
    color: '#673ab7',
  },
  noFocus: {
    color: '#fff',
  },
  indicator: {
    position: 'absolute',
    bottom: 8,
    left: 35,
    width: 60, // Assuming you have two tabs
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 200,
  },
});

export default TabBar;