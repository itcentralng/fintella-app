import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { colors } from "../config/theme";
import { ButtonGroup } from "@rneui/themed";
import InputField from "../components/InputField";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import styles from "../navigation/styles";
import { signup } from "./redux/actions/auth";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleImage = async () => {
    if (Constants.platform.ios) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setLogo(result.uri);
      setImage(result);
    }
  };

  const dispatch = useDispatch();

  let activeColors = colors.dark;

  const goHome = () => {
    setLoginLoading(false);
    navigation.navigate("AppHome");
  };

  const _onLoginPressed = () => {
    setLoginLoading(true);
    if (phone === "" || password === confirmPassword) {
      Alert.alert("Error", "Please fill all the fields");
    } else {
      const error = () => setLoginLoading(false);
      let form = {
        phone,
        password,
        name,
        type: selectedIndex === 1 ? "vendor" : "user",
      };
      dispatch(signup(form, goHome, error));
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 50 }}
      >
        <View style={{ alignItems: "center", marginTop: 15 }}>
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
            fontSize: 18,
            fontWeight: "500",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Register
        </Text>
        <ButtonGroup
          buttonStyle={{ padding: 5 }}
          selectedButtonStyle={{ backgroundColor: "#e2e2e2" }}
          buttons={[
            <View style={styles.cartContainer}>
              <Text style={{ color: "black" }}>User</Text>
            </View>,
            <View style={styles.cartContainer}>
              <Text style={{ color: "black" }}>Vendor</Text>
            </View>,
          ]}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
        />

        <InputField
          label={selectedIndex === 1 ? "Vendor name" : "Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5, marginTop: 10 }}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          }
        />

        <InputField
          label={"Phone number"}
          icon={
            <MaterialIcons
              name="phone-iphone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="tel"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />

        <InputField
          label={"Address"}
          icon={
            <MaterialIcons
              name="address"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="tel"
          onChangeText={(text) => setAddress(text)}
          value={address}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
              onChangeText={(text) => setPassword(text)}
            />
          }
          inputType="password"
          value={password}
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        {selectedIndex === 1 && (
          <>
            <InputField
              label={"Agent Name"}
              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5, marginTop: 10 }}
                  onChangeText={(text) => setAgentName(text)}
                  value={agentName}
                />
              }
            />
            <InputField
              label={"Agent Phone number"}
              icon={
                <MaterialIcons
                  name="phone-iphone"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              keyboardType="tel"
              onChangeText={(text) => setAgentPhone(text)}
              value={agentPhone}
            />

            <TouchableOpacity onPress={handleImage}>
              {logo ? (
                <Image
                  source={{ uri: logo }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>Upload Logo</Text>
                </View>
              )}
            </TouchableOpacity>


            <InputField
              label={"Agent Password"}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                  onChangeText={(text) => setAgentPassword(text)}
                  value={agentPassword}
                />
              }
              inputType="password"
            />
          </>
        )}

        <CustomButton label={"Register"} onPress={() => {}} />
        <Text
          style={{
            textAlign: "center",
            color: activeColors.tint,
            marginBottom: 30,
          }}
        >
          Or, register with email ...
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: activeColors.tint,
              marginBottom: 30,
            }}
          >
            Already registered?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: activeColors.tint,
                marginBottom: 30,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
