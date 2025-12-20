import { collection,  doc,  getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import { products } from "../data/products";
import { store } from "../store/store";

export const getProductsData = async() =>{
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    const list: any = []
    querySnapshot.forEach((doc)=>{
      list.push(doc.data())
    })
    return list
  } catch (error) {

  }
}

interface Order {
  id: string;
  createdAt: any;
  totalProductsPricesSum: number;
  totalPrice: number;
}
export const fetchUSerOrders = async(): Promise<Order[]> =>{
try {
   const userIdFromFireBase = auth.currentUser?.uid

   if (!userIdFromFireBase) {
      console.log("User not logged in");
      return [];
    }

   const userOrdersRef = collection(doc(db, "users", userIdFromFireBase), "orders")


   const querySnapshot =await getDocs(userOrdersRef)

   const orderList = querySnapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
   })) as Order[];
    return orderList
} catch (error) {
  console.log("error fetching orders", error);
  return [];
}
}