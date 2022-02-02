import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import AddProductButton from '../components/addProductButton';
import Dialog from 'react-native-dialog';
export default function Home() {
  //states
  const [list, setList] = useState([
    {
      product: 'Domates',
      price: '20$',
      isBought: false,
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState('');
  const [addNewPrice, setAddNewPrice] = useState('');

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setList(x => [
      ...x,
      {product: addNewProduct, price: addNewPrice, isBought: false},
    ]);
    setAddNewProduct('');
    setAddNewPrice('');
    setVisible(false);
  };

  const addProduct = () => {
    setVisible(true);
  };
  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add Product</Dialog.Title>
        <Dialog.Input
          placeholder="Please enter a product."
          value={addNewProduct}
          onChangeText={e => setAddNewProduct(e)}
        />
        <Dialog.Input
          placeholder="Please enter a price."
          value={addNewPrice}
          keyboardType='number-pad'
          onChangeText={e => setAddNewPrice(e)}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={handleAdd} />
      </Dialog.Container>
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
