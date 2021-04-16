import React, {useRef, useEffect, useState} from "react";
import {StyleSheet, View, Text, Button} from "react-native";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";

export default function Orders() {
    return (
        <View>
            <Text>Orders</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    btnCloseSission:{
      marginTop: 30,
      borderRadius: 0,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#e3e3e3",
      borderBottomWidth: 1,
      borderBottomColor: "#e3e3e3",
      paddingTop: 10,
      paddingBottom: 10
    },
    BtnCloseSessionText:{
      color: "#ff003c"
    }
  });
  