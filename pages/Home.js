import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddProductButton from '../components/addProductButton';
import Dialog from 'react-native-dialog';
import DeleteProductButton from '../components/deleteProductButton';
import AnimatedLottieView from 'lottie-react-native';
import EditProductButton from '../components/editProductButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home({route, navigation}) {
  //states
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState('');
  const [addNewPrice, setAddNewPrice] = useState('');
  const [productList, setProductList] = useState([]);
  const [docId, setDocId] = useState('');
  const [userInfo, setUserInfo] = useState();
  const [initializing, setInitializing] = useState(true);
  // Firestore Datas.
  const firestoreData = firestore().collection(`${userInfo?.uid}`);

  // use effects
  useEffect(() => {
    getUserInfo();
    return firestoreData.onSnapshot(datas => {
      const list = [];
      datas.forEach(data => {
        list.push({
          id: data.id,
          product: data.data().product,
          price: data.data().price,
          isBought: data.data().isBought,
        });
      });
      setProductList(list);
      console.log(list);
    });
  }, []);

  const handleCancel = () => {
    setVisible(false);
    setEditVisible(false);
    setDocId('');
  };

  const getUserInfo = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  };

  const onAuthStateChanged = userInfo => {
    setUserInfo(userInfo);
    if (initializing) setInitializing(false);
  };

  const firebaseAdd = async () => {
    if (addNewPrice == '' || addNewProduct == '') {
      alert('Please enter all inputs.', 'title');
      return;
    }
    await firestoreData.add({
      product: addNewProduct,
      price: addNewPrice,
      isBought: false,
    });
    setAddNewProduct('');
    setAddNewPrice('');
    setVisible(false);
  };

  const firebaseDelete = documentId => {
    firestore()
      .collection(`${userInfo?.uid}`)
      .doc(documentId)
      .delete()
      .then(() => console.log('deleted successfully'));
  };

  const firebaseEditProduct = () => {
    firestore()
      .collection(`${userInfo?.uid}`)
      .doc(`${docId}`)
      .set({
        product: addNewProduct,
        price: addNewPrice,
      })
      .then(() => {
        console.log('Product updated!');
      });
    setEditVisible(false);
    setDocId('');
  };

  const editProductModal = item => {
    setAddNewProduct(item.product);
    setAddNewPrice(item.price);
    setDocId(item.id);
    setEditVisible(true);
  };

  const addProductModal = () => {
    setAddNewProduct('');
    setAddNewPrice('');
    setVisible(true);
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
          onPress={firebaseAdd}
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

      <Dialog.Container visible={editVisible}>
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
          label="Edit"
          style={{
            color: 'white',
            fontFamily: 'EuclidCircularB-SemiBold',
            borderRadius: 10,
            backgroundColor: primary,
            marginRight: 10,
          }}
          onPress={firebaseEditProduct}
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
        <AddProductButton onPress={signOut} text="Out" />
        {/* <AddProductButton onPress={isBoughtCheck} text="ad" /> */}
      </View>

      {productList.length !== 0 ? (
        <FlatList
          data={productList}
          renderItem={({item}) => (
            <View style={styles.viewBox}>
              <TouchableOpacity>
                <View style={styles.isBoughtButton} />
              </TouchableOpacity>
              <Text style={styles.product}>{item.product}</Text>
              <Text style={styles.price}>{item.price}$</Text>
              <DeleteProductButton
                title="Delete"
                onPress={() => firebaseDelete(item.id)}
              />
              <EditProductButton onPress={() => editProductModal(item)} />
            </View>
          )}
        />
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
      <AddProductButton text="➕" onPress={addProductModal} />
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
  addItem: {
    position: 'absolute',
    right: 25,
    bottom: 90,
    backgroundColor: 'red',
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
