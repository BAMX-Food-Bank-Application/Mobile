import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/FirebaseConnection';

export default function userAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log('User logged: ', user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return { user };
}

