async function createNewChat(db, details) {
  try {
    await db.execAsync(
      `INSERT INTO chats(chat_id,chat_user_id,chat_receiver_id,chat_receiver_username)`,
      [
        details.chat_id,

        details.chat_user_id,
        details.chat_receiver_id,
        details.chat_receiver_username,
      ]
    );
    console.log("CHAT CREATED");
  } catch (error) {
    console.log(error);
  }
}

export default createNewChat
