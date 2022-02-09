import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function EditProductButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>Edit</Text>
      </View>
    </TouchableOpacity>
  );
}

// colors:
const primary = '#FDB849';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: primary,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2,
  },
});
