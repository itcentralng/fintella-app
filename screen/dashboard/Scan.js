import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomButton from "../../components/CustomButton";
import { formatNumber } from "../helpers";
import { _fetchApi } from "../redux/actions/api";
import styles from "./Dashboard";
import { SmsDetails } from "../../components/sendMessage";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [vendor, setVendor] = useState("");

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanResult(data);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
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

  // useEffect(() => {
  //   getData();
  // });

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  const handleSubmit = () => {
    // Customize this logic based on what you want to do when the "Save" button is pressed
    console.log("Send button pressed!");
    // SmsDetails();

    // Example: Send data to the server, update database, etc.
  };

  const total = storeData.reduce(
    (acc, item) => acc + parseFloat(item.amount) * parseFloat(item.unit),
    0
  );
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 300, width: "95%" }}
      />

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
            <Text style={[styles.itemText, { fontWeight: "600" }]}>
              Item Name
            </Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Price</Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Qty</Text>
            <Text style={[styles.itemText, { fontWeight: "600" }]}>Total</Text>
          </View>
          {storeData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{formatNumber(item.amount)}</Text>
              <Text style={styles.itemText}>{item.unit}</Text>
              <Text style={styles.itemText}>
                {formatNumber(item.unit * item.amount)}
              </Text>
            </View>
          ))}

          <CustomButton label="Send" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}
