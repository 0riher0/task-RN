import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommentItem = ({ comment, isReply = false }: any) => {
  return (
    <View style={[styles.commentItem, isReply && styles.reply]}>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    marginBottom: 10,
  },
  reply: {
    marginLeft: 20,
  },
  commentText: {
    fontSize: 16,
  },
});

export default CommentItem;
