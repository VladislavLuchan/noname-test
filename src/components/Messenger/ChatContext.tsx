import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { useUserAuth } from "../../router/UserAuthContext";

interface ChatContextProviderProps {
  children: ReactNode
}

interface Chat {
  chatId: string
  user: {
    displayName: string
    photoURL: string
    uid: string
  }
}

interface ChatContext {
  data: Chat
  dispatch: Function
}

export const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { user } = useUserAuth();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: Chat, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user?.uid && (user.uid > action.payload.uid)
              ? user.uid + action.payload.uid
              : action.payload.uid + user?.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContex = () => {
  return useContext(ChatContext);
}
