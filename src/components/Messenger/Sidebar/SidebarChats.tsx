import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { useUserAuth } from "../../../router/UserAuthContext";
import { db } from "../../../firebaseconfig";

const SidebarChats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const { user } = useUserAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if(user?.uid) {
        const unsub = onSnapshot(doc(db, "userChats", user?.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    user?.uid && getChats();
  }, [user?.uid]);
  

  const handleSelect = (u: React.SyntheticEvent) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarChats;
