import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const colore = '#926FFF';

const GuideCamera = () => {
  return (
    <View style={styles.todo}>
        <View style={styles.uno}>
            <View style={styles.guide1}></View>
            <View style={styles.guide2}></View>
        </View>
        <View style={styles.due}>
            <View style={styles.guide1}></View>
            <View style={styles.guide2}></View>
        </View>
        <View style={styles.tre}>
            <View style={styles.guide1}></View>
            <View style={styles.guide2}></View>
        </View>
        <View style={styles.quattro}>
            <View style={styles.guide1}></View>
            <View style={styles.guide2}></View>
        </View>
    </View>
  )
}

export default GuideCamera;

const styles = StyleSheet.create({
  guide1 : {
    backgroundColor: colore,
    height: 10,
    width: 60,
    position: 'absolute',
    bottom: 180,
    right: Dimensions.get('window').width - 150,
    borderRadius: 10,
  },
  guide2 : {
    backgroundColor: colore,
    height: 10,
    width: 60,
    position: 'absolute',
    bottom: 154,
    right: Dimensions.get('window').width - 176,
    borderRadius: 10,
    transform: [{rotate: '90deg'}],
  },
  uno:{
    position: 'relative',
    top: 0,
    left: 255,
  },
  due:{
    position: 'relative',
    top: 50,
    right: 21,
    transform: [{rotate: '90deg'}]
  },
  tre:{
    position: 'relative',
    bottom: 225,
    right: 255,
    transform: [{rotate: '180deg'}]
  },
  quattro:{
    position: 'relative',
    bottom: 275,
    left: 21,
    transform: [{rotate: '-90deg'}]
  },
  todo:{
    opacity: 0.5,
  }
});