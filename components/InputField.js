import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { colors } from "../config/theme";

export default function InputField(props) {
  let activeColors = colors.dark;
  const {
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
  } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholderTextColor={activeColors.text}
          placeholder={label}
          keyboardAppearance={activeColors.primary}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: activeColors.tint }}
          secureTextEntry={true}
          {...props}
        />
      ) : (
        <TextInput
          placeholderTextColor={activeColors.text}
          placeholder={label}
          keyboardAppearance={activeColors.primary}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: activeColors.tint }}
          {...props}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: activeColors.accent, fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
