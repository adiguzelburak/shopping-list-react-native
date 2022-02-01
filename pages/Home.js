import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import AddProductButton from '../components/addProductButton';
export default function Home() {
  //states
  const [list, setList] = useState([
    {
      product: 'Domates',
      price: '20$',
      isBought: false,
    },
  ]);

  const addProduct = () => {
    setList(x => [...x, {product: 'Patlican', price: '9.90$', isBought: true}]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Merhaba, Neo</Text>
        <AddProductButton onPress={addProduct} />
      </View>
      {list.map(children => (
        <View style={styles.viewBox}>
          <Text style={styles.product}>{children.product}</Text>
          <Text style={styles.price}>{children.price}</Text>
        </View>
      ))}
    </View>
  );
}

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
    alignItems: 'center',
    width: width_proportion,
    height: height_proportion,
    backgroundColor: 'white',
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '80%',
  },
  viewBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
    width: '80%',
    height: '15%',
  },
  product: {
    fontFamily: 'EuclidCircularB-SemiBold',
    fontWeight: '500',
    fontSize: 24,
    color: dark,
  },
  price: {
    fontFamily: 'EuclidCircularB-SemiBold',
    fontWeight: '500',
    fontSize: 24,
    color: 'green',
  },
  title: {
    fontFamily: 'EuclidCircularB-SemiBold',
    fontWeight: '500',
    fontSize: 40,
    marginTop: 20,
    color: dark,
    width: 260,
  },
});
