import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { colors } from "../config/theme";

export default function CustomButton({ label, onPress, loading }) {
  let activeColors = colors.dark;

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={{
        backgroundColor: activeColors.accent,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {loading ? <ActivityIndicator color="#fff" /> : label}
      </Text>
    </TouchableOpacity>
  );
}
