import i18n from "i18next"
import {initReactI18next, Translation} from "react-i18next"
import en from "./en.json"
import bn from "./bn.json"
import hi from "./hi.json"
import es from "./es.json"
import fr from "./fr.json"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LANGUAGES ={
  en:{
    translation: en
  },
  bn:{
    translation: bn
  },
  hi:{
    translation: hi
  },
  es:{
    translation: es
  },
  fr:{
    translation: fr
  },
}

const languageDetector = {
  type:"languageDetector",
  async: true,
  detect: async(callback: (lang: string)=> void)=>{
    try {
      const savedLanguage = await AsyncStorage.getItem("LANGUAGE")
      if(savedLanguage){
        callback(savedLanguage)
        return;
      }
    } catch (error) {
       console.log("Error Reading Language", error);
    }
    callback("en")
  },
  cacheUserLanguage: async(lang: string)=>{
    try {
      await AsyncStorage.setItem("LANGUAGE", lang)
    } catch (error) {
       console.log("Error Saving Language", error);
    }
  },
}

i18n.use(languageDetector as any).use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react:{
    useSuspense: false
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n