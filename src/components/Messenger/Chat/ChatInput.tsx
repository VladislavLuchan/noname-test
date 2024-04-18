import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { ChatContext } from "../ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useUserAuth } from "../../../router/UserAuthContext";
import { db } from "../../../firebaseconfig";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { user } = useUserAuth();
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user?.uid,
        date: Timestamp.now(),
      }),
    });

    if(user?.uid) {
      await updateDoc(doc(db, "userChats", user?.uid), {
        [data.chatId + ".lastMessage"]: {text},
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
