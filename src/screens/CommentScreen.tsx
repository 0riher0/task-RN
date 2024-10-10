import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { createTables, getComments, addComment } from "../database/CommentDB";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";

const CommentScreen = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    createTables();
    getComments(setComments);
  }, []);

  const handleAddComment = (text: string) => {
    addComment(text);
    getComments(setComments);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentList comment={item} />}
      />
      <CommentInput onSubmit={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CommentScreen;
