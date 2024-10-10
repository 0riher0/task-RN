import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const CommentInput = ({ onSubmit }: any) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});

export default CommentInput;
