// CommentItem.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import ReplyInput from "./ReplyInput";
import { getReplies } from "../database/CommentDB";

interface Comment {
  id: number;
  text: string;
  parentId: number | null;
}

interface CommentItemProps {
  comment: Comment;
  addComment: (text: string, parentId: number | null) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, addComment }) => {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  useEffect(() => {
    getReplies(comment.id, setReplies);
  }, [comment.id]);

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{comment.text}</Text>

      <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>

      {replyingTo === comment.id && (
        <ReplyInput parentId={comment.id} addComment={addComment} />
      )}

      <FlatList
        data={replies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem comment={item} addComment={addComment} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  commentText: {
    fontSize: 16,
  },
  replyButton: {
    color: "#007aff",
    marginTop: 5,
  },
});

export default CommentItem;
