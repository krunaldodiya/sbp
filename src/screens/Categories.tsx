import axios from "axios";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { apiUrl } from "../libs/vars";
import { StoreContext } from "../provider/Provider";

const fetchCategoryList = async () => {
  const { data } = await axios.get(`${apiUrl}/categories`);

  return data;
};

export default function Categories(props) {
  const { status, data, error } = useQuery("categories", fetchCategoryList);
  const { setSelectedCategory }: any = useContext(StoreContext);

  if (status === "loading") {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  const RenderCategories = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item);
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
