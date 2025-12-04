import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSaveView from "../../components/views/AppSaveView";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { AppFonts } from "../../styles/fonts";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { useNavigation } from "@react-navigation/native";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import { SheetManager } from "react-native-actions-sheet";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { t } = useTranslation();
  const handleLogout = async() =>{
    await AsyncStorage.removeItem("USER_DATA")
    await signOut(auth)
    navigation.navigate("Auth")
  }
  return (
    <AppSaveView>
      <HomeHeader />
      <View style={styles.greetingsContainer}>
        <AppText style={styles.headingText}>{t("profile_welcome", {"userName":"Puskar"})}</AppText>
        <AppText style={styles.bodyText}>{t("profile_welcome_text")}</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <ProfileSectionButton
          onPress={() => navigation.navigate("MyOrdersScreen")}
          title={t("profile_my_orders")}
        />
        <ProfileSectionButton
          title={t("profile_language")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <ProfileSectionButton title={t("profile_logout")} onPress={handleLogout} />
      </View>
      <LanguageBottomSheet />
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  greetingsContainer: {
    paddingHorizontal: s(8),
    height: vs(60),
  },
  headingText: {
    fontSize: s(18),
    marginHorizontal: s(4),
    marginVertical: vs(4),
    fontFamily: AppFonts.titleMedium,
  },
  bodyText: {
    fontSize: s(14),
    fontFamily: AppFonts.textRegular,
  },
  buttonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
  },
});
