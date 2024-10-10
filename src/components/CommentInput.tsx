// CommentInput.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface CommentInputProps {
  addComment: (text: string, parentId: number | null) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ addComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addComment(text, null);
      setText("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Comment..."
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default CommentInput;
