import { auth, googleProvider, setPersistence } from "./firebase.setup.js";

export const authenticateUser = (stayLoggedIn, callback) => {
  const doLogin = () => {
    auth.signInWithPopup(googleProvider).then(result => {
      const user = result.user;
      if (stayLoggedIn) {
        window.localStorage.setItem("user", JSON.stringify(user));
        callback(user);
      }
    });
  };

  if (stayLoggedIn) {
    setPersistence().then(() => {
      doLogin();
    });
  } else {
    doLogin();
  }
};
