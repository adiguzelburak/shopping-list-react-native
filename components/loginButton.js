import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function LoginButton({text, onPress}) {
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
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FDB849',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 12,
  },
});
