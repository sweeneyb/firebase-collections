import firebase from "firebase/app";
import "firebase/auth";
import React, {useEffect, useState} from "react";
const auth = firebase.auth();
export function useUser() {
  const [user, setUser] = useState();
  useEffect(() => auth.onAuthStateChanged(setUser), []);
  return user;
}
export function AuthButton() {
  const user = useUser();
  if (!user) {
    const provider = new firebase.auth.GoogleAuthProvider();
    return <button onClick={() => auth.signInWithPopup(provider)}>
      Login
    </button>
  } else {
    return <button onClick={() => auth.signOut()}>
      Logout {user.displayName}
    </button>
  }
}