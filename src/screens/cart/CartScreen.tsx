import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSaveView from "../../components/views/AppSaveView";
import CartItem from "../../components/cart/CartItem";
import { products } from "../../data/products";
import TotalItems from "../../components/cart/TotalItems";
import { FlatList } from "react-native-gesture-handler";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";

import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const CartScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigation<CartScreenNavigationProp>();
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const TotalItemsPrice = items.reduce((acc, item)=> acc+item.sum,0)
  return (
    <AppSaveView>
      <HomeHeader />
      {items.length >0 ? (<View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CartItem
                {...item}
                price={item.sum}
                onIncreasePress={() => dispatch(addItemToCart(item))}
                onReducePress={() => dispatch(removeItemFromCart(item))}
                onDeletePress={()=>dispatch(removeProductFromCart(item))}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <TotalItems itemsPrice={TotalItemsPrice} />
        <AppButton
          title={t("cart_continue_button")}
          onPress={() => navigate.navigate("CheckoutScreen")}
        />
      </View>) : <EmptyCart /> }
      
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
