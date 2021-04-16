import React, {useRef, useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Button } from 'react-native-elements';
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";


import InfoUser from "../../components/acount/InfoUser";
import Loading from "../../components/Loading"

export default function User() {
    const [userInfo, setUserInfo] =useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef();


    useEffect(() => {
        (async () => {
          const user = await firebase.auth().currentUser;
          setUserInfo(user);
        })();
        setReloadUserInfo(false);
      }, [reloadUserInfo]);

    return (
        <View style={styles.userView}>
            <InfoUser 
                userInfo={userInfo}
                toastRef={toastRef}
                setLoading={setLoading}/>
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSission}
                containerStyle={styles.btnCloseContainer}
                onPress={() => firebase.auth().signOut()}
                color= "#ff003c"
        />
        <Toast ref={toastRef} position="center" opacity={0, 9}/>
        <Loading isVisible={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    btnCloseSission:{
      marginTop: 30,
      borderRadius: 5,
      backgroundColor: "#ff003c",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingTop: 10,
      paddingBottom: 10,
      width: "90%",
    },
    btnCloseContainer:{
      marginTop:"80%",
      alignItems: "center",
    },
    userView:{
     
    }
  });
  