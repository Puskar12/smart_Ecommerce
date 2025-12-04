import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppText from '../../components/texts/AppText'
import AppButton from '../../components/buttons/AppButton'
import { AppFonts } from '../../styles/fonts'
import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigations/types'

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const EmptyCart = () => {
  const navigate = useNavigation<CartScreenNavigationProp>()
  return (
    <View style={styles.container} >
      <MaterialCommunityIcons
      name='shopping-outline'
      size={s(100)}
      color={AppColors.primary}
      style={styles.icon}
      />
      <AppText style={styles.title}>{t("empty_cart_title")}</AppText>
      <AppText style={styles.subTitle}>
        {t("empty_cart_subtitle")}
      </AppText>
      <AppButton 
        title={t("start_shopping")}
      onPress={()=>navigate.navigate("Home")}
      styleTitle={{
        fontFamily:AppFonts.textRegular
      }}
      style={styles.button}
      />
    </View>
  )
}

export default EmptyCart

const styles = StyleSheet.create({
  container:{
    backgroundColor:AppColors.blueGray,
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    paddingHorizontal: s(20)
  },
  icon:{
    marginBottom: vs(20),
    opacity: 0.5,
  },
  title:{
    fontFamily: AppFonts.titleBold,
    fontSize: s(20),
    color: AppColors.primary,
    marginBottom: vs(10),
  },
  subTitle:{
    fontSize: s(13),
    fontFamily: AppFonts.titleMedium,
    marginBottom: vs(20),
    color: AppColors.medGray,
    textAlign:"center",
  },
  button:{
    width:"80%",
  },
})