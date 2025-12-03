import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import AppText from "../texts/AppText";
import { vs, s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppButtonProps {
  onPress?: () => void;
  title: string;
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
  textColor?: string;
  styleTitle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
const AppButton: FC<AppButtonProps> = ({
  onPress,
  title,
  style,
  backgroundColor = AppColors.primary,
  textColor = AppColors.white,
  styleTitle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? AppColors.disabledGray : backgroundColor,
        },
        style,
      ]}
      disabled={disabled}
    >
      <AppText 
      style={[
        styles.textTitle, 
        styleTitle,{color:textColor}, 
        ]}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(25),
    alignSelf: "center",
  },
  textTitle: {
    fontSize: s(16),
  },
});
