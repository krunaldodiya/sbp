import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./src/screens/Home";
import Languages from "./src/screens/Languages";
import Categories from "./src/screens/Categories";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "SawalBemisaal Preparation Kit" }}
        />
        <Stack.Screen name="Languages" component={Languages} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
