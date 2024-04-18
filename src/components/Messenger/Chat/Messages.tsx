import { doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../ChatContext";
import { db } from "../../../firebaseconfig";
import { useUserAuth } from "../../../router/UserAuthContext";

interface Message {
  id: string
  senderId: string
  text: string
  date: Timestamp
  img: string
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useContext(ChatContext);
  const { user } = useUserAuth();

  const updateLastSeen = async (timeStamp: Timestamp) => {
    if(user?.uid) {
      await updateDoc(doc(db, "userChats", user?.uid), {
        [data.chatId + ".lastMessageSeenTimestamp"]: timeStamp
      });
    }
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if(doc.exists()) {
        setMessages(doc.data().messages);
        const incomingMsg: Message[]  = doc.data().messages.filter((msg: Message) => msg.senderId !== user?.uid);

        if(incomingMsg.length) {
          updateLastSeen(incomingMsg[incomingMsg.length - 1].date);
        }
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
