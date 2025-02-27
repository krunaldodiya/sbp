import axios from "axios";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { apiUrl } from "../libs/vars";
import { StoreContext } from "../provider/Provider";

const fetchQuestionList = async (_, params) => {
  const { data } = await axios.get(`${apiUrl}/questions`, { params });

  return data;
};

export default function Home(props: any) {
  const [page, setPage] = React.useState(1);

  const { selectedCategory, selectedLanguage }: any = useContext(StoreContext);

  const { status, data, error } = useQuery(
    [
      "questions",
      {
        category_id: selectedCategory ? selectedCategory.id : null,
        language_id: selectedLanguage ? selectedLanguage.id : null,
        page,
      },
    ],
    fetchQuestionList
  );

  if (status === "loading") {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
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

  const LoadMore = () => {
    setPage(page + 1);
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
            {selectedCategory ? selectedCategory.name : "All Category"}
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
            {selectedLanguage ? selectedLanguage.name : "English"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item: any, index: number) => index.toString()}
          data={data.questions.data}
          renderItem={RenderQuestions}
          onEndReached={LoadMore}
          onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
}
