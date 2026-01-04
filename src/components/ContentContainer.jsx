import React, { useEffect, useRef, useState } from "react";
import SpendingChart from "./SpendingChart";
import { motion, useAnimation, useMotionValue } from "framer-motion";

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
import { storage } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// --------------- React Router DOM related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

// --------------- Components related imports / others
import SideNavbar from "./SideNavbar";
import AllTransactionView from "./AllTransactionView";
import HomeSection from "./sectionComponents/HomeSection";
import BottomNavbar from "./sectionComponents/BottomNavbar";
import {
  Add01Icon,
  Add02Icon,
  AiBrain01Icon,
  ArrowUp01Icon,
  Delete01Icon,
  ImageUploadIcon,
  InformationCircleIcon,
  MultiplicationSignIcon,
  Search01Icon,
  Tick02Icon,
  UploadCircle01Icon,
} from "@hugeicons/core-free-icons";
import { ChevronDown, Plus, X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InputFieldUI,
  InputFieldUIForImageUpload,
  TextAreaFieldUI,
} from "./InputFields";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { categories } from "../utils/categoryToIconSVGMapping";
import { returnSearchedCategory } from "../utils/functions";
import ChartSection from "./sectionComponents/ChartSection";
import SettingsSection from "./sectionComponents/SettingsSection";
import { temp } from "../utils/constants";
import NewInputFields from "./NewInputFields";
import SplitContainer from "./SplitContainer";
import AddSplitTransactionModal from "./AddSplitTransactionModal";
import { Toaster } from "react-hot-toast";
import DI from "./DI";

const getColor = (value) => {
  // if (value < 40) return "#D25340"; // red
  // if (value < 70) return "#F2C94C"; // yellow
  return "#95C765"; // green
};

export default function ContentContainer(props) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [categoryToMapping, setCategoryToMapping] = useState([]);
  const [activeSection, setActiveSection] = useState("home");

  const [tags, setTags] = useState([]);
  const [tagsName, setTagsName] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [assigneesUserID, setAssigneesUserID] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");
  const [trnName, setTrnName] = useState("");
  const [trnDate, setTrnDate] = useState(
    new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear()
  );
  const [trnId, setTrnId] = useState("");
  const [trnMode, setTrnMode] = useState("Cash");
  const [trnType, setTrnType] = useState("Single");
  const [trnCategory, setTrnCategory] = useState("");
  const [searchCat, setSearchCat] = useState("");

  const [trnIncludeInBudget, setTrnIncludeInBudget] = useState(true);
  const [trnIsInward, setTrnIsInward] = useState(false);
  const [trnAmount, setTrnAmount] = useState("");
  const [trnReciept, setTrnReciept] = useState("");
  const [trnRecieptInfo, setTrnRecieptInfo] = useState("");
  const [activeInputField, setActiveInputField] = useState("taskTitle");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [colorTheme, setColorTheme] = useState(0);
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    photoURL: "",
    theme: false,
    userID: "",
    budgte: 0,
    income: 0,
    showDateWiseGrouped: false,
  });
  const [activeSplitSpace, setActiveSplitSpace] = useState("");

  const [allSpaceArray, setAllSpaceArray] = useState([]); // for checking space name availability
  const [allSpaceInfo, setAllSpaceInfo] = useState([]); // to render spaces
  const [allSpaceInfoTemp, setAllSpaceInfoTemp] = useState([]); // to render spaces
  const [allBanksInfo, setAllBanksInfo] = useState({});

  const [fromBank, setFromBank] = useState({
    name: "",
    code: "",
  });
  const [toBank, setToBank] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    const authUserLoginState = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSpaceInfo();
      } else {
        navigateToPage(`/user/login`);
      }
    });

    return () => authUserLoginState();
  }, []);

  function fetchSpaceInfo() {
    const user = firebase.auth().currentUser;
    console.log(" ------------------", user);

    const spaceInfoRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("SplitTransactions");

    onSnapshot(spaceInfoRef, (snapshot) => {
      console.table("setAllSpaceInfo", snapshot?.data()?.splitSpaceInfo);
      console.table(snapshot?.data());
      setAllSpaceInfo(snapshot?.data()?.splitSpaceInfo);
      setAllSpaceInfoTemp(snapshot?.data()?.splitSpaceInfo);
    });

    const spaceArrayRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("AllSplitSpaceName");

    onSnapshot(spaceArrayRef, (snapshot) => {
      console.table("setAllSpaceArray", snapshot?.data()?.AllSplitSpaceName);
      console.table(snapshot?.data());
      setAllSpaceArray(snapshot?.data()?.AllSplitSpaceName);
    });

    const banksRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("Banks");

    onSnapshot(banksRef, (snapshot) => {
      console.table("setAllSpaceArray", snapshot?.data()?.AllBanks);
      console.table(snapshot?.data());

      let BankObj = {};
      snapshot?.data()?.AllBanks?.forEach((element) => {
        BankObj[element?.code] = {
          code: element?.code,
          bankName: element?.bankName,
          deleteFlag: element?.deleteFlag,
          type: element?.type,
        };
      });

      let grouped = {};
      snapshot?.data()?.AllBanks?.forEach((element) => {
        if (grouped[element?.type]) {
          grouped[element?.type] = [
            ...grouped[element?.type],
            {
              code: element?.code,
              name: element?.bankName,
              deleteFlag: element?.deleteFlag,
              type: element?.type,
            },
          ];
        } else {
          grouped[element?.type] = [
            {
              code: element?.code,
              name: element?.bankName,
              deleteFlag: element?.deleteFlag,
              type: element?.type,
            },
          ];
        }
      });

      console.log(
        "ffffff->",
        snapshot?.data()?.AllBanks?.reduce((acc, data) => {
          acc.push({
            name: data?.bankName,
            code: data?.code,
            deleteFlag: data?.deleteFlag,
            type: data?.type,
          });
          return acc;
        }, [])
      );

      setAllBanksInfo({
        bankDataArr: snapshot?.data()?.AllBanks?.reduce((acc, data) => {
          acc.push({
            name: data?.bankName,
            code: data?.code,
            deleteFlag: data?.deleteFlag,
            type: data?.type,
          });
          return acc;
        }, []),
        bankDataObj: BankObj,
        activeBankCode: snapshot?.data()?.activeBankCode,
        groupedData: grouped,
      });
    });
  }

  const navigate = useNavigate();

  // ------------ Function to navigate to desire path
  function navigateToPage(path) {
    navigate(`${path}`);
  }

  // ---- Function to fetch account details
  function fetchAccountDetails() {
    const user = firebase.auth().currentUser;

    const transactionsRef = db.collection("userSpace").doc(user?.uid);

    onSnapshot(transactionsRef, (snapshot) => {
      console.log(
        "Fetched %Account's%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      console.table(snapshot?.data()?.AllTransactions);
      setAccountInfo({
        name: snapshot?.data()?.name,
        email: snapshot?.data()?.email,
        password: snapshot?.data()?.password,
        phoneNo: snapshot?.data()?.phoneNo,
        photoURL: snapshot?.data()?.photoURL,
        theme: snapshot?.data()?.theme,
        userID: snapshot?.data()?.userID,
        budgte: snapshot?.data()?.budgte,
        income: snapshot?.data()?.income,
        showDateWiseGrouped: snapshot?.data()?.showDateWiseGrouped,
      });
    });
  }

  // --------- Checking if User is logged in and performing task based on that state
  useEffect(() => {
    const authUserLoginState = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAccountDetails();
        fetchAllTransactions();
      } else {
        navigateToPage(`/user/login`);
      }
    });

    return () => authUserLoginState();
  }, []);

  // ---------- Function to get AllTransactions from Firestore Database
  function fetchAllTransactions() {
    const user = firebase.auth().currentUser;

    const transactionsRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("AllTransactions");

    const categoryMappingRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("CategoryToIcon")
      .doc("CategoryToIcon");

    onSnapshot(transactionsRef, (snapshot) => {
      console.log(
        "Fetched %cTransactions%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      // console.table(snapshot?.data()?.AllTransactions);
      // console.log(JSON.stringify(snapshot?.data()?.AllTransactions));
      setAllTransactions(snapshot?.data()?.AllTransactions);
    });

    onSnapshot(categoryMappingRef, (snapshot) => {
      console.log(
        "Fetched %cCategory To Icon Mapping%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      console.log(snapshot?.data()?.categoryToIconMappingInfo);
      setCategoryToMapping(snapshot?.data()?.categoryToIconMappingInfo);
    });
  }

  // ---------- Function to handle Add Transaction Modal -> Motion Animation

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  const y = useMotionValue(800); // Initial off-screen position
  const controls = useAnimation();

  useEffect(() => {
    if (showAddTransactionModal) {
      controls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    } else {
      controls.start({
        y: 800,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    }
  }, [showAddTransactionModal]);

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) {
      setShowAddTransactionModal((prev) => false);
    } else {
      controls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    }
  };

  // ---------- Function to handle Show Image Modal -> Motion Animation

  const [showImage, setShowImage] = useState(false);

  const y2 = useMotionValue(800); // start off-screen
  const controls2 = useAnimation();

  useEffect(() => {
    if (showImage) {
      controls2.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    } else {
      controls2.start({
        y: 800,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    }
  }, [showImage]);

  const handleDragEnd2 = (_, info) => {
    if (info.offset.y > 100) {
      setShowImage(false);
    } else {
      controls2.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: 0.2,
        },
      });
    }
  };

  // ---------- Function to handle Image Upload

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
    if (file && file.type.startsWith("image/")) {
      const sizeInKB = file.size / 1024;
      const sizeFormatted =
        sizeInKB >= 1024
          ? `${(sizeInKB / 1024).toFixed(2)} MB`
          : `${sizeInKB.toFixed(2)} KB`;
      setTrnRecieptInfo({
        fileName: file.name,
        fileSize: sizeFormatted,
      });
      // console.log(`Selected file name: ${file.name}`);
      // console.log(`File size: ${sizeFormatted}`);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //

  const [image, setImage] = useState();
  const [imageUploadPortion, setImageUploadPortion] = useState(0);
  const color = getColor(imageUploadPortion);

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImageGetUrl = async (fileRef) => {
    var geturl = await uploadBytes(fileRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("Uploade Image URL");
        console.log(url);
        setImageUploadPortion((prev) => 100);

        setTrnReciept(url);
      });
    });
    return geturl;
  };

  const uploadImage = async () => {
    setImageUploadPortion((prev) => 25);
    const user = firebase.auth().currentUser;
    let date = new Date();
    let today =
      date.getDate() +
      (parseInt(date.getMonth()) + 1) +
      date.getFullYear() +
      date.getMinutes() +
      date.getSeconds();
    const fileRef = ref(
      storage,
      // `newSplitwiseImageBlobSpace/${today}/${image.name}`
      `testUpload`
    );
    const myPromise = uploadImageGetUrl(fileRef);
    if (myPromise) {
      console.log("Uploading");
    } else {
      console.log("Not Uploaded");
    }
  };

  // ------------ Function to add transaction to firestore database
  function addTransactionInfo() {
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("AllTransactions")
      .update({
        AllTransactions: arrayUnion({
          transactionName: trnName,
          transactionID: trnId,
          transactionDate: trnDate,
          transactionMode: trnMode,
          transactionType: trnType,
          transactionBillURL: trnReciept,
          transactionAmount: parseFloat(parseFloat(trnAmount).toFixed(2)),
          transactionCategory: trnCategory,
          includeInBudget: trnIncludeInBudget,
          isTrnInward: trnIsInward,
          // splittedMemberCount: splittedMemberCount,
          // splittedMemberIDS: splittedMemberIDS,
        }),
      })
      .then(() => {
        console.log(
          `%cSuccess : %cTransaction added successfuly%c!\n%cTransaction ID : %c${transactionID}`,
          "color: #21da0f; font-weight: bold;",
          "color: #21da0f; ",
          "color: #21da0f;",
          "color: #21da0f; font-weight: bold;",
          "color: #21da0f;"
        );
      })
      .catch((error) => {
        console.log(
          `%cError : %cTransaction has not been added%c\n%cTransaction ID : %c${transactionID}`,
          "color: red;",
          "color: red; font-weight: bold;",
          "color: red;",
          "color: red; font-weight: bold;",
          "color: red;"
        );
      });
  }

  // ---------- Function to check readiness
  function checkReadiness() {
    if (
      trnName.length > 0 &&
      trnDate.length > 0 &&
      trnAmount.length > 0 &&
      trnMode.length > 0 &&
      trnType.length > 0 &&
      trnCategory.length > 0
    ) {
      return true;
    }
  }

  return (
    <>
      <div className="w-full h-[100svh] overflow-hidden flex flex-col justify-start items-start bg-[#000000] ">
        {activeSection === "home" ? (
          <div className="w-full h-full flex flex-col justify-start items-start">
            <HomeSection
              showDateWiseGrouped={accountInfo?.showDateWiseGrouped}
              allTransactions={allTransactions}
              allBanksInfo={allBanksInfo}
            />
          </div>
        ) : activeSection === "chart" ? (
          <div className="w-full h-full flex flex-col justify-start items-start">
            <ChartSection
              allTransactions={allTransactions}
              allBanksInfo={allBanksInfo}
            />
          </div>
        ) : activeSection === "settings" ? (
          <>
            <SettingsSection accountInfo={accountInfo} />
          </>
        ) : activeSection === "split" ? (
          <>
            <SplitContainer
              accountInfo={accountInfo}
              activeSplitSpace={activeSplitSpace}
              setActiveSplitSpace={setActiveSplitSpace}
              allSpaceArray={allSpaceArray}
              setAllSpaceArray={setAllSpaceArray}
              allSpaceInfo={allSpaceInfo}
              setAllSpaceInfo={setAllSpaceInfo}
              allSpaceInfoTemp={allSpaceInfoTemp}
              setAllSpaceInfoTemp={setAllSpaceInfoTemp}
            />
          </>
        ) : (
          <></>
        )}
        <Toaster position="top-center" reverseOrder={false} />

        <div className="w-full h-[70px] fixed bottom-0 left-0 z-[60] flex justify-center items-center">
          <BottomNavbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            showAddTransactionModal={setShowAddTransactionModal}
            setShowAddTransactionModal={setShowAddTransactionModal}
            activeSplitSpace={activeSplitSpace}
            setActiveSplitSpace={setActiveSplitSpace}
            // allSpaceArray={allSpaceArray}
            // setAllSpaceArray={setAllSpaceArray}
            // allSpaceInfo={allSpaceInfo}
            // setAllSpaceInfo={setAllSpaceInfo}
            allSpaceInfoTemp={allSpaceInfoTemp}
            setAllSpaceInfoTemp={setAllSpaceInfoTemp}
          />
        </div>

        <div
          className={
            "w-full h-[100svh] fixed top-0 left-0 bg-[#00000035] backdrop-blur-[6px]" +
            (showAddTransactionModal
              ? " opacity-100 z-[10]"
              : " opacity-0 -z-[10]")
          }
          style={{ transition: ".2s" }}
        ></div>
        {showAddTransactionModal && (
          <AddSplitTransactionModal
            setShowAddTransactionModal={setShowAddTransactionModal}
            activeSplitSpace={activeSplitSpace}
            setActiveSplitSpace={setActiveSplitSpace}
            activeSection={activeSection}
            allSpaceInfoTemp={allSpaceInfoTemp}
            setAllSpaceInfoTemp={setAllSpaceInfoTemp}
            accountInfo={accountInfo}
            setFromBank={setFromBank}
            fromBank={fromBank}
            toBank={toBank}
            setToBank={setToBank}
            allBanksInfo={allBanksInfo}
          />
        )}
      </div>
    </>
  );
}
