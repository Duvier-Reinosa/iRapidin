import React, {useState} from 'react'
import {StyleSheet, View, Text, Image} from "react-native";
import { Avatar} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { LongPressGestureHandler } from 'react-native-gesture-handler';


import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../../../App/utilidades/firebase";


const db = firebase.firestore(firebaseApp);
const restaurantsRef = db.collection("restaurants");


export default function InfoUser(props) {
    const {userInfo, toastRef, setLoading} = props;
    const [restaurant, setRestaurant] = useState(null);
    var photoAvatar
    
    if(userInfo === null){ //se limpia el error de que el objeto userInfo cargue y no siempre esté null
      console.log(userInfo); 
    }else{
      photoAvatar = userInfo.photoURL;
      
      db.collection("restaurants")//esta parte del codigo guarda los datos del codigo en un estado
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if (doc.data().createBy === userInfo.uid) {
                setRestaurant(doc.data());
                // console.log(doc.id, " => ", doc.data());
              }
              
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

    }

    
 

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.mediaLibrary.status;
        
        if (resultPermissionCamera === "denied") {
          toastRef.current.show("Es necesario aceptar los permisos de la galería")
        }else {
          const result = await  ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4]
          });
          
          if (result.cancelled) {
            toastRef.current.show("Has cerrado la selección de imagenes");
          }
          else {
            uploadImage(result.uri).then(() => {
              updatePhotoUrl();
            }).catch(() =>{ 
              updatePhotoUrl();
              toastRef.current.show("Error al actualizar el avatar")});
          }
        }
      };

      const uploadImage = async(uri) =>{
        setLoading(true);
        const response = await fetch(uri);
        const blob = await  response.blob();
    
        const ref = firebase.storage().ref().child(`avatar/${userInfo.uid}`);
        return ref.put(blob);//return a promise for the
      };

      
      const updatePhotoUrl = ()=>{

        firebase.storage().ref(`avatar/${userInfo.uid}`).getDownloadURL()
        .then( async (res) => {
          const update ={
            photoURL: res
          };
          await firebase.auth().currentUser.updateProfile(update);
          setLoading(false);//este loading hace que el componente se recargue
        })
        
        };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                size="large"
                rounded
                onLongPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                  photoAvatar ?
                  {uri: photoAvatar}
                  : require("../../../assets/img/avatar-default.jpg") 
                }
            />
            <View style={styles.userInfoText}>
                <Text style={styles.titles}>{restaurant ? restaurant.name : "Anonimo" }</Text>
                <Text style={styles.titles}>Descriptión: 
                      <Text style={{fontWeight: "normal"}}>
                        {restaurant ? restaurant.description : "" }
                        </Text>
                </Text>
                <Text style={styles.titles}>Valoración: 
                      <Text style={{fontWeight: "normal"}}>
                        {restaurant ? ` ${restaurant.rating} estrellas`  : "" }
                        </Text>
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
    },
    userInfoAvatar:{
        marginTop: 20,
    },
    userInfoText:{
      marginTop: 30,
      width: "80%"
    },
    titles:{
        marginTop: 10,
        fontWeight: "bold"
    }
})