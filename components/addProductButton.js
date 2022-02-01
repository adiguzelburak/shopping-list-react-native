import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function AddProductButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}></Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#FDB849',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'EuclidCircularB-Light',
    fontSize: 40,
  },
});
