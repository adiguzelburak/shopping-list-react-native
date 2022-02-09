import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginButton from '../components/loginButton';
import auth from '@react-native-firebase/auth';
import Home from './Home';

const Login = ({navigation}) => {
  const [loginMail, setLoginMail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const loginApp = () => {
    if (loginMail == '' || loginPassword == '') {
      alert('Email or Password can not be empty');
      return;
    }
    auth()
      .signInWithEmailAndPassword(loginMail, loginPassword)
      .then(() => {
        console.log('Login in Success!');
        //navigation.navigate('Home');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          alert('Does not exist user!');
        } else if (err.code === 'auth/invalid-email') {
          alert('Please enter correct email format!');
        }
      });
  };

  const forgotPassword = () => {
    if (loginMail == '') {
      alert('Please enter an email.');
    } else {
      alert(
        'Reset password link sended successfully. Please check your email.',
      );
      let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      if (!regEmail.test(loginMail)) {
        alert('Invalid Email');
      } else {
        auth()
          .sendPasswordResetEmail(loginMail)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }
  };

  if (initializing) return null;

  if (!user) {
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
          <TouchableOpacity onPress={forgotPassword}>
            <View>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
          <LoginButton text="Sign In" onPress={loginApp} />
        </View>

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
  }
  return <Home />;
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
  forgotPassword: {
    color: gray,
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
  login: {
    width: height_proportion,
    height: 30,
    fontFamily: 'EuclidCircularB-Light',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default Login;
