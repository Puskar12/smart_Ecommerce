import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../../components/headers/HomeHeader'
import AppSaveView from '../../components/views/AppSaveView'
import { AppFonts } from '../../styles/fonts'
import ProductCard from '../../components/cards/ProductCard'
import { s, vs } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../store/reducers/cartSlice'
import { getProductsData } from '../../config/dataServices'

interface Product {
  id: number | string;
  title: string;
  price: number;
  imageURL: string;
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProduts] = useState<Product[]>([])
  const fetchData = async() =>{
    const res = await getProductsData()
    setProduts(res)
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={styles.container}>
        <FlatList
         numColumns={2}
         data={products}
         keyExtractor={(item)=>item.id.toString()}
         renderItem={({item})=>{
          return <ProductCard imageURL={item.imageURL} price={item.price} title={item.title} onAddToCartPress={()=>dispatch(addItemToCart(item))}/>
         }}
         columnWrapperStyle={{
          justifyContent:"space-between",
          marginBottom: vs(10)
         }}
         contentContainerStyle={{
          paddingHorizontal: s(10),
          paddingBottom: vs(55),
          paddingTop: vs(8)
          
         }}
         showsVerticalScrollIndicator={false}
         />
      </View>
    </AppSaveView>
  )
} 

export default HomeScreen

const styles = StyleSheet.create({
  container:{
  }
})