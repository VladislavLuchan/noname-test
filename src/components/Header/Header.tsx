import React from 'react'
import './Header.scss'
import { useUserAuth } from '../../router/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut?.();
    window.location.replace('/login')
  }

  return (
    <header>
      <nav>
        <h1>Messenger</h1>
        { user ? <button onClick={handleLogOut}>Log out</button> : null }
      </nav>
    </header>
  )
}

export default Header