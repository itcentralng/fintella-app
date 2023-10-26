import { Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./navigation/AppNavigation";
import { Provider } from "react-redux";
import store from "./screen/redux/store";
import { storeData, getData } from "./config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

//creating simple splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("homeTheme", newTheme);
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("homeTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      //hiding the splash screen after 1 second
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };
 
  useEffect(() => {
    fetchStoredTheme();
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme();
      setTheme({ mode: colorScheme });
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
