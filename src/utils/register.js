import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

createUserWithEmailAndPassword(auth, id, name, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
