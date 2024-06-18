import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import VectorIcon from '../utils/VectorIcon';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';

const PostCard = ({posts,myPost}) => {
 const navigation = useNavigation();
 const [modalVisible, setModalVisible] = useState(false);
 const [post, setPost] = useState({});
  const handleDeletePropmt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

    //delete post data
    const handleDeletePost = async (id) => {
      try {
        const { data } = await axios.delete(`/post/delete-post/${id}`);
        alert(data?.message);
        navigation.navigate("About")
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
  return (
   
    <View style={{flex:1,width:"100%",alignItems:"center"}}>

{myPost && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
       {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {myPost && <><Text style={{ marginHorizontal: 20 }}>
                <TouchableOpacity  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}>

                <VectorIcon
                type="FontAwesome5"
                  name="pen"
                  size={16}
                  color={"darkblue"}
                 
                /> 
                </TouchableOpacity>
              </Text>
              <TouchableOpacity onPress={()=>handleDeletePropmt(post?._id)}>
                <VectorIcon
                type='FontAwesome5'
                  name="trash"
                  size={16}
                  color={"red"}
                    
                />
              </TouchableOpacity></> }
              
            </View>
        
          <Text style={styles.title}>Title : {post?.title}</Text>
          <Text style={styles.desc}> {post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {" "}
                <VectorIcon type="FontAwesome5" name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              {" "}
              <VectorIcon type="FontAwesome5" name="clock" color={"orange"} />
              10:30
            </Text>
          </View>
        </View>
      ))}
    </View>

  )
};

const styles = StyleSheet.create({
    heading: {
      color: "green",
      textAlign: "center",
    },
    card: {
      width: "95%",
      backgroundColor: "#ffffff",
      borderWidth: 0.2,
      borderColor: "gray",
      padding: 20,
      borderRadius: 5,
      marginVertical: 10,
    },
    title: {
      fontWeight: "bold",
      paddingBottom: 10,
      borderBottomWidth: 0.3,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    desc: {
      marginTop: 10,
    },
  });

export default PostCard