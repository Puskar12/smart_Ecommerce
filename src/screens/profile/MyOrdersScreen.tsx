import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import OrderItem from "../../components/cart/OrderItem";
import AppSafeView from "../../components/views/AppSaveView";
import { fetchUSerOrders } from "../../config/dataServices";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";

interface Order {
  id: string;
  createdAt: any;
  totalProductsPricesSum: number;
  totalPrice: number;
}

const MyOrdersScreen = () => {

  const [orderList, setOrderList] = useState<Order[]>([])

  const fetchOrders = async() =>{
    const res = await fetchUSerOrders()
    setOrderList(res)
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <AppSafeView>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: sharedPaddingHorizontal }}
        data={orderList}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => {
          
          return(<OrderItem
            date={getDateFromFireStoreTimeStampObject(item.createdAt)}
            totalAmount={item.totalProductsPricesSum}
            totalPrice={item.totalPrice}
            style={{ marginBottom: 10 }}
          />)
        }}
      />
    </AppSafeView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({});
