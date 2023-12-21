import React, { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomButton from "../../components/CustomButton";
import { formatNumber } from "../helpers";
import { _fetchApi } from "../redux/actions/api";
import styles from "./Dashboard";
import { SmsDetails } from "../../components/sendMessage";
import axios from "axios";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [vendor, setVendor] = useState("");

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanResult(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (scanned && hasPermission) {
      getData();
    }
  }, [scanned, hasPermission]);

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  const getData = () => {
    _fetchApi(
      `order/${scanResult}`,
      (data) => {
        setStoreData(data.products);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleSubmit = async () => {
    console.log("Send button pressed!");
    try {
      const response = await axios.post(
        "https://ff48-197-210-53-85.ngrok-free.app/buyer_message",
        {
          message: "DEBIT: NGN500 was sent to Sidi&Sons supermarket.",
          recipient: "+2348160606060",
          sender: "22881",
        },
        {
          headers: {
            "Content-Type": "application/json", // Proper content type header
          },
        }
      );

      // Check response status or content if needed

      Alert.alert("Message Sent", "The message was sent successfully.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send the message. Please try again.");
    }
  };

  const total = storeData.reduce((acc, item) => acc + parseFloat(item.amount) * parseFloat(item.unit), 0);
  return (
    <View
      style={{
        // flex: 1,
        // flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center", // add this line
        paddingTop: "20%",
        borderRadius: 10,
      }}
    >
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ height: 300, width: "95%" }} />

      {scanned && (
        <>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>

          <View style={styles.flex}>
            <Text style={styles.cardTitle}>{vendor}</Text>
            <Text style={styles.cardTitle}>Total: ₦{formatNumber(total)}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Item Name</Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Price</Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Qty</Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Total</Text>
          </View>
          {storeData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{formatNumber(item.amount)}</Text>
              <Text style={styles.itemText}>{item.unit}</Text>
              <Text style={styles.itemText}>{formatNumber(item.unit * item.amount)}</Text>
            </View>
          ))}

          <CustomButton label="Send" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}
