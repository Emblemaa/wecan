import "dotenv/config";

import admin, { ServiceAccount } from "firebase-admin";

var serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: "firebase-adminsdk-fbsvc@wecan-64f2d.iam.gserviceaccount.com",
};

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

export default firebase;
