// CommentsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import CommentInput from "../components/CommentInput";
import CommentItem from "../components/CommentItem";
import {
  createTable,
  loadComments,
  addComment,
  clearDatabase,
} from "../database/CommentDB";

const CommentsScreen: React.FC = () => {
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    createTable();
    loadComments(setComments);
  }, []);

  const handleAddComment = (text: string, parentId: number | null) => {
    addComment(text, parentId, (newComment) => {
      setComments((prev: any) => [...prev, newComment]);
    });
  };

  return (
    <View style={styles.container}>
      <CommentInput addComment={handleAddComment} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem comment={item} addComment={handleAddComment} />
        )}
      />
      <Button title="Clear" onPress={clearDatabase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default CommentsScreen;
