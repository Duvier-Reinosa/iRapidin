import React from 'react';
import {StyleSheet, View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { firebaseApp } from "../../utilidades/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default function Product(props) {
    const {product, navigation, refGeneral} = props;

    const theProduct = product.item.product;


    const deleteTask = (id) =>{
       db.collection(refGeneral).doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          navigation.navigate("addProduct");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });

    }

    const alertDelete = () => {
       Alert.alert(
          "¿Quieres eliminar tu producto?",
          "Si lo eliminas no podras recuperar la información",
          [
             {
               text: "Cancel",
               onPress: () => console.log("cancelled"),
               style: "cancel"
             },
             { text: "OK", onPress: () => db.collection(refGeneral)
                                           .get()
                                           .then((querySnapshot) => {
                                              querySnapshot.forEach((doc) => {
                                                 if (theProduct.nombre === doc.data().product.nombre) {
                                                    const idResult = doc.id;
                                                    deleteTask(idResult)
                                                 }
                                              });
                                           })
                                           .catch((error) => {
                                              console.log("Error getting documents: ", error);
                                           }) }
           ]
       )
    };

    return(
       <View style={styles.productsContainer} >
          <View style={styles.productContainer}>

             <Text style={styles.productName}> 
                {theProduct.nombre}
                </Text>
             <Text style={styles.productDates}>{theProduct.descripcion}</Text>
             <Text style={styles.taskNote}>{theProduct.precio}</Text>
             <Button
                title="Eliminar producto"
                containerStyle={styles.btnDeleteContainer}
                buttonStyle={styles.btnDelete} 
                onPress={alertDelete} />
          </View>
       </View>
       
    )
}

const styles = StyleSheet.create({
   productsContainer:{
       alignItems: "center",
       width: "100%"
    },
   productContainer:{
       borderRadius: 10,
       marginTop: 20,
       width: "90%",
       height: 120,
       backgroundColor: "#D1D1D1",
       shadowColor: "#A0A0A0",
    },
    productName:{
       fontWeight: "bold",
       marginTop: 10,
       marginLeft: 15
    },
    productDates:{
       marginTop: 2,
       marginLeft: 15,
       color: "#7E7E7E" 
    },
    btnDeleteContainer: {
       padding: 5,
    },
    btnDelete:{
       backgroundColor:"transparent",
    }
 });
