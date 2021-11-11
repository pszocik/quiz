import FirebaseApp from "./config";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const db = getFirestore(FirebaseApp);

export const createDocument = (email) => {
  return setDoc(doc(db, "highscores", email), {
    scores: [],
  });
};

export const updateScores = async (email, score) => {
  const userScoresRef = doc(db, "highscores", email);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  await updateDoc(userScoresRef, {
    scores: arrayUnion(`${date} ${time} Points: ${score}`),
  });
};

export const getScores = async (email) => {
  const docRef = doc(db, "highscores", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await createDocument(email);
    await getDoc(docRef);
    return docSnap.data();
  }
};
