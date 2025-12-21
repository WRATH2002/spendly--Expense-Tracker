import React, { useEffect } from "react";

// --------------- Firebase related imports
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "../firebase";

// --------------- React Router DOM related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

// --------------- Components related imports

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const channelRef = db.collection("user").doc(user?.uid);

        const taskRef = db
          .collection("taskSpace")
          .doc(user?.uid)
          ?.collection("taskInfo")
          .doc("taskInfo");

        onSnapshot(channelRef, (snapshot) => {
          setTheme(snapshot?.data()?.Theme);
        });
        onSnapshot(taskRef, (snapshot) => {
          setTaskInfoArr([
            snapshot?.data()?.Todo,
            snapshot?.data()?.InProgress,
            snapshot?.data()?.Pause,
            snapshot?.data()?.Done,
          ]);
        });
      } else {
        // console.info("Not Logged in");
        console.log(
          "%cYou are not %cLogged In%c !",
          "color: orange;",
          "color: orange; font-weight: bold;",
          "color: orange;"
        );

        navigateToPage("/");
      }
    });
  }, []);

  // ------------ Function to navigate to desire path
  function navigateToPage(path) {
    navigate(`${path}`);
  }

  return (
    <div>
      <button
        onClick={() => {
          navigateToPage(`/user/login`);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigateToPage(`/user/signup`);
        }}
      >
        Signup
      </button>
    </div>
  );
}
