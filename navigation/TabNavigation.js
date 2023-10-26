import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../config/theme";
import Dashboard from "../screen/dashboard/Dashboard";
import Scan from "../screen/dashboard/Scan";

const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardHome"
      component={
        <View>
          <Text>Dashboard</Text>
        </View>
      }
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();

function BottomNavigationTabs() {
  //   const { cart } = useSelector((s) => s.cart);
  const appColor = colors.dark;
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor={appColor.primaryColor}
      inactiveColor={appColor.darkGrey}
      barStyle={{ backgroundColor: appColor.white }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={
          <View>
            <Text>Cart</Text>
          </View>
        }
        // options={{
        //   tabBarLabel: "Cart",
        //   tabBarIcon: ({ color }) => (
        //     <View style={styles.cartContainer}>
        //       <MaterialIcons name="cart" color={color} size={26} />
        //       <View style={styles.cartLabel}>
        //         <Text>{cart.length}</Text>
        //       </View>
        //     </View>
        //   ),
        // }}
      /> */}

      {/* <Tab.Screen
        name="Profile"
        component={
          <View>
            <Text>Profile</Text>
          </View>
        }
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="user" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default BottomNavigationTabs;
