import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function DeleteProductButton({text, onPress}) {
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#ef233c',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 12,
  },
});
