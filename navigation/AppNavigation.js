import * as React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigationTabs from "./TabNavigation";
import { Text, View, useColorScheme } from "react-native";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Register";
import CreateItem from "../screen/cart/CreateItem";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={SplashScreen}
        /> */}
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />

        <Stack.Screen
          name="CreateItem"
          options={{
            title: "Create Cart Item",
            headerTransparent: true,
            headerShown: true,
          }}
          component={CreateItem}
        />
        <Stack.Screen name="AppHome" options={{ headerShown: false }} component={BottomNavigationTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
