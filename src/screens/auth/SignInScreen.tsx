import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppButton from "../../components/buttons/AppButton";
import AppText from "../../components/texts/AppText";
import { IMAGES } from "../../constants/images-paths";
import { useNavigation } from "@react-navigation/native";
import { AppFonts } from "../../styles/fonts";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

import { useTranslation } from "react-i18next";



const SignInScreen = () => {

  const { t } = useTranslation();


const schema = yup.object({
  email: yup
  .string().email(t("sign_in_email_invalid")).required(t("sign_in_email_required")),
  password: yup.string()
        .required(t("sign_in_password_required"))
   .min(6, t("sign_in_password_min_length"))
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})
.required();


type FormData = yup.InferType<typeof schema>;


  const {control, handleSubmit} = useForm<FormData>({
    resolver:yupResolver(schema),
    defaultValues: {
      email: __DEV__? "test@gmail.com":"",
      password:__DEV__? "12345678" : "",
    },
  }) 
  const navigation = useNavigation();

  const dispatch = useDispatch()

  const onLoginPress= async(data: FormData)=> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      navigation.navigate("MainAppbottomTabs")
      // console.log(JSON.stringify(userCredential, null, 3));
      const userDataObj = {
        uid: userCredential.user.uid
      }

      dispatch(setUserData(userDataObj))
      
    } catch (error : any) {
      let errorMessage = "";
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        errorMessage = t("sign_in_error_user_not_found");
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("sign_in_error_invalid_credential");
      } else {
        errorMessage = t("sign_in_error_default");
      }

      showMessage({
        type: "danger",
        message: errorMessage
      })
      }
  }

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder={t("sign_in_email_placeholder")}
        keyboardType="email-address"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder={t("sign_in_password_placeholder")}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      {/* add  handleSubmit function*/}
      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onLoginPress)}
      />
      <AppButton
        title={t("sign_in_signup_button")}
        style={styles.registerButton}
        styleTitle={{fontFamily:AppFonts.textRegular}}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
    fontFamily:AppFonts.textRegular,
  },
});
