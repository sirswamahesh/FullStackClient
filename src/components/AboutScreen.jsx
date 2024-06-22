import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import axios from "axios";

const AboutScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getUserPosts = async () => {
    try {
      const { data } = await axios.get("/post/get-user-post");
      setPosts(data?.userPosts);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        {" "}
        Total Number of post : {posts.length}
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ width: "100%", flex: 1 }}
      >
        <PostCard
          posts={posts}
          myPost={true}
          setRefreshing={setRefreshing}
          onRefresh={onRefresh}
        />
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
