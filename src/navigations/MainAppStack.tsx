import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckOutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";

import { useTranslation } from "react-i18next";
import { AppColors } from "../styles/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";



const Stack = createStackNavigator();

const MainAppStack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<object | null>(null)
  const { t } = useTranslation();

  useEffect(()=>{
    onAuthStateChanged(auth, (userDataFromFireBase) => {
      if (userDataFromFireBase){
         console.log("User is Signed In");
        setIsLoading(false);
        setUserData(userDataFromFireBase);
      } else {
        console.log("User is Signed Out");
        setIsLoading(false);
      }
    })
  },[])

  if(isLoading){
    return <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <ActivityIndicator size={"large"} color={AppColors.primary} />
    </View>
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData? "MainAppbottomTabs" : "Auth"}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="MainAppbottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{ headerShown: true,   title:t("cart_checkout_screen"),
        }}
      />
      <Stack.Screen name="MyOrdersScreen"
      options={{headerShown: true, title:t("profile_my_orders")}} component={MyOrdersScreen} />
    </Stack.Navigator>
  );
};

export default MainAppStack;

const styles = StyleSheet.create({});
