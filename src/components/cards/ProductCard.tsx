import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { products } from '../../data/products'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import { commonStyles } from '../../styles/sharedStyles'
import AppText from '../texts/AppText'
import { AppFonts } from '../../styles/fonts'
import { Ionicons } from '@expo/vector-icons'
import { convertUsdToInr } from '../../constants/constants'

interface ProductCardProps{
  onAddToCartPress: () => void;
  imageURL: string;
  title: String;
  price: number;
}

const ProductCard:FC<ProductCardProps> = ({
  imageURL,
  title,
  price,
  onAddToCartPress
}) => {
  return (
    <View style={styles.container} >

      <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCartPress}>
        <Ionicons name="cart" size={s(15)} color={AppColors.white}/>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={{uri:imageURL}}/>
      </View>

      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>₹ {convertUsdToInr(price)}</AppText>
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container:{
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    height: vs(160),
    width: s(160),
    ...commonStyles.shadow,
  },
  imageContainer:{overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(100),
    width: "100%",
  },
  image:{
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: s(4),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(13),
    fontFamily: AppFonts.titleMedium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(13),
    fontFamily: AppFonts.textRegular,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  addToCartButton: {
    height: s(28),
    width: s(28),
    position: "absolute",
    left: 5,
    top: 5,
    borderRadius: s(14),
    backgroundColor: AppColors.primary,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})