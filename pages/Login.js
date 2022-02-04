import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import LoginButton from '../components/loginButton';

const Login = ({navigation}) => {
  const [loginMail, setLoginMail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome The Shopping List</Text>
      <View style={styles.viewBox}>
        <TextInput
          style={styles.loginInput}
          value={loginMail}
          onChangeText={e => setLoginMail(e)}
          keyboardType={'email-address'}
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
        <LoginButton
          text="Sign In"
          onPress={() => navigation.navigate('Home')}
        />
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
        Don't have an account?{' '}
        <Text
          style={{color: primary}}
          onPress={() => navigation.navigate('SignUp')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

// size:
const width_proportion = '100%';
const height_proportion = '100%';
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
    width: 260,
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
    marginTop: 30,
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
});

export default Login;
