import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import LoginButton from '../components/loginButton';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const registerUser = () => {
    auth()
      .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
      .then(() => {
        alert('User account created Successfully!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.viewBox}>
        <TextInput
          style={styles.loginInput}
          value={newUserEmail}
          onChangeText={e => setNewUserEmail(e)}
          keyboardType={'email-address'}
          placeholder="Email"
        />
        <TextInput
          style={styles.loginInput}
          value={newUserPassword}
          onChangeText={e => setNewUserPassword(e)}
          secureTextEntry
          placeholder="Password"
        />
        {/* <TextInput
          style={styles.loginInput}
          onChangeText={e => console.log(e)}
          secureTextEntry
          placeholder="Password Again"
          required
        /> */}
      </View>
      <LoginButton text="Sign Up" onPress={registerUser} />
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
    marginBottom: 10,
    color: dark,
    width: 'auto',
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
