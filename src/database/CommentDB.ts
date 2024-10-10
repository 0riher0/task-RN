import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("comments.db");

export const createTable = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        parent_id INTEGER
      )`,
      [],
      () => {
        console.log("Table created successfully");
      },
      (_: any, error: any) => {
        console.log("Error creating table " + error.message);
      }
    );
  });
};

export const getReplies = (parentId: SQLite.SQLStatementArg, callback: any) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM comments WHERE parent_id = ?;",
      [parentId],
      (_, { rows }) => {
        console.log("Fetched replies for parentId", parentId, ":", rows);
        callback(rows._array);
      },
      (_, error) => {
        console.error("Error fetching replies:", error);
        return false;
      }
    );
  });
};

export const loadComments = (callback: any) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `SELECT * FROM comments;`,
      [],
      (_: any, { rows: { _array } }: any) => {
        callback(_array);
      },
      (_: any, error: any) => {
        console.log("XatolikOlishda: ", error);
      }
    );
  });
};

export const addComment = (
  text: string,
  parentId: number | null,
  callback: (comment: {
    id: number;
    text: string;
    parentId: number | null;
  }) => void
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `INSERT INTO comments (text, parent_id) VALUES (?, ?);`,
      [text, parentId],
      (_: any, { insertId }: any) => callback({ id: insertId, text, parentId }),
      (_: any, error: any) => console.error("XatolikYuborishda: ", error)
    );
  });
};

export default db;
