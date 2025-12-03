import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../components/views/AppSaveView";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { AppColors } from "../styles/colors";
import { IS_Android } from "../constants/constants";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";



const Tab = createBottomTabNavigator();

const MainAppBottomTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarLabelStyle: {
          marginTop: vs(4),
          fontSize: s(12),
        },
        tabBarStyle: IS_Android && { height: vs(70) },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: t("tab_home"),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
          title: t("tab_cart"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          title: t("tab_profile"),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainAppBottomTabs;

const styles = StyleSheet.create({});
