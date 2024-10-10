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

const CommentItem = ({
  comment,
  comments,
  addComment,
  handleReply,
  replyingTo,
}: any) => {
  const [replies, setReplies] = useState<any>([]);
  const [isReplyVisible, setReplyVisible] = useState(false);

  useEffect(() => {
    getReplies(comment.id, (fetchedReplies: any) => {
      setReplies(fetchedReplies);
    });
  }, [comments]);

  const handleAddReply = (text: string) => {
    addComment(text, comment.id);
    setReplyVisible(false);
  };
  const handleAppReply = () => {
    handleReply(comment.id);
    setReplyVisible(true);
  };
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{comment.text}</Text>

      <TouchableOpacity onPress={() => handleAppReply()}>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>

      {replyingTo === comment.id && isReplyVisible === true ? (
        <ReplyInput parentId={comment.id} addComment={handleAddReply} />
      ) : null}

      <FlatList
        data={replies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            comments={comments}
            addComment={addComment}
            handleReply={handleReply}
            replyingTo={replyingTo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: 10,
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
