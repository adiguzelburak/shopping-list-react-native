import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import LoginButton from '../components/loginButton';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.viewBox}>
        <TextInput
          style={styles.loginInput}
          onChangeText={e => console.log(e)}
          keyboardType={'email-address'}
          placeholder="Email"
        />
        <TextInput
          style={styles.loginInput}
          onChangeText={e => console.log(e)}
          secureTextEntry
          placeholder="Password"
          required
        />
        <TextInput
          style={styles.loginInput}
          onChangeText={e => console.log(e)}
          secureTextEntry
          placeholder="Password Again"
          required
        />
      </View>
      <LoginButton text="Sign Up" />
    </View>
  );
};

// size:
const width_proportion = '100%';
const height_proportion = '90%';
// colors:
const primary = '#FDB849';
const secondary = '#14213D';
const dark = '#000000';
const gray = 'gray';
const third = '#e5e5e5';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width_proportion,
    height: height_proportion,
    backgroundColor: 'white',
  },
  viewBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'EuclidCircularB-SemiBold',
    fontWeight: '500',
    fontSize: 40,
    marginBottom: 50,
    color: dark,
    width: 300,
  },
  loginInput: {
    color: gray,
    borderRadius: 7,
    borderColor: third,
    borderWidth: 1,
    fontSize: 12,
    backgroundColor: 'white',
    width: 300,
    height: 40,
    marginBottom: 10,
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
  },
});

export default SignUp;
