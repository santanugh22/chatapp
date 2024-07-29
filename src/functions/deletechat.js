async function deleteChat(db, chat_id) {
  try {
    await db.execAsync("DELETE FROM chats WHERE chat_id=?", [chat_id]);
    console.log("DELETED CHATS");
  } catch (error) {
    console.log(error);
  }
}

export default deleteChat
