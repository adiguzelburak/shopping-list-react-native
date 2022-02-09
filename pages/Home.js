import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddProductButton from '../components/addProductButton';
import Dialog from 'react-native-dialog';
import DeleteProductButton from '../components/deleteProductButton';
import AnimatedLottieView from 'lottie-react-native';
import EditProductButton from '../components/editProductButton';
import auth from '@react-native-firebase/auth';

export default function Home({navigation}) {
  //states
  const [list, setList] = useState([{}]);
  const [visible, setVisible] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState('');
  const [addNewPrice, setAddNewPrice] = useState('');
  const [editId, setEditId] = useState();
  // use effects
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
    if (addNewPrice == '' || addNewProduct == '') {
      alert('Please enter all inputs.', 'title');
      return;
    }
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

  const handleEdit = () => {
    deleteProduct(x.id);
  };

  const addProduct = () => {
    setAddNewProduct('');
    setAddNewPrice('');
    setVisible(true);
  };

  const isBoughtCheck = id => {
    if (list[id - 1].isBought == false) {
      list[id - 1].isBought = true;
    } else {
      list[id - 1].isBought = false;
    }
  };

  const editProductButton = e => {
    setVisible(true);
    setAddNewProduct(e.product);
    setAddNewPrice(e.price);
    deleteProduct(e.id);
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

  // sign out firebase

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User Signed Out');
        navigation.navigate('Login');
      });
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
          underlineColorAndroid={primary}
          value={addNewProduct}
          onChangeText={e => setAddNewProduct(e)}
        />
        <Dialog.Input
          placeholder="Please enter a price."
          style={{
            fontFamily: 'EuclidCircularB-Light',
          }}
          underlineColorAndroid={primary}
          value={addNewPrice}
          keyboardType="number-pad"
          onChangeText={e => setAddNewPrice(e)}
        />
        <Dialog.Button
          label="Add"
          style={{
            color: 'white',
            fontFamily: 'EuclidCircularB-SemiBold',
            borderRadius: 10,
            backgroundColor: 'green',
            marginRight: 10,
          }}
          onPress={handleAdd}
        />
        <Dialog.Button
          label="Cancel"
          style={{
            color: 'white',
            fontFamily: 'EuclidCircularB-SemiBold',
            borderRadius: 10,
            backgroundColor: 'red',
          }}
          onPress={handleCancel}
        />
      </Dialog.Container>

      <View style={styles.navbar}>
        <View>
          <Text style={styles.title}>Hello,</Text>
          <Text style={styles.title}>Neo</Text>
        </View>
        <AddProductButton onPress={addProduct} text="➕" />
        <AddProductButton onPress={signOut} text="Out" />
        {/* <AddProductButton onPress={isBoughtCheck} text="ad" /> */}
      </View>
      {list.length !== 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {list.map(children => (
            <View style={styles.viewBox}>
              <TouchableOpacity onPress={() => isBoughtCheck(children.id)}>
                <View style={styles.isBoughtButton} />
              </TouchableOpacity>
              <Text style={styles.product}>{children.product}</Text>
              <Text style={styles.price}>{children.price}$</Text>
              <DeleteProductButton
                onPress={() => deleteProduct(children.id)}
                title="Delete"
              />
              <EditProductButton onPress={() => editProductButton(children)} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyProduct}>
          <AnimatedLottieView
            style={styles.emptyProduct}
            source={require('../assets/animation/empty.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
}

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
    marginTop: 20,
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
    height: 80,
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
    fontSize: 48,
    color: dark,
    width: 260,
  },
  modalBox: {
    borderRadius: 10,
  },
  emptyProduct: {
    marginTop: 40,
    width: 300,
  },
  isBoughtButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: secondary,
  },
});
