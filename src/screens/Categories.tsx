import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, queryCache } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchCategoryList = async () => {
  const { data } = await axios.get(`${apiUrl}/categories`);

  return data;
};

export default function Categories(props) {
  const { status, data, error } = useQuery("categories", fetchCategoryList);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  const RenderCategories = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          queryCache.setQueryData("selectedCategory", item);
          props.navigation.pop();
        }}
        style={{ margin: 10 }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item: any, index: number) => index.toString()}
        data={data.categories}
        renderItem={RenderCategories}
        onEndReached={() => console.log("test")}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
