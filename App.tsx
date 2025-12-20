import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigations/MainAppStack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import React, { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { s, vs } from "react-native-size-matters";
import i18n from "./src/localization/i18n";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import { AppColors } from "./src/styles/colors";
import { dataUploadInFirebase } from "./src/config/firebase";
import LanguageBottomSheet from "./src/components/language/LanguageBottomSheet";
import { SheetProvider, registerSheet } from "react-native-actions-sheet";



registerSheet("LANG_SHEET", LanguageBottomSheet);
export default function App() {
  const [fontsLoaded] = useFonts({
    "Orbitron-Bold": require("./src/assets/fonts/Orbitron-Bold.ttf"),
    "Orbitron-Medium": require("./src/assets/fonts/Orbitron-Medium.ttf"),
    "Delius-Regular": require("./src/assets/fonts/Delius-Regular.ttf"),
  });
//  useEffect(() => {
//    dataUploadInFirebase();
// }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={AppColors.primary} />;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate
  loading={
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={AppColors.primary}/>
    </View>
  } persistor={persistor}>
          <I18nextProvider i18n={i18n}>
          <SheetProvider>
            <NavigationContainer>
              <StatusBar 
                style="dark"
                backgroundColor={AppColors.background || "#ffffff"}
                translucent={false}
              />
              <FlashMessage position={"top"} style={styles.flashContainer} />
              <MainAppStack />
            </NavigationContainer>
          </SheetProvider>
        </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  flashContainer: {
    paddingTop: vs(35),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: -s(8),
  },
});
