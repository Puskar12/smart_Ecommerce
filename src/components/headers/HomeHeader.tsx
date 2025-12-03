import { StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import AppSaveView from '../views/AppSaveView'
import { IMAGES } from '../../constants/images-paths'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo}/>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  logo:{
    height: vs(40),
    width: s(40),
    tintColor: AppColors.white
  },
  container:{
    paddingBottom: vs(15),
    backgroundColor: AppColors.primary,
        alignItems:"center",
        justifyContent:"center",

  },
})