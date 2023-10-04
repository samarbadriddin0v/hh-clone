import { View, Text, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MyJobs, PopularJobs, Search } from "../components";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SIZES } from "../constants";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#eee" }}
      onLayout={onLayoutRootView}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Search />
          <MyJobs />
          {/* <PopularJobs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
