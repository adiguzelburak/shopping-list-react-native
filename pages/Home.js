import {View, Text, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddProductButton from '../components/addProductButton';
import Dialog from 'react-native-dialog';
import DeleteProductButton from '../components/deleteProductButton';

export default function Home() {
  //states
  const [list, setList] = useState([
    {
      id: 0,
      product: '',
      price: '',
      isBought: false,
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState('');
  const [addNewPrice, setAddNewPrice] = useState('');
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    _retrieveData();
  }, []);
  useEffect(() => {
    _storeData();
  }, [list]);

  //functions add - delete product list
  const deleteProduct = product => {
    setList(list.filter(x => x.id !== product));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setList(x => [
      ...x,
      {
        id: list.length + 1,
        product: addNewProduct,
        price: addNewPrice,
        isBought: false,
      },
    ]);
    setAddNewProduct('');
    setAddNewPrice('');
    setVisible(false);
  };

  const addProduct = () => {
    setVisible(true);
  };

  // AsyncStorage
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(list));
    } catch (error) {
      alert('Error - Please Try Again.');
    }
  };
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        const data = JSON.parse(value);
        setList(data);
      }
    } catch (error) {
      alert('Error - Please Check Network');
    }
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title style={{fontFamily: 'EuclidCircularB-SemiBold'}}>
          Add Product
        </Dialog.Title>
        <Dialog.Input
          placeholder="Please enter a product."
          style={{fontFamily: 'EuclidCircularB-Light'}}
          value={addNewProduct}
          onChangeText={e => setAddNewProduct(e)}
        />
        <Dialog.Input
          placeholder="Please enter a price."
          style={{fontFamily: 'EuclidCircularB-Light'}}
          value={addNewPrice}
          keyboardType="number-pad"
          onChangeText={e => setAddNewPrice(e)}
        />
        <Dialog.Button
          label="Cancel"
          style={{
            color: 'red',
            fontFamily: 'EuclidCircularB-SemiBold',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'red',
          }}
          onPress={handleCancel}
        />
        <Dialog.Button
          label="Add"
          style={{
            color: 'green',
            fontFamily: 'EuclidCircularB-SemiBold',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'green',
            marginLeft: 10,
          }}
          onPress={handleAdd}
        />
      </Dialog.Container>

      <View style={styles.navbar}>
        <Text style={styles.title}>Merhaba, Neo</Text>
        <AddProductButton onPress={addProduct} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map(children => (
          <View style={styles.viewBox}>
            <Text style={styles.product}>{children.id}</Text>
            <Text style={styles.product}>{children.product}</Text>
            <Text style={styles.price}>{children.price}$</Text>
            <DeleteProductButton
              onPress={() => deleteProduct(children.id)}
              title="Delete"
            />
          </View>
        ))}
      </ScrollView>
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
    height: height_proportion,
    backgroundColor: 'white',
  },
  scrollView: {
    height: height_proportion,
    width: width_proportion,
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: primary,
    marginBottom: 5,
  },
  viewBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
    width: 330,
    height: 50,
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
  modalBox: {
    borderRadius: 10,
  },
});
