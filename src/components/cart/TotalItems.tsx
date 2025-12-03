import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { vs, s } from 'react-native-size-matters'
import { taxes, shippingFees, convertUsdToInr } from '../../constants/constants'
import { AppColors } from '../../styles/colors'
import AppText from '../texts/AppText'
import { useTranslation } from "react-i18next";



interface TotalItemsProps{
  itemsPrice: number|string;
}
const TotalItems:FC<TotalItemsProps> = ({
  itemsPrice,
}) => {
  const { t } = useTranslation();
  const convertedPrice = convertUsdToInr(itemsPrice);
  const totalTax = Number(convertUsdToInr(itemsPrice)) * taxes();
  const totalPrice = convertedPrice + totalTax + shippingFees
  return (
    <View style={styles.container}>
       <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_items_price")}</AppText>
        <AppText style={styles.textPrice}>₹ {convertedPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_taxes")}</AppText>
        <AppText style={styles.textPrice}>₹ {Math.abs(totalTax).toFixed(0)}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_shipping_fee")}</AppText>
        <AppText style={styles.textPrice}>₹ {shippingFees}</AppText>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_order_total")}</AppText>
        <AppText style={styles.textPrice}>₹ {Math.abs(totalPrice).toFixed(0)}</AppText>
      </View>
    </View>
  )
}

export default TotalItems

const styles = StyleSheet.create({
  container:{
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: vs(10),
  },
  textTitle: {
    fontSize: s(16),
    flex: 1,
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(5),
  },
})