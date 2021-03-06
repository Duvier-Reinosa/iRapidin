import React from "react";
import {StyleSheet, View, ScrollView, Text, Image} from "react-native";
import {Button} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


export default function UserGuest() {
    const navigation = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
        <Image
          style={styles.image}
          source={require("../../../assets/img/user-guest.png")}
        />
        <Text style={styles.title}>¡Ofrece tus servicios!</Text>
        <Text style={styles.description}>Sé el mejor en tu nicho, ofrece el mejor producto o servicio y aumenta tus ventas.</Text>
        <View style={styles.viewBtn}>
          <Button
            buttonStyle={styles.btnstyle}
            containerStyle={styles.btnContainer}
            title="Ver tu perfil"
            onPress={() => navigation.navigate("login")}/>
        </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    viewBody: {
      marginLeft: 30,
      marginRight:30,
    },
    image:{
      height:300,
      width: "100%",
      marginBottom: 40,
      marginTop: 30,
    },
    title:{
      fontWeight: "bold",
      fontSize: 19,
      marginBottom: 10,
      textAlign: "center",
      marginTop: 40
    },
    description:{
      textAlign: "center",
      marginBottom:20,
    },
    viewBtn:{
      flex: 1,
      alignItems: "center",
    },
    btnstyle:{
      backgroundColor: "#ff003c",
    },
    btnContainer:{
      width: "70%",
    },
  });
  
