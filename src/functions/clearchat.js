async function clearChat(db, chat_id) {
  try {
    await db.execAsync("DELETE FROM messages WHERE chat_id=?", [chat_id]);
    console.log("DELETED");
  } catch (error) {
    console.log(error);
  }
}

export default clearChat;
