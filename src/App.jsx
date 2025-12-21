import "./App.css";
import { useEffect, useRef, useState } from "react";

// --------------- Firebase related imports
import { db } from "./firebase";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "./firebase";

// --------------- React Router DOM related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

// --------------- Components related imports
import LandingPage from "./components/LandingPage";
import LinkError from "./components/LinkError";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { themeColor } from "./utils/constants";
import SpendingChart from "./components/SpendingChart";
import FinancialChart from "./components/FinancialChart";
import ContentContainer from "./components/ContentContainer";

function App() {
  const [theme, setTheme] = useState(false); // ----> true => dark ; false => light

  return (
    <div
      className="w-full h-[100svh] flex justify-start items-start"
      style={{
        backgroundColor: theme
          ? themeColor?.darkSecondary
          : themeColor?.lightPrimary,
      }}
    >
      {/* <div
        className={` w-full h-[100svh] flex p-[20px] `}
        style={{
          backgroundColor: theme
            ? themeColor?.darkSecondary
            : themeColor?.lightPrimary,
        }}
      >
        <SpendingChart theme={theme} />
      </div> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route
            path="/user/welcomeUser/user"
            element={<ContentContainer theme={theme} />}
          />
          {/* <Route path="/admin" element={<AdminPage />} />
          <Route path="/shared" element={<SharedChat />} />
          <Route path="/shared/login" element={<SharedLogin />} /> */}

          <Route path="*" element={<LinkError />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
