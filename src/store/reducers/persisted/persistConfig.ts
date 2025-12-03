import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import cartSlice from "../cartSlice";


const persistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whitelist: ["items"]
}

export const persistedCartSlice = persistReducer(persistConfig, cartSlice)