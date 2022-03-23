import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function AddProductButton({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    bottom: 120,
    left: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FDB849',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'EuclidCircularB-Light',
    fontSize: 20,
  },
});
