import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckOutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { setUserData } from "../store/reducers/userSlice";

import { useTranslation } from "react-i18next";
import { AppColors } from "../styles/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";



const Stack = createStackNavigator();

const MainAppStack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userData, setUserDatas] = useState<object | null>(null)
  const dispatch = useDispatch()
  const { t } = useTranslation();

  useEffect(()=>{
    onAuthStateChanged(auth, async(userDataFromFireBase) => {
      if (userDataFromFireBase){
         console.log("User is Signed In");
         const userDoc = await getDoc(doc(db, "users", "6O2aU1NNulSiMyo0N63WfYi6g2m1"));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserDatas(data)
      dispatch(setUserData(data));
    }
         setIsLoading(false);
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
