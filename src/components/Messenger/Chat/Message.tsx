import React, { FC, useContext, useEffect, useRef } from "react";
import { ChatContext } from "../ChatContext";
import { useUserAuth } from "../../../router/UserAuthContext";

interface MessageProps {
  message: {
    id: string
    senderId: string
    text: string
  }
}

const Message: FC<MessageProps> = ({ message }) => {
  const { user } = useUserAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user?.uid && "owner"}`}
    >
      <div className="messageInfo">
        {user?.photoURL && <img
          src={
            message.senderId === user?.uid
              ? user?.photoURL
              : data.user.photoURL
          }
          alt="User avatar"
        /> }
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
