"use client";

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.MESS_ID,
};

function FirebaseInit() {
  useEffect(() => {
    const app = initializeApp(config);

    getAnalytics(app);
  }, []);

  return null;
}

export default FirebaseInit;
