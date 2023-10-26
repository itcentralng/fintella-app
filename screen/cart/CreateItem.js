import React, { useState } from "react";
import { TextInput, Button, View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { formatNumber } from "../helpers";

const CreateItem = () => {
  const [vendor, setVendor] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const newItem = { vendor, itemName, price, quantity };
    setItems([...items, newItem]);
    setItemName("");
    setPrice("");
    setQuantity("");
  };

  const handleSubmit = () => {
    // Submit items array to API
  };

  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * parseFloat(item.quantity),
    0
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Vendor"
        value={vendor}
        onChangeText={setVendor}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <CustomButton label="Add Item" onPress={handleAddItem} />
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
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.itemName}</Text>
          <Text style={styles.itemText}>{formatNumber(item.price)}</Text>
          <Text style={styles.itemText}>{item.quantity}</Text>
          <Text style={styles.itemText}>{formatNumber(item.quantity * item.price)}</Text>
        </View>
      ))}

      <CustomButton label="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: "20%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreateItem;
