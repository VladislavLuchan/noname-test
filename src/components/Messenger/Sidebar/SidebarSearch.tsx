import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { useUserAuth } from "../../../router/UserAuthContext";
import { db } from "../../../firebaseconfig";

const SidebarSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);

  const { user: currentUser } = useUserAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if(!user) {
      return;
    }
    
    const combinedId =
    currentUser?.uid && (currentUser?.uid > user?.uid)
        ? currentUser?.uid + user.uid
        : user.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        if(currentUser?.uid) {
          await updateDoc(doc(db, "userChats", currentUser?.uid), {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarSearch;
