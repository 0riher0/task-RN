import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("commentDB");

export const createTables = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        parent_id INTEGER
      )`,
      [],
      () => {
        console.log("Table created successfully");
      },
      (error) => {
        console.log("Error creating table " + error.message);
      }
    );
  });
};

export const getComments = (setComments) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM comments WHERE parent_id IS NULL`,
      [],
      (tx, res) => {
        let comments = [];
        for (let i = 0; i < res.rows.length; i++) {
          comments.push(res.rows.item(i));
        }
        setComments(comments);
      },
      (error) => {
        console.log("Error fetching comments " + error.message);
      }
    );
  });
};

export const getReplies = (parentId, setReplies) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM comments WHERE parent_id = ?`,
      [parentId],
      (tx, res) => {
        let replies = [];
        for (let i = 0; i < res.rows.length; i++) {
          replies.push(res.rows.item(i));
        }
        setReplies(replies);
      },
      (error) => {
        console.log("Error fetching replies " + error.message);
      }
    );
  });
};

export const addComment = (text, parentId = null) => {
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO comments (text, parent_id) VALUES (?, ?)`,
      [text, parentId],
      (tx, res) => {
        console.log("Comment added successfully");
      },
      (error) => {
        console.log("Error adding comment " + error.message);
      }
    );
  });
};
