import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("comments.db");

export const createTable = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            parentId INTEGER
          );`,
      [],
      () => {
        console.log("Jadval yaratildi");
      },
      (_: any, error: any) => {
        console.log("Xatolik: ", error);
      }
    );
  });
};

export const loadComments = (callback: (comments: any[]) => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `SELECT * FROM comments;`,
      [],
      (_: any, { rows: { _array } }: any) => callback(_array),
      (_: any, error: any) => console.error("XatolikLoad: ", error)
    );
  });
};

export const addComment = (
  text: string,
  parentId: number | null,
  callback: (newComment: any) => void
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO comments (text, parentId) VALUES (?, ?);",
      [text, parentId],
      (_, { insertId }: any) => callback({ id: insertId, text, parentId }),
      (_: any, error: any) => console.error("Xatolik: ", error)
    );
  });
};

export const getReplies = (
  parentId: number,
  callback: (replies: any[]) => void
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `SELECT * FROM comments WHERE parentId = ?;`,
      [parentId],
      (_: any, { rows: { _array } }: any) => callback(_array),
      (_: any, error: any) => console.error("XatolikOlishda: ", error)
    );
  });
};

export const clearDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(`DELETE FROM comments;`, [], () => {
      console.log("Ma'lumotlar bazasi tozalandi");
    });
  });
};

export default db;
