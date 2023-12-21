import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Dashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.balanceLabel, { color: "#252525" }]}>
            Welcome,{" "}
          </Text>
          <Text style={styles.username}>{user?.name}</Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.balanceContainer}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Monthly Spent</Text>
          <Text style={styles.balanceAmount}>₦10,000.00</Text>
        </View>
        <View style={[styles.balanceItem, styles.flex, { marginTop: 7 }]}>
          <View>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balanceAmount}>₦5,000.00</Text>
          </View>
          <View>
            <TouchableOpacity style={{}}>
              <Text></Text>
              <Text style={styles.viewButton}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.flex, { marginTop: 7 }]}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="scan1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateItem")}
        >
          <AntDesign name="addfile" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="creditcard" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="addfile" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardList}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Brought List</Text>
          <Text
            style={[
              styles.viewButton,
              { backgroundColor: "rgba(220, 8, 85, 0.5)" },
            ]}
          >
            View All
          </Text>
        </View>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardDate}>June 1, 2021</Text>
          <Text style={styles.cardAmount}>₦5,000.00</Text>
          <Text>Gbagi Market</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardDate}>May 1, 2021</Text>
          <Text style={styles.cardAmount}>₦7,000.00</Text>
          <Text>John Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardDate}>March 1, 2022</Text>
          <Text style={styles.cardAmount}>₦8,000.00</Text>
          <Text>Lead Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardDate}>June 1, 2022</Text>
          <Text style={styles.cardAmount}>₦20,000.00</Text>
          <Text>Shoprite</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceContainer: {
    marginBottom: 20,
    backgroundColor: "#093C9A",
    padding: 20,
    borderRadius: 10,
  },
  balanceItem: {
    // alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#f1f1f1",
    paddingTop: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 5,
  },
  button: {
    backgroundColor: "#8BB1F8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  scanIcon: {
    width: 30,
    height: 30,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewButton: {
    backgroundColor: "rgba(225, 225, 225, 0.5)",
    color: "white",
    borderRadius: 10,
    fontSize: 16,
    padding: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 16,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
