import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { getReplies, addComment } from "../database/CommentDB";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

const CommentList = ({ comment }: any) => {
  const [replies, setReplies] = useState<any>([]);
  const [showReplyInput, setShowReplyInput] = useState(false);

  useEffect(() => {
    getReplies(comment.id, setReplies);
  }, []);

  const handleAddReply = (text: any) => {
    addComment(text, comment.id);
    getReplies(comment.id, setReplies); // Refresh replies
  };

  return (
    <View style={styles.commentContainer}>
      <CommentItem comment={comment} />
      {replies.length > 0 &&
        replies.map((reply: { id: any }) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      {showReplyInput && <CommentInput onSubmit={handleAddReply} />}
      <Button
        title="Reply"
        onPress={() => setShowReplyInput(!showReplyInput)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default CommentList;
