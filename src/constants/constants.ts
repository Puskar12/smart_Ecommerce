import { Platform } from "react-native";

export const IS_Android = Platform.OS === "android"
export const IS_IOS = Platform.OS === "ios"


export const taxes = ()=>{
  //percentage of tax
  const tax = 18
  return tax/100
}
export const shippingFees = 10


export const convertUsdToInr = (price: any)=>{
  const value = Number(price)
  const valueOfInr = 85
  return value * valueOfInr
}