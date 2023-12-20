import React, { useContext, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { AntDesign } from "@expo/vector-icons";
import { login } from "./redux/actions/auth";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  let activeColors = colors.dark;
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const dispatch = useDispatch();
  const goHome = () => {
    setLoginLoading(false);
    navigation.navigate("AppHome");
  };
  const _onLoginPressed = () => {
    setLoginLoading(false);
    navigation.navigate("AppHome");
    // if (phone === "" && password === "") {
    //   Alert.alert("Error", "Please fill all the fields");
    // } else {
    //   const error = () => setLoginLoading(false);
    //   let form = {
    //     phone,
    //     password,
    //   };
    //   dispatch(login(form, goHome, error));
    // }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <Text style={{ color: "white" }}>{/* {JSON.stringify({ phone, password })} */}</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/fintella-white.png")}
            style={{
              height: 40,
              width: 160,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <InputField
          selectionColor={activeColors.tint}
          label={"Phone Number"}
          icon={<MaterialIcons name="phone-iphone" size={20} color="#666" style={{ marginRight: 5 }} />}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          keyboardType="telephone"
        />

        <InputField
          label={"Password"}
          icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={"Login"} onPress={_onLoginPressed} loading={loginLoading} />

        <Text
          style={{
            textAlign: "center",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <AntDesign name="google" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <AntDesign name="facebook-square" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <AntDesign name="apple1" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: activeColors.tint }}>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: activeColors.accent, fontWeight: "700" }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
