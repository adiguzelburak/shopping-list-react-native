/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import LoginButton from './components/loginButton';

const App = () => {
  const [loginMail, setLoginMail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const smt = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome The Shopping List</Text>

      <View style={styles.viewBox}>
        <TextInput
          style={styles.loginInput}
          value={loginMail}
          onChangeText={e => setLoginMail(e)}
          keyboardType={'number-pad'}
          placeholder="Email"
        />
        <TextInput
          style={styles.loginInput}
          value={loginPassword}
          onChangeText={e => setLoginPassword(e)}
          secureTextEntry
          placeholder="Password"
        />
        <Text style={styles.textGray}>Forgot Password?</Text>
        <LoginButton text="Sign In" />
      </View>

      {/* <View style={styles.viewBox}>
        <Text style={styles.textGray}>Continue with</Text>
        <View style={styles.socialBox}>
          <Button style={styles.circleSocialButtons} title="Google" />
          <Button style={styles.circleSocialButtons} title="Apple" />
          <Button
            style={styles.circleSocialButtons}
            color={primary}
            title="Facebook"
          />
        </View>
      </View> */}

      <Text style={styles.textGray}>
        Don't have an account? <Text style={{color: primary}}>Signup</Text>
      </Text>
    </View>
  );
};

// size:
const width_proportion = '100%';
const input_width_proportion = '80%';
const height_proportion = '90%';
const circle_proportion = '50%';

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
    marginTop: 20,
    color: dark,
    width:260
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
  textGray: {
    color: gray,
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 12,
    marginTop:30,
    marginBottom: 10,
  },
  login: {
    width: height_proportion,
    height: 30,
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 12,
  },
  socialBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  circleSocialButtons: {
    height: 60,
    width: 60,
    borderRadius: circle_proportion,
    borderColor: gray,
  },
});

export default App;
