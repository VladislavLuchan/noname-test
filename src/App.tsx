import React from 'react';
import Router from './router'
import { UserAuthContextProvider } from './router/UserAuthContext';

function App() {
  return (
    <UserAuthContextProvider>
      <Router />
    </UserAuthContextProvider>

  );
}

export default App;
