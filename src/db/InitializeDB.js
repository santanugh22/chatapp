import * as SQLite from "expo-sqlite/next";

async function InitializeDB() {
  try {
    const db = await SQLite.openDatabaseAsync("chatapp.db");
  } catch (error) {
    console.log(error);
  }
}

export default InitializeDB;
