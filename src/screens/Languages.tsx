import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { queryCache, useQuery } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchLanguageList = async () => {
  const { data } = await axios.get(`${apiUrl}/languages`);

  return data;
};

export default function Languages(props) {
  const { status, data, error } = useQuery("languages", fetchLanguageList);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  const RenderLanguages = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          queryCache.setQueryData("selectedLanguage", item);
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
        data={data.languages}
        renderItem={RenderLanguages}
        onEndReached={() => console.log("test")}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
