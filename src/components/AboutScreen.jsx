import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import axios from "axios";

const AboutScreen = () => {

  const [posts, setPosts] = useState([]);
  const getUserPosts = async () => {
    try {
      const { data } = await axios.get("/post/get-user-post");
      setPosts(data?.userPosts);
      console.log("shellll",data?.userPosts)
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <ScrollView style={{width:"100%",flex:1}}>

      <PostCard posts={posts} myPost={true}/>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;