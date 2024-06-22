import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  //get posts
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/post/get-all-post");
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // inintal  posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, getAllPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
