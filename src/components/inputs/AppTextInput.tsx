import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import React, { FC } from "react";
import { vs, s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppTextInputProps {
  value?: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
  style?: StyleProp<TextStyle>;
}
const AppTextInput: FC<AppTextInputProps> = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={AppColors.primary}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[
        styles.input,
        {
          color: AppColors.primary, // 🔥 FIX 2 – typed text becomes visible
          includeFontPadding: false, // 🔥 FIX 3 – fixes secureTextEntry invisible text bug
          textAlignVertical: "center", // 🔥 FIX 4 – fixes vertical clipping
        },
        style,
      ]}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    height: vs(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: AppColors.white,
    width: "100%",
    marginBottom: vs(10),
  },
});
