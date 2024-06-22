import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import Header from "./Header";
import { usePost } from "../contexts/PostContext";

const PostScreen = ({ navigation }) => {
  const { setPosts, posts } = usePost();
  // local state
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [loading, setLoading] = useState(false);

  //handle form data post DATA

  const handlePost = async () => {
    try {
      if (!title) {
        alert("Please add post title ");
        return;
      }
      if (!description) {
        alert("Please add post  description");
        return;
      }

      setLoading(true);
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      const post = data?.post;
      setPosts([post, ...posts]);
      setLoading(false);
      setTitle("");
      setDecription("");
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <View style={{ marginTop: 20 }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Create a post</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="add post title"
              placeholderTextColor={"gray"}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="add post description"
              placeholderTextColor={"gray"}
              multiline={true}
              numberOfLines={6}
              value={description}
              onChangeText={(text) => setDecription(text)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.postBtnText}>Create post</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default PostScreen;
