import axios from "axios";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useQuery } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchQuestionList = async () => {
  const { data } = await axios.get(`${apiUrl}/questions`);

  return data;
};

export default function Home(props: any) {
  const { status, data, error } = useQuery("questions", fetchQuestionList);

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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.question}
          </Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 600,
              fontSize: 14,
              color: getColor("option_1", item.answer),
            }}
          >
            {item.option_1}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 600,
              fontSize: 14,
              color: getColor("option_2", item.answer),
            }}
          >
            {item.option_2}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 600,
              fontSize: 14,
              color: getColor("option_3", item.answer),
            }}
          >
            {item.option_3}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: 600,
              fontSize: 14,
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
    <View style={{ flex: 1, backgroundColor: "#ddd" }}>
      <FlatList
        keyExtractor={(item: any, index: number) => index.toString()}
        data={data.questions.data}
        renderItem={RenderQuestions}
        onEndReached={() => {
          console.log("test");
        }}
        onEndReachedThreshold={0}
      />
    </View>
  );
}
