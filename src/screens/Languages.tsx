import axios from "axios";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "react-query";
import { apiUrl } from "../libs/vars";

const fetchLanguageList = async () => {
  const { data } = await axios.get(`${apiUrl}/languages`);

  return data;
};

export default function Languages() {
  const { status, data, error } = useQuery("languages", fetchLanguageList);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      {data.languages.map((language) => (
        <View style={{ margin: 5 }} key={language.id}>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            {language.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
