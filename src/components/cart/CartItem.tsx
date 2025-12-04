import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { products } from "../../data/products";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { convertUsdToInr } from "../../constants/constants";

interface CartItemProps{
  imageURL?: string;
  title?: string;
  price?: string | number;
  qty?: string | number ;
  onIncreasePress?: ()=>void;
  onReducePress?: ()=>void; 
  onDeletePress?: ()=>void;
}

const CartItem:FC<CartItemProps> = ({
  imageURL,
  title,
  price,
  qty,
  onIncreasePress,
  onReducePress,
  onDeletePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageComtainer}>
        <Image style={styles.image} source={{ uri: imageURL }} />
      </View>

      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>₹ {convertUsdToInr(price)}</AppText>
        <View style={styles.qtyContainer}>
          <Pressable onPress={onIncreasePress} style={styles.button}>
            <FontAwesome name="plus" size={s(10)} color={AppColors.primary} />
          </Pressable>
          <AppText style={styles.textQty}>{qty}</AppText>
          <Pressable onPress={onReducePress} style={styles.button}>
            <FontAwesome name="minus" size={s(10)} color={AppColors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.deleteContainer}>
        <Pressable onPress={onDeletePress} style={styles.deleteButton}>
          <AntDesign name="delete" size={s(15)} color={AppColors.redColor} />
          <AppText style={styles.deleteText}>Delete</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: AppColors.blueGray,
    height: vs(100),
    width: "100%",
    paddingBottom: vs(4),
    borderBottomWidth: 1,
  },
  imageComtainer: {
    alignItems: "center",
    flex: 1.5,
    justifyContent: "center",
  },
  qtyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: s(5),
    borderRadius: s(30),
    borderWidth: s(1),
    borderColor: AppColors.blueGray,
    width: s(80),
    paddingVertical: vs(5),
    position: "absolute",
    bottom: 5,
    left: 2,
  },
  textQty: {
    flex: 1,
    textAlign: "center",
    color: AppColors.primary,
  },
  detailsContainer: {
    flex: 3.5,
    paddingVertical: vs(5),
  },
  image: {
    height: vs(90),
    width: "100%",
    resizeMode: "contain",
  },
  titleText: {
    fontSize: s(14),
    fontFamily: AppFonts.titleMedium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(13),
    fontFamily: AppFonts.textRegular,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  button: {
    width: s(20),
    height: s(20),
    borderRadius: s(10),
    backgroundColor: AppColors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingEnd: s(10),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    marginLeft: s(5),
    fontFamily: AppFonts.textRegular,
    color: AppColors.medGray,
    fontSize: s(12),
  },
});
