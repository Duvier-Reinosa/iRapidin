import React, {useRef, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

import Toast from 'react-native-easy-toast';
import Loading from "../../components/Loading";

export default function Products(props) {
  const {navigation} = props;
  const toastRef = useRef();

  const [ isLoading, setIsLoading] = useState(false);
    return (
      <View style={styles.productsScreen}>
          
            <Text>Products</Text>
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
 }
  });
  