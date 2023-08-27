import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/FirebaseConnection';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unSub;
  }, []);
  return {user};
}
