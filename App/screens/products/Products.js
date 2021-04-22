import React, {useRef, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

import Toast from 'react-native-easy-toast';
import Loading from "../../components/Loading";
import Product from "../../components/products/Product"

import { firebaseApp } from "../../utilidades/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

let refGeneral

export default function Products(props) {
  const {navigation} = props;
  const toastRef = useRef();

  const [products, setProducts] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);

  
  let user = firebase.auth().currentUser;
  let uid

  if (user != null) {
        uid = user.uid;
  }

  let ref = "products" + uid; //para referencias sin errores
  refGeneral = ref;

  useFocusEffect(
     useCallback(()=>{
        setIsLoading(true)
        const resultProducts = [];
        const resultIds = []
        db.collection(ref).get().then((snap)=>{
        snap.forEach((doc)=>{
        resultIds.push(doc.id);
        resultProducts.push(doc.data())
        })
        setProducts(resultProducts);
        setIsLoading(false);
     });

     }, [])
  );



    return (
      <View style={styles.productsScreen}>
            {
            (products.length > 0) ? 
            <ScrollView>
              <FlatList
                    data={products}
                    renderItem={(product) => <Product 
                                                product={product}
                                                ref={ref}
                                                refGeneral={refGeneral}
                                                navigation={navigation} 
                                                toastRef ={toastRef} />}
                    keyExtractor={(item, index) => index.toString}
              />  
            </ScrollView>
            : 
            <View style={styles.productsContainer} >
                <Image 
                    source={require("../../../assets/img/addProductsimage.png")}
                    resizeMode="contain"
                    style={styles.addProductsImage} />
              </View>}
      
            <Button
               type="clear"
               containerStyle={styles.btnPlus}
               onPress={()=> navigation.navigate("addProduct")}
               icon={
                  <Icon
                    name="plus"
                    size={22}
                    color="white"
                  />
                }
            />
            <Loading isVisible={isLoading} />
            <Toast ref={toastRef} position="center"/>
        </View>
    )
}

const styles = StyleSheet.create({
  productsScreen:{
    flex: 1
 },
 btnPlus:{
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor:"#ff003c",
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 60
 },
 productsContainer:{
  alignItems: "center",
  width: "100%"
},
 addProductsImage:{
   marginTop: "20%",
   height: 400,
   width: 400
 }
  });
  