import FirebaseApp from "./config";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

const createDocument = (uid) => {
  const highscoresRef = doc(db, "highscores", uid);
  setDoc(highscoresRef, {
    scores: [],
  })
    .then(() => console.log("Document created successfully."))
    .catch((err) => console.log(err));
};

const updateScores = (uid, score) => {
  const userScoresRef = doc(db, "highscores", uid);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  updateDoc(userScoresRef, {
    scores: arrayUnion(`${date} ${time} Points: ${score}`),
  })
    .then(() => console.log("Highscores updated successfully!"))
    .catch((err) => console.log(err));
};

const getScores = async (uid) => {
  const docRef = doc(db, "highscores", uid);
  let docSnap = await getDoc(docRef);
  if (docSnap.exists() !== true) {
    await createDocument(uid);
    docSnap = await getDoc(docRef);
  }
  return docSnap.data();
};

export { getScores, createDocument, updateScores, db };
