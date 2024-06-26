import * as SQLite from "expo-sqlite/next";

async function InitializeDB() {
  try {
    console.log("MEOW");
    const db = await SQLite.openDatabaseAsync("chatapp.db");
    await db.execAsync(`CREATE TABLE IF NOT EXISTS messages(
      message_id TEXT PRIMARY KEY NOT NULL,
      sent_by TEXT NOT NULL,
      message_content TEXT NOT NULL,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      received_by TEXT NOT NULL,
      message_status INTEGER CHECK(message_status IN (0, 1, 2)) NOT NULL

      )`);

    console.log("CREATED THE DB");
  } catch (error) {
    console.log(error);
  }
}

export default InitializeDB;
