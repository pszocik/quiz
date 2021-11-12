import FirebaseApp from "./config";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

const createDocument = (email) => {
  const highscoresRef = doc(db, "highscores", email);
  setDoc(highscoresRef, {
    scores: [],
  })
    .then((data) => console.log("Document created successfully."))
    .catch((err) => console.log(err));
};

const updateScores = (email, score) => {
  const userScoresRef = doc(db, "highscores", email);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  updateDoc(userScoresRef, {
    scores: arrayUnion(`${date} ${time} Points: ${score}`),
  })
    .then((data) => console.log("Highscores updated successfully!"))
    .catch((err) => console.log(err));
};

const getScores = async (email) => {
  const docRef = doc(db, "highscores", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() === false) {
    await createDocument(email);
    await getDoc(docRef);
  }
  return docSnap.data();
};

export { getScores, createDocument, updateScores, db };
