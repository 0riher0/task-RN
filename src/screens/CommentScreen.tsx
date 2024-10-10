import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { addComment, createTable, loadComments } from "../database/CommentDB";
import CommentInput from "../components/CommentInput";
import CommentItem from "../components/CommentItem";

const CommentsScreen = () => {
  const [comments, setComments] = useState<any>([]);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    createTable();
    loadComments(setComments);
  }, []);

  const handleAddComment = (text: any, parentId = null) => {
    addComment(text, parentId, (newComment: any) => {
      setComments([...comments, newComment]);
    });
  };

  const handleReply = (commentId: React.SetStateAction<null>) => {
    setReplyingTo(commentId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments.filter((c: { parentId: null }) => c.parentId === null)}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            comments={comments}
            addComment={handleAddComment}
            handleReply={handleReply}
            replyingTo={replyingTo}
          />
        )}
        ListFooterComponent={
          <>
            <View style={styles.heght} />
          </>
        }
      />

      <CommentInput onAddComment={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  flatListStyle: {
    paddingHorizontal: 20,
  },
  heght: {
    height: 50,
    width: "100%",
  },
});

export default CommentsScreen;
