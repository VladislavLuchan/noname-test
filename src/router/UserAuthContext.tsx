import React, { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { doc, setDoc } from 'firebase/firestore';

type userAuthContextType = {
  user?: User
  logIn?(email: string, password: string): Promise<UserCredential>
  signUp?(name: string, email: string, password: string): Promise<UserCredential>
  logOut?(): Promise<void>
}

interface UserAuthContextProviderProps {
  children: ReactNode
}
 
const userAuthContext = createContext<userAuthContextType>({ });

export const UserAuthContextProvider = ({ children }: UserAuthContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  const logIn = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = async (name: string, email: string, password: string): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: `https://ui-avatars.com/api/?name=${name}`
    });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      displayName: name,
      email: userCredential.user?.email,
      photoURL: `https://ui-avatars.com/api/?name=${name}`
    });


    await setDoc(doc(db, "userChats", userCredential.user.uid), {});

    return userCredential;
  }

  const logOut = (): Promise<void> => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser: User | null) => {
      if(currentuser) {
        setUser(currentuser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
}
