import { SafeAreaView, StatusBar, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { AppColors } from "../../styles/colors";
import { IS_Android } from "../../constants/constants";

interface AppSaveViewProps{
 children: ReactNode,
 style?:ViewStyle
}
const AppSaveView:FC<AppSaveViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={[styles.container, style]}>
      {children}
    </View>
    </SafeAreaView>
  )
}

export default AppSaveView

const styles = StyleSheet.create({
  safeAreaView:{
    flex:1,
    backgroundColor: AppColors.white,
    paddingTop: IS_Android? StatusBar.currentHeight||0:0,
  },  
  container:{
    flex:1,
  }
})