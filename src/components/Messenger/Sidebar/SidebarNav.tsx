import React from 'react'
import { useUserAuth } from '../../../router/UserAuthContext'

const SidebarNav = () => {
  const { user } = useUserAuth();

  return (
    <div className='navbar'>
      <div className="user">
        { user?.photoURL ? <img src={user?.photoURL} alt="user avatar" /> : <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user avatar" /> }
        <span>{user?.displayName}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default SidebarNav