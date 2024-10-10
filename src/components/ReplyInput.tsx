import React, { useState } from "react";
import { TextInput, Button, StyleSheet, View } from "react-native";

const ReplyInput = ({ parentId, addComment }: any) => {
  const [replyText, setReplyText] = useState("");

  return (
    <View style={styles.replyContainer}>
      <TextInput
        style={styles.replyInput}
        placeholder="Write a reply..."
        value={replyText}
        onChangeText={setReplyText}
      />
      <Button
        title="Save answer"
        onPress={() => {
          if (replyText.trim()) {
            addComment(replyText, parentId);
            setReplyText("");
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  replyContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  replyInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ReplyInput;
