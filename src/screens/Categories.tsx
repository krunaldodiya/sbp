import axios from "axios";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchCategoryList = async () => {
  const { data } = await axios.get(`${apiUrl}/categories`);

  return data;
};

export default function Categories() {
  const { status, data, error } = useQuery("categories", fetchCategoryList);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      {data.categories.map((category) => (
        <View style={{ margin: 5 }} key={category.id}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            {category.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
