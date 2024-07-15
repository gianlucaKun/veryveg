import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    details: (props) => <MaterialIcons name="details" size={36} color="black" {...props} />,
    home: (props) => <AntDesign name="home" size={36} color="white" {...props} />,
    scansiona: (props) => <MaterialIcons name="add-circle-outline" size={36} color="black" {...props}/>,
    hiddenDatails: (props) => <MaterialIcons name="add-circle-outline" size={36} color="black" {...props}/>
  };

  const indicatorPosition = useRef(new Animated.Value(0)).current;

  const [pos,setPos] = useState(0);

  useEffect(() => {
    // Calcola la posizione desiderata dell'indicatore in base a state.index
    let newPosition = pos
    switch (state.index) {
      case 0:
        setPos(0); // Posizione desiderata per il primo tab
        break;
      case 1:
        setPos(1); // Posizione desiderata per il secondo tab
        break;
      case 2:
        setPos(2); // Posizione desiderata per il terzo tab
        break;
      default:
        newPosition = pos; // Gestione di altri indici non previsti
        break;
    }
  
    // Esegui l'animazione per spostare l'indicatore alla nuova posizione
    Animated.spring(indicatorPosition, {
      toValue: newPosition,
      useNativeDriver: false,
    }).start();
  }, [state.index, pos]);
  

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

        if (['_sitemap', '+not-found', 'hiddenDatails', 'aggiungi'].includes(route.name)) return null;

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
    zIndex:10,
  },
  noFocus: {
    color: '#fff',
    zIndex:10
  },
  indicator: {
    position: 'absolute',
    bottom: 8,
    left: 35,
    width: 60, // Assuming you have two tabs
    height: 60,
    backgroundColor: '#F2D6FF',
    borderRadius: 200,
    zIndex:0
  },
});

export default TabBar;