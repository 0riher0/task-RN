import React, { useState } from "react";
import { TextInput, Button, StyleSheet, View } from "react-native";

const CommentInput = ({ onAddComment }: any) => {
  const [newComment, setNewComment] = useState("");

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      {newComment.length > 0 && (
        <Button
          title="Comment "
          onPress={() => {
            if (newComment.trim()) {
              onAddComment(newComment);
              setNewComment("");
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
});

export default CommentInput;
