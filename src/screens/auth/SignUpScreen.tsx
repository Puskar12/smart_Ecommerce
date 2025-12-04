import { Image, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { AppFonts } from "../../styles/fonts";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

import { useTranslation } from "react-i18next";
import { doc, setDoc } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const SignUpScreen = () => {
  const { t } = useTranslation();
  const schema = yup
    .object({
      username: yup
        .string()
        .required(t("sign_up_username_required"))
        .min(5, t("sign_up_username_min_length"))
        .matches(/^[a-z A-Z]+$/, t("sign_up_username_format")),
      email: yup
        .string()
        .email(t("sign_up_email_invalid"))
        .required(t("sign_up_email_required")),
      password: yup
        .string()
        .required(t("sign_up_password_required"))
        .min(6, t("sign_up_password_min_length"))
        .matches(/[a-z]/, t("sign_up_password_lowercase"))
        .matches(/[A-Z]/, t("sign_up_password_upercase"))
        .matches(/[0-9]/, t("sign_up_password_number"))
        .matches(/[!@#$%^&*(),.?":{}|<>]/, t("sign_up_password_character")),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const dispatch = useDispatch();

  const onSignUpPress = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      Alert.alert(t("sign_up_success"));
      navigation.navigate("MainAppbottomTabs");
      console.log(JSON.stringify(userCredential.user, null, 3));

      const userDataObj = {
        uid: userCredential.user.uid,
        userName: data.username,
        email: data.email,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userDataObj)

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = t("sign_up_error_email_in_use");
      } else if (error.code === "auth/invalid-email") {
        errorMessage = t("sign_up_error_invalid_email");
      } else if (error.code === "auth/weak-password") {
        errorMessage = t("sign_up_error_weak_password");
      } else {
        errorMessage = t("sign_up_error_default");
      }

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController<FormData>
        control={control}
        name="username"
        placeholder={t("sign_up_username_placeholder")}
      />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder={t("sign_up_email_placeholder")}
        keyboardType="email-address"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder={t("sign_up_password_placeholder")}
        secureTextEntry
      />
      <AppText style={[styles.appName, { fontFamily: AppFonts.titleMedium }]}>
        {" "}
        Smart E-Commerce
      </AppText>
      <AppButton
        title={t("sign_up_create_account_button")}
        styleTitle={{ fontFamily: AppFonts.textRegular }}
        onPress={handleSubmit(onSignUpPress)}
      />
      <AppButton
        style={styles.signInButton}
        textColor={AppColors.primary}
        title={t("sign_up_goto_signin_button")}
        styleTitle={{ fontFamily: AppFonts.textRegular }}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

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
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
