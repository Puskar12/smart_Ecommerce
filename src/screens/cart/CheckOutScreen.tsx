import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppSaveView from "../../components/views/AppSaveView";
import {
  IS_IOS,
  IS_Android,
  convertUsdToInr,
  shippingFees,
  taxes,
} from "../../constants/constants";
import { AppColors } from "../../styles/colors";
import {
  sharedPaddingHorizontal,
  commonStyles,
} from "../../styles/sharedStyles";
import * as yup from "yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { emptyCart } from "../../store/reducers/cartSlice";
import { showMessage } from "react-native-flash-message";

import { useTranslation } from "react-i18next";



const CheckOutScreen = () => {
  const { t } = useTranslation();
  
  const schema = yup
    .object({
      fullName: yup
        .string()
        .matches(/^[a-z A-Z]+$/, t("checkout_name_format"))
        .required(t("checkout_name_required"))
        .min(3, t("checkout_name_min_length")),
  
      phoneNumber: yup
        .string()
        .required(t("checkout_phone_required"))
        .matches(/^[0-9]+$/, t("checkout_phone_digits"))
        .min(10, t("checkout_phone_min_length")),
  
      detailedAddress: yup
        .string()
        .required(t("checkout_address_required"))
        .min(15, t("checkout_address_min_length")),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);

  // price calculation
  const TotalItemsPrice = items.reduce((acc, item) => acc + item.sum, 0); // in usd
  const totalProductsPricesSum = convertUsdToInr(TotalItemsPrice); // convert in inr
  const totalTax = totalProductsPricesSum * taxes();
  const totalPrice = totalProductsPricesSum + totalTax + shippingFees;

  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPricesSum,
        createdAt: new Date(),
        totalPrice,
      };
      if (
        typeof userData === "object" &&
        userData !== null &&
        "uid" in userData
      ) {
        const userOrderRef = collection(
          doc(db, "users", userData.uid as string),
          "orders"
        );
        await addDoc(userOrderRef, orderBody);

        const ordersRef = collection(db, "orders");
        await addDoc(ordersRef, orderBody);

        showMessage({
          type: "success",
          message: t("checkout_success_message"),
        });
        navigation.goBack();
        console.log(formData);

        dispatch(emptyCart());
      }
    } catch (error) {
      console.error("Error saving order:", error);
      showMessage({
        type: "danger",
        message: t("checkout_error_message"),
      });
    }
  };

  return (
    <AppSaveView>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder={t("checkout_fullname_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder={t("checkout_phone_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder={t("checkout_address_placeholder")}
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton
          title={t("checkout_confirm_button")}
          onPress={handleSubmit(saveOrder)}
        />
      </View>
    </AppSaveView>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sharedPaddingHorizontal,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : vs(10),
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_Android ? vs(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
