import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useQuery, queryCache } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchQuestionList = async (_, params) => {
  const { data } = await axios.get(`${apiUrl}/questions`, { params });

  return data;
};

export default function Home(props: any) {
  const selectedCategory = queryCache.getQueryData("selectedCategory");
  const selectedLanguage = queryCache.getQueryData("selectedLanguage");

  const { status, data, error } = useQuery(
    [
      "questions",
      {
        category_id: selectedCategory ? selectedCategory.id : null,
        language_id: selectedLanguage ? selectedLanguage.id : null,
      },
    ],
    fetchQuestionList
  );

  console.log("selectedCategory", selectedCategory);

  console.log("selectedLanguage", selectedLanguage);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  const getColor = (option, answer) => {
    return option === answer ? "green" : "black";
  };

  const RenderQuestions = ({ item }) => {
    return (
      <View
        style={{
          padding: 10,
          margin: 5,
          backgroundColor: "#fff",
          elevation: 5,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.question}
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
              color: getColor("option_1", item.answer),
            }}
          >
            {item.option_1}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
              color: getColor("option_2", item.answer),
            }}
          >
            {item.option_2}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
              color: getColor("option_3", item.answer),
            }}
          >
            {item.option_3}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
              color: getColor("option_4", item.answer),
            }}
          >
            {item.option_4}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ddd" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.push("Categories")}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.push("Languages")}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            language
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item: any, index: number) => index.toString()}
          data={data.questions.data}
          renderItem={RenderQuestions}
          onEndReached={() => console.log("test")}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}
