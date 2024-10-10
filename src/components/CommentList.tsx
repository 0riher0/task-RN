import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { getReplies, addComment } from "../database/CommentDB";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { SQLStatementArg } from "expo-sqlite/legacy";

const CommentList = ({ comment }: any) => {
  const [replies, setReplies] = useState<any>([]);
  const [showReplyInput, setShowReplyInput] = useState(false);

  useEffect(() => {
    getReplies(comment.id, setReplies);
  }, [comment.id]);

  const handleAddReply = (text: SQLStatementArg) => {
    addComment(text, comment.id);
    getReplies(comment.id, setReplies);
    setShowReplyInput(false);
  };

  return (
    <View style={styles.commentContainer}>
      <CommentItem comment={comment} />

      {replies.length > 0 && (
        <FlatList
          data={replies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CommentList comment={item} style={styles.reply} />
          )}
        />
      )}

      {showReplyInput && <CommentInput onSubmit={handleAddReply} />}

      <TouchableOpacity
        onPress={() => setShowReplyInput(!showReplyInput)}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Отвечать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  reply: {
    marginLeft: 20,
  },
  btn: {
    padding: 10,
    width: 100,
  },
  btnText: {
    textAlign: "right",
    color: "blueTextColor",
  },
});

export default CommentList;
