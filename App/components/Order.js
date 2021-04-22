import React from 'react'
import { View, Text,StyleSheet} from 'react-native'

export default function Order(props) {
    const {order} = props;
    console.log(order);
    return(
        <View style={styles.productsContainer} >
           <View style={styles.productContainer}>
 
              <Text style={styles.productName}> 
                 {order.item.orderName}
                 </Text>
              <Text style={styles.productDates}>Celular: {order.item.phone}</Text>
              <Text style={styles.productDates}>Dirección: {order.item.direction}</Text>
              <Text style={styles.productDates}>Anotaciones del cliente: {order.item.note}</Text>
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
        height: 125,
        backgroundColor: "#D1D1D1",
        shadowColor: "#A0A0A0",
     },
     productName:{
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 15,
        color: "#ff003c"
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
 
