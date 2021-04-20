import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, plataform} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';


import { firebaseApp } from "../../utilidades/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

var db = firebase.firestore(firebaseApp);

export default function AddProduct(props) {
    const {navigation}= props;
    const toastRef = useRef();

    let user = firebase.auth().currentUser;
    let uid

    if (user != null) {
          uid = user.uid;
    }

    const [product, setProduct] = useState(defaultFormValue());
    const [visible, setVisible] = useState(false);

    const onChangeForm = (e, type) => {
        setProduct({ ...product, [type]: e.nativeEvent.text });
      };

      const upProduct = () =>{
        if(product.nombre === "" || product.descripcion === "" || product.precio === "$"){
            toastRef.current.show("Recuerda llenar todos los espacios")
        }else{
            db.collection(`products${uid}`).doc().set({
                product
            })
            toastRef.current.show("Producto agregado");
            
            setTimeout(() => {
                navigation.navigate("products")
              }, 2000);
        }
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Nombre de tu producto o servicio</Text>
            <TextInput
                style={styles.input}
                onChange={(e)=> onChangeForm(e, "nombre")}
            />
            <Text style={styles.text}>Descripción</Text>
            <TextInput
                    style={styles.input2}
                    multiline={true}
                    onChange={(e)=> onChangeForm(e, "descripcion")}
                    numberOfLines= {10}
                />
            <Text style={styles.text}>Precio</Text>
            <TextInput
                style={styles.input}
                onChange={(e)=> onChangeForm(e, "precio")}
                defaultValue={product.precio}
            />
            <Button
              type="solid"
              title="Guardar"
              buttonStyle={styles.btnDate}
              onPress={()=> upProduct()}
            />
            <Toast ref={toastRef} position="center"/>
        </View>
    );
}
function defaultFormValue() {
    return {
      nombre: "",
      descripcion: "",
      precio: "$",
    };
  }

  const styles = StyleSheet.create({
    text:{
       marginTop: 15,
       marginRight: 15,
       marginLeft: 15,
       fontWeight: "bold"
    },
    input:{
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        height: 40,
        borderColor: "#ff003c", 
        borderWidth: 1 ,
        borderRadius: 5,
        padding: 5
    },
    btnDate:{
       marginTop: 15,
       marginRight: 15,
       marginLeft: 15,
       height: 40,
       backgroundColor: "#ff003c", 
       borderRadius: 5
    },
    input2:{
       marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        height: 150,
        borderColor: "#ff003c", 
        borderWidth: 1 ,
        borderRadius: 5,
        padding: 5
    },
    iconleft:{
        color: "#ff003c"
    },
    overlayScreen:{
     alignItems: "center",
     width: "85%",
     height: "55%",
    },
    textOverlay:{
     marginTop: 20,
     fontWeight: "bold"
  },
   inputOverlay:{
     marginTop: 10,
     marginRight: 15,
     marginLeft: 15,
     height: 40,
     width: "90%",
     borderColor: "#ff003c", 
     borderWidth: 1 ,
     borderRadius: 5,
     padding: 5
   },
   viewOverlay:{
     width: "100%"
   },
   btnDateOverlay:{
     marginTop: 25,
     height: 40,
     backgroundColor: "#ff003c", 
     borderRadius: 5
   }

    
});