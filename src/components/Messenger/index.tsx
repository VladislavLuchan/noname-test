import React from 'react'
import { useUserAuth } from '../../router/UserAuthContext';
import Sidebar from './Sidebar';
import './Messenger.scss'
import Chat from './Chat';
import { ChatContextProvider } from './ChatContext';

const Messenger = () => {
  const { user } = useUserAuth();

  return (
    <ChatContextProvider>
      <div className='home'>
        <div className="container">
          <Sidebar/>
          <Chat />
        </div>
      </div>
    </ChatContextProvider>
  )
}

export default Messenger
