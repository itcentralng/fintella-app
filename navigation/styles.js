import { StyleSheet } from "react-native";
import { colors } from "../config/theme";

export default StyleSheet.create({
  cartLabel: {
    backgroundColor: colors.light,
    height: 20,
    width: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: -12,
    marginLeft: -10,
  },
  cartContainer: { display: "flex", flexDirection: "row" },
});
