import { View, Text, RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "./Header";
import { usePost } from "../contexts/PostContext";
import PostCard from "./PostCard";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {posts,getAllPosts}=usePost();
   //refresh controll
   const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <Text> Total Number of post : {posts.length}</Text>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } 
         style={{flex:1,width:"100%"}}>
      <PostCard  posts={posts}/>
      </ScrollView>
    </View>
  );
};


export default HomeScreen;