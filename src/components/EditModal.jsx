import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, post, onRefresh }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  //handle update post
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      onRefresh();
      alert(data?.message);
      navigation.navigate("About");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //inital post data\
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Update Your Posts</Text>
          <Text>Title</Text>
          <TextInput
            style={styles.inputBox}
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
          <Text>Descriptioon</Text>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            placeholderTextColor={"gray"}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                updatePostHandler(post && post._id),
                  setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>
                {loading ? "Please Wait" : "UPDATE"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default EditModal;
