import { StyleSheet, View, Text, Button, TextInput, Image, Animated } from 'react-native'
import React from 'react'
import {useGetProductQuery} from "../src/features/productsApi"
import { useNavigation } from '@react-navigation/native';
import {useState, useRef} from "react"
import { useSelector, useDispatch } from "react-redux";

export default function ProductsDetails({ route}) {
const navigation = useNavigation(); 

const logged = useSelector((state) => state.logged.loggedState);

const {data:product} = useGetProductQuery(route.params)
const dataProduct = product?.response

function upperCaseOne(search) {
    return search.charAt(0).toUpperCase() + search.slice(1)
}

console.log(dataProduct?.photo?.[0]);

const scrollX = useRef(new Animated.Value(0)).current; 

  return (
<View style={styles.container}>

    <View style={styles.cardContainer}>
      <Text style={styles.text}> {dataProduct?.brand} </Text>
    </View>

    <Animated.FlatList
    onScroll={Animated.event(
      [{nativeEvent: { contentOffset: { x: scrollX}
      }}], { useNativeDriver: true })}
        data={dataProduct?.photo}
        horizontal={true}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval = {200}
        pagingEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={16}
        keyExtractor={(item) => item?._id} 
        renderItem={({ item }) => {
          return (
          <Animated.View style={{
            width:450,
            height: 250,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45
            }}>
            <Image 
                source={{uri:item}}
                style={styles.image}
            />
          </Animated.View>)  
            
        }}
    />

    <View style={{display: 'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Text style={styles.textDescription}>{dataProduct?.description}</Text>
    <View>
      <Text style={styles.textPrice}>${dataProduct?.price}</Text>
    </View>

    <View style={styles.buttons}>
      {logged ? <Button style={styles.butt}
            title={"Add to Cart"}
            />  : null }

            <Button style={styles.butt}
            title={"Go back to All Products"}
            onPress={() => navigation.navigate("Products")}
            /> 

            </View>
      </View>
</View>

  )
}

const styles = StyleSheet.create({
  cardContainer: {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    color: 'white',
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: "cover",
    borderRadius: 20
  }, 
  text: {
    width:"80%",
    textAlign: "center",
    opacity:.9,
    fontSize: 30,
    marginTop: 25
  },
  buttons: {
    display: 'flex',
    justifyContent:  "space-between",
    height: 150,
    marginBottom: 10,
    width: '100%',
    padding:15
  },
  butt:{
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    margin: 10,
    width: 200,
    marginTop: 15,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  textPrice: {
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(180, 180, 180)'
  },
  textDescription: {
    marginBottom:30,
    width:"80%",
    textAlign: "center",
    opacity:.9,
    fontSize: 20
  }

})