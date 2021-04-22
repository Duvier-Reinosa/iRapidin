import React, {useRef, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, Image } from 'react-native';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

import Toast from 'react-native-easy-toast';
import Loading from "../../components/Loading";
import Order from "../../components/Order";

import { firebaseApp } from "../../utilidades/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

let refGeneral 

export default function Orders() {
  const toastRef = useRef();

  const [orders, setOrders] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);

  
  let user = firebase.auth().currentUser;
  let uid

  if (user != null) {
        uid = user.uid;
  }

  let ref = "Orders" + uid; //para referencias sin errores
  refGeneral = ref;

  useFocusEffect(
     useCallback(()=>{
        setIsLoading(true)
        const resultOrders = [];
        const resultIds = []
        db.collection(ref).get().then((snap)=>{
        snap.forEach((doc)=>{
          resultIds.push(doc.id);
          resultOrders.push(doc.data())
        })
        setOrders(resultOrders);
        setIsLoading(false);
     });

     }, [])
  );



    return (
      <View style={styles.ordersScreen}>
            {
            (orders.length > 0) ? 
            <ScrollView>
              <FlatList
                    data={orders}
                    renderItem={(order) => <Order 
                                                order={order}
                                                toastRef ={toastRef} />}
                    keyExtractor={(item, index) => index.toString}
              />  
            </ScrollView>
            : 
            <View style={styles.ordersContainer} >
                <Text>No hay pedidos</Text>
              </View>}
            <Loading isVisible={isLoading} />
            <Toast ref={toastRef} position="center"/>
        </View>
    )
}

const styles = StyleSheet.create({
  ordersScreen:{
    flex: 1
 },
 ordersContainer:{
  alignItems: "center",
  width: "100%"
},
  });
  