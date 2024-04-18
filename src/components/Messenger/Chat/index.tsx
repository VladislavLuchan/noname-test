import React, { useContext } from "react";

import Messages from "./Messages";
import { ChatContext } from "../ChatContext";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user?.displayName}</span>
      </div>
      <Messages />
      { (data?.chatId && data?.chatId !== "null" ) && <ChatInput />}
      
    </div>
  );
};

export default Chat;