import { select } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";
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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Analytics02Icon,
  ArrowDown02Icon,
  ArrowMoveDownRightIcon,
  Cancel01Icon,
  Cancel02Icon,
  CancelCircleIcon,
  CheckmarkSquare02Icon,
  Invoice03Icon,
  MoveLeftIcon,
  PlusSignCircleIcon,
  PlusSignIcon,
  RemoveSquareIcon,
  Tick02Icon,
  UserMultiple02Icon,
  UserMultiple03Icon,
  WasteIcon,
} from "@hugeicons/core-free-icons";
import { MoveRightIcon } from "lucide-react";
import ShowTransactionDetailModal from "./ShowTransactionDetailModal";
import toast, { Toaster } from "react-hot-toast";
import { useLongPress } from "react-use";
import AddSplitTransactionModal from "./AddSplitTransactionModal";
import SplitSpacesList from "./SplitSpacesList";
import NormalInput from "./NormalInput";

const colorScheme = [
  { background: "#F8E7D0", text: "#8B5E3C", border: "#E6C9A8" }, // Soft Cream Beige
  { background: "#D9F6E4", text: "#2C6E49", border: "#B7E5C6" }, // Pastel Mint Green
  { background: "#DDEAFF", text: "#2F3D73", border: "#B9D2FF" }, // Calm Sky Blue
  { background: "#F7D8F9", text: "#7A3A7A", border: "#E9B7EB" }, // Light Orchid Pink
  { background: "#D8F8F6", text: "#2C5F63", border: "#B5E8E5" }, // Soft Aqua Cyan
];

export default function SplitContainer({
  activeSplitSpace,
  setActiveSplitSpace,
  accountInfo,
  allSpaceArray,
  setAllSpaceArray,
  allSpaceInfo,
  setAllSpaceInfo,
  allSpaceInfoTemp,
  setAllSpaceInfoTemp,
}) {
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [personWiseTotal, setPersonWiseTotal] = useState({});
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showMoreAnimation, setShowMoreAnimation] = useState(false);
  const [selectedDataForBulk, setSelectedDataForBulk] = useState([]);
  const [isActiveSelectMode, setIsActiveSelectMode] = useState(false);
  const [isTransactionDeleted, setIsTransactionDeleted] = useState(false);
  const divRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false); // tracks current state
  const [lockedToNo, setLockedToNo] = useState(false); // once scrolled, lock
  const [showContent, setShowContent] = useState(false);
  const [newSpaceModal, setNewSpaceModal] = useState(false);

  // const [allSpaceArray, setAllSpaceArray] = useState([]); // for checking space name availability
  // const [allSpaceInfo, setAllSpaceInfo] = useState([]); // to render spaces
  // const [allSpaceInfoTemp, setAllSpaceInfoTemp] = useState([]); // to render spaces

  // const [activeSplitSpace, setActiveSplitSpace] = useState("");

  // useEffect(() => {
  //   fetchSpaceInfo();
  // }, []);

  // function fetchSpaceInfo() {
  //   const user = firebase.auth().currentUser;
  //   console.log(" ------------------", user);

  //   const spaceInfoRef = db
  //     .collection("userSpace")
  //     .doc(user?.uid)
  //     ?.collection("AllTransactionsSpace")
  //     .doc("SplitTransactions");

  //   onSnapshot(spaceInfoRef, (snapshot) => {
  //     console.table("setAllSpaceInfo", snapshot?.data()?.splitSpaceInfo);
  //     console.table(snapshot?.data());
  //     setAllSpaceInfo(snapshot?.data()?.splitSpaceInfo);
  //     setAllSpaceInfoTemp(snapshot?.data()?.splitSpaceInfo);
  //   });

  //   const spaceArrayRef = db
  //     .collection("userSpace")
  //     .doc(user?.uid)
  //     ?.collection("AllTransactionsSpace")
  //     .doc("AllSplitSpaceName");

  //   onSnapshot(spaceArrayRef, (snapshot) => {
  //     console.table("setAllSpaceArray", snapshot?.data()?.AllSplitSpaceName);
  //     console.table(snapshot?.data());
  //     setAllSpaceArray(snapshot?.data()?.AllSplitSpaceName);
  //   });

  //   // onSnapshot(categoryMappingRef, (snapshot) => {
  //   //   console.log(
  //   //     "Fetched %cCategory To Icon Mapping%c Info =>",
  //   //     "color: #1caee8; font-weight: bold;",
  //   //     "color: #ffffff;"
  //   //   );
  //   //   console.log(snapshot?.data()?.categoryToIconMappingInfo);
  //   //   setCategoryToMapping(snapshot?.data()?.categoryToIconMappingInfo);
  //   // });
  // }

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  const onLongPress = (index) => {
    console.log(index);
    setSelectedDataForBulk((prev) => [...prev, index]);
    console.log("calls callback after long pressing 300ms");
    setIsActiveSelectMode(true);
  };

  const defaultOptions = {
    isPreventDefault: false,
    delay: 300,
  };
  // const longPressEvent = useLongPress((e) => onLongPress(e), defaultOptions);

  useEffect(() => {
    console.log("Selected Data for Bulk:", selectedDataForBulk);
  }, [selectedDataForBulk]);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const scrollable = el.scrollHeight > el.clientHeight;

    if (scrollable && !lockedToNo) {
      console.log("yes");
      setShowMoreAnimation(true);
      setIsScrollable(true);
    } else {
      console.log("no");
      setShowMoreAnimation(false);
      setIsScrollable(false);
    }
  }, [allTransactions, lockedToNo]);

  // When user scrolls even a little → print "no" and lock
  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isScrollable && !lockedToNo && el.scrollTop > 0) {
        console.log("no");
        setLockedToNo(true); // lock future responses to "no"
        setIsScrollable(false);
      }
    };

    el.addEventListener("scroll", onScroll);

    return () => el.removeEventListener("scroll", onScroll);
  }, [isScrollable, lockedToNo]);

  const [showTransactionDetails, setShowTransactionDetails] = useState({
    show: false,
    data: {},
    index: null,
  });

  function generateCurrentDateTime() {
    const current = new Date();
    const date = `${current.getDate()}-${
      current.getMonth() + 1
    }-${current.getFullYear()}`;
    const time = `${current.getHours()}:${current.getMinutes()}`;
    return date + " " + time;
  }

  function personWiseTotalCalculator() {
    let totals = {};

    // Step 1: Calculate total spent by each person
    allTransactions?.forEach((transaction) => {
      const payee = transaction.payeeName;
      const amount = parseFloat(transaction.transactionAmount);
      totals[payee] = (totals[payee] || 0) + amount;
    });

    // Step 2: Calculate overall total and per person share
    const people = Object.keys(totals);
    const overallTotal = Object.values(totals).reduce(
      (sum, val) => sum + val,
      0
    );
    const perPersonShare = overallTotal / people.length;

    // Step 3: Create detailed result for each person
    let result = {};

    people?.forEach((person) => {
      const spent = totals[person];
      const alterAmount = parseFloat((spent - perPersonShare).toFixed(2)); // + means get, - means pay
      const toPay = alterAmount < 0;

      result[person] = {
        totalSpent: spent,
        total: overallTotal,
        alterAmount,
        toPay,
        balances: [], // will fill next
      };
    });

    // Step 4: Properly balance payments from both perspectives (only debtors’ side)
    const debtors = people
      .filter((p) => result[p].alterAmount < 0)
      .map((p) => ({ name: p, amount: Math.abs(result[p].alterAmount) }));

    const creditors = people
      .filter((p) => result[p].alterAmount > 0)
      .map((p) => ({ name: p, amount: result[p].alterAmount }));

    for (let d of debtors) {
      for (let c of creditors) {
        if (d.amount <= 0) break;
        if (c.amount <= 0) continue;

        const payment = Math.min(d.amount, c.amount);

        // ✅ Record only in debtor’s balances (who they need to pay)
        result[d.name].balances.push({
          person: c.name,
          amount: parseFloat(payment.toFixed(2)),
        });

        // Adjust remaining balances
        d.amount -= payment;
        c.amount -= payment;
      }
    }

    // Step 5: Finalize
    setPersonWiseTotal(result);
    console.log("Detailed Person Wise Total:", result);
  }

  // ------------ Function to add transaction to firestore database
  function addTransactionInfo() {
    console.log("adding split transaction", generateCurrentDateTime());
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .update({
        SplitTransactions: arrayUnion({
          transactionName: transactionName,
          // transactionID: transactionID,
          transactionDate: generateCurrentDateTime(),
          // transactionMode: transactionMode,
          transactionType: "split",
          payeeName: selectedMember,
          // transactionBillURL: transactionBillURL,
          transactionAmount: transactionAmount,
          // transactionCategory: transactionCategory,
          // splittedMemberCount: splittedMemberCount,
          // splittedMemberIDS: splittedMemberIDS,
        }),
      });
    // .then(() => {
    //   console.log(
    //     `%cSuccess : %cTransaction added successfuly%c!\n%cTransaction ID : %c${transactionID}`,
    //     "color: #21da0f; font-weight: bold;",
    //     "color: #21da0f; ",
    //     "color: #21da0f;",
    //     "color: #21da0f; font-weight: bold;",
    //     "color: #21da0f;"
    //   );
    // })
    // .catch((error) => {
    //   console.log(
    //     `%cError : %cTransaction has not been added%c\n%cTransaction ID : %c${transactionID}`,
    //     "color: red;",
    //     "color: red; font-weight: bold;",
    //     "color: red;",
    //     "color: red; font-weight: bold;",
    //     "color: red;"
    //   );
    // });
  }

  // ---------- Function to get AllTransactions from Firestore Database
  function fetchAllTransactions(splitSpacePath) {
    const user = firebase.auth().currentUser;
    console.log("fetching");
    const transactionsRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .collection(splitSpacePath)
      .doc(splitSpacePath);

    // const categoryMappingRef = db
    //   .collection("userSpace")
    //   .doc(user?.uid)
    //   ?.collection("CategoryToIcon")
    //   .doc("CategoryToIcon");

    onSnapshot(transactionsRef, (snapshot) => {
      console.log(
        "Fetched %cTransactions%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      console.table(snapshot?.data()?.SplitTransactions);
      console.table(snapshot?.data());

      setAllTransactions(snapshot?.data()?.SplitTransactions);
    });

    // onSnapshot(categoryMappingRef, (snapshot) => {
    //   console.log(
    //     "Fetched %cCategory To Icon Mapping%c Info =>",
    //     "color: #1caee8; font-weight: bold;",
    //     "color: #ffffff;"
    //   );
    //   console.log(snapshot?.data()?.categoryToIconMappingInfo);
    //   setCategoryToMapping(snapshot?.data()?.categoryToIconMappingInfo);
    // });
  }

  useEffect(() => {
    if (activeSplitSpace?.length > 0) {
      fetchAllTransactions(activeSplitSpace);
    }
  }, [activeSplitSpace]);

  useEffect(() => {
    personWiseTotalCalculator();
  }, [allTransactions]);

  function priceCommaFormatter(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function deleteTransactionInfo(itemIndexArr) {
    // console.log("adding split transaction", generateCurrentDateTime());
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .update({
        SplitTransactions: allTransactions?.filter((data, idx) => {
          if (!itemIndexArr.includes(idx)) {
            return data;
          }
        }),
      });

    setIsTransactionDeleted(true);
    setSelectedDataForBulk([]);
    setIsActiveSelectMode(false);
  }

  useEffect(() => {
    if (isTransactionDeleted) {
      toast.success("Transaction deleted!", {
        style: {
          borderRadius: "40px",
          fontWeight: "500",
          fontSize: "14px",
          backgroundColor: "#ffffffd0",
          backdropFilter: "blur(4px)",
        },
      });
      setIsTransactionDeleted(false);
    }
  }, [isTransactionDeleted]);

  useEffect(() => {
    if (!showContent) {
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, [showContent]);

  const [animate, setAnimate] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberNameArr, setMemberNameArr] = useState([]);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  }, [newSpaceModal]);

  function formatName(memName) {
    let formattedName = [];
    let memNameSplitArr = memName?.split(" ");

    memNameSplitArr?.forEach((data) => {
      formattedName.push(data?.charAt(0).toUpperCase() + data?.slice(1));
    });

    return formattedName?.join(" ");
  }

  function createSpace(spaceName, memberNameArr) {
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("AllSplitSpaceName")
      .update({
        AllSplitSpaceName: arrayUnion(spaceName?.toLowerCase()),
      });

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .collection(spaceName?.toLowerCase())
      .doc(spaceName?.toLowerCase())
      .set({
        splitSpaceInfo: {
          spaceName: spaceName,
          members: memberNameArr,
          createdBy: user?.uid,
          createdAt: new Date().toISOString(),
        },
        SplitTransactions: [],
      });

    db.collection("userSpace")
      .doc(user.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .update({
        splitSpaceInfo: arrayUnion({
          spaceName: spaceName,
          members: memberNameArr,
          createdBy: user?.uid,
          createdAt: new Date().toISOString(),
        }),
      });

    setMemberNameArr([]);
    setSpaceName("");
    setNewSpaceModal(false);
  }

  return (
    <>
      <div class="absolute inset-0 noise pointer-events-none"></div>
      <div className="grad rounded-t-full blur-[200px] w-full h-[200px] fixed left-0 bottom-[0px] -z-[0]"></div>
      {/* <AddSplitTransactionModal /> */}
      {activeSplitSpace?.length > 0 ? (
        showContent ? (
          <>
            <div
              className={
                "w-full flex justify-center items-center left-0  fixed z-50" +
                (isActiveSelectMode ? " top-[20px]" : " top-[-50px]")
              }
              style={{
                transition: ".3s",
              }}
            >
              <div
                className={
                  "bg-[#ffffffd0] h-[45px] flex justify-evenly items-center rounded-3xl  backdrop-blur-sm" +
                  (isActiveSelectMode ? " w-[130px]" : " w-[30px]")
                }
                style={{
                  transition: ".3s",
                }}
              >
                <div
                  className=" rounded-full flex justify-center
         items-center cursor-pointer"
                  onClick={() => {
                    setIsActiveSelectMode(false);
                    setSelectedDataForBulk([]);
                  }}
                  style={{
                    opacity: isActiveSelectMode ? 1 : 0,
                    transition: isActiveSelectMode ? ".3s" : "0s",
                    transitionDelay: isActiveSelectMode ? ".2s" : "0s",
                  }}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    // fill="currentColor"
                    strokeWidth={2.2}
                    className=""
                  />
                </div>
                <div
                  className=" rounded-full flex justify-center
         items-center cursor-pointer"
                  style={{
                    opacity: isActiveSelectMode ? 1 : 0,
                    transition: isActiveSelectMode ? ".3s" : "0s",
                    transitionDelay: isActiveSelectMode ? ".25s" : "0s",
                  }}
                  onClick={() => {
                    if (
                      allTransactions?.length == selectedDataForBulk?.length
                    ) {
                      setSelectedDataForBulk([]);
                    } else {
                      let tempArr = allTransactions?.reduce(
                        (acc, curr, index) => {
                          acc.push(index);
                          return acc;
                        },
                        []
                      );
                      setSelectedDataForBulk(tempArr);
                    }
                  }}
                >
                  {allTransactions?.length == selectedDataForBulk?.length ? (
                    <HugeiconsIcon
                      icon={RemoveSquareIcon}
                      size={20}
                      // fill="currentColor"
                      strokeWidth={2.2}
                      className=""
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={CheckmarkSquare02Icon}
                      size={20}
                      // fill="currentColor"
                      strokeWidth={2.2}
                      className=""
                    />
                  )}
                </div>
                <div
                  className=" rounded-full flex justify-center
         items-center cursor-pointer"
                  style={{
                    opacity: isActiveSelectMode ? 1 : 0,
                    transition: isActiveSelectMode ? ".3s" : "0s",
                    transitionDelay: isActiveSelectMode ? ".3s" : "0s",
                  }}
                  onClick={() => {
                    deleteTransactionInfo(selectedDataForBulk);
                  }}
                >
                  <HugeiconsIcon
                    icon={WasteIcon}
                    size={20}
                    // fill="currentColor"
                    strokeWidth={2.2}
                    className=""
                  />
                </div>
              </div>
            </div>

            <div className="text-[white] w-full h-[100svh] flex flex-col justify-start items-start overflow-y-hidden ">
              <div
                ref={divRef}
                className=" w-full h-[100svh] p-[20px] pt-[20px] flex flex-col justify-start items-start overflow-y-scroll"
              >
                <div className="w-full flex flex-col justify-start items-start pb-[200px] ">
                  <div className="w-full flex justify-center items-center font-[600] text-[25px] h-[90px] sticky">
                    ₹{" "}
                    {formatAmount(
                      allTransactions?.reduce((acc, curr) => {
                        return acc + parseFloat(curr.transactionAmount);
                      }, 0)
                    )}
                  </div>
                  {allTransactions?.map((data, index) => {
                    return (
                      <>
                        <TransactionCard
                          data={data}
                          index={index}
                          onLongPress={onLongPress}
                          defaultOptions={defaultOptions}
                          setShowTransactionDetails={setShowTransactionDetails}
                          showTransactionDetails={showTransactionDetails}
                          allTransactions={allTransactions}
                          setIsTransactionDeleted={setIsTransactionDeleted}
                          isActiveSelectMode={isActiveSelectMode}
                          selectedDataForBulk={selectedDataForBulk}
                          setSelectedDataForBulk={setSelectedDataForBulk}
                          setIsActiveSelectMode={setIsActiveSelectMode}
                        />
                      </>
                    );
                  })}
                  <div
                    className={
                      "w-full h-[100svh] bg-[#63636313] backdrop-blur-md left-0 top-0 fixed" +
                      (showMoreDetails ? " flex" : " hidden")
                    }
                    onClick={() => {
                      setShowMoreDetails(false);
                    }}
                  ></div>
                  <div
                    className={
                      "w-full h-[600px] overflow-y-scroll  fixed left-0 bottom-0 rounded-t-3xl bg-[black] flex-col justify-start items-start pt-[20px]" +
                      (showMoreDetails ? " flex" : " hidden")
                    }
                  >
                    <div className="w-full flex flex-col justify-center items-center mt-[20px]">
                      <span className="text-[14px] text-[#7e7e7e]">
                        Total Trip Spent
                      </span>
                      <span className="text-[#d5d5d5] font-bold text-[26px]">
                        ₹{" "}
                        {formatAmount(personWiseTotal["Anita Mukhejee"]?.total)}
                      </span>
                      <span className="text-[#6e6e6e] text-[12px]">
                        per head : ₹{" "}
                        {formatAmount(
                          Math.round(
                            personWiseTotal["Anita Mukhejee"]?.total / 5
                          )
                        )}
                      </span>
                    </div>
                    <div className="w-full min-h-[60px] bg-gradient-to-b from-black to-transparent z-30 mt-[10px]"></div>
                    <div className="flex flex-col justify-start items-start w-full mt-[-60px] overflow-y-scroll pb-[200px] pt-[60px]">
                      {Object.entries(personWiseTotal).map(
                        ([person, details], index) => (
                          <>
                            <div
                              key={index}
                              className="w-full flex justify-between items-center min-h-[60px] mb-[20px] p-[20px]"
                            >
                              <div className="flex justify-start items-center w-[calc(100%-100px)]">
                                <div
                                  className={`w-[40px] aspect-square rounded-full  flex justify-center items-center font-extrabold uppercase text-[14px] bg-[#212121] text-[#d5d5d5]`}
                                >
                                  {person?.split(" ")[0].charAt(0)}
                                  {person?.split(" ").pop().charAt(0)}
                                </div>
                                <div className="w-[calc(100%-40px)] flex flex-col justify-center items-start px-[15px]">
                                  <div className="text-[#d5d5d5] font-bold text-[14px] ">
                                    {person}'s
                                  </div>
                                  <div className="w-full text-[#6e6e6e] text-[12px] overflow-hidden text-ellipsis whitespace-nowrap flex justify-start items-center">
                                    <HugeiconsIcon
                                      icon={ArrowMoveDownRightIcon}
                                      size={12}
                                      strokeWidth={2}
                                      className="mt-[-5px] mr-[5px]"
                                    />{" "}
                                    ₹{" "}
                                    {formatAmount(
                                      details?.totalSpent?.toFixed(2)
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="w-[100px] flex flex-col justify-center items-end">
                                <div
                                  className={` flex justify-center items-center px-[5px] rounded-md text-[10px] py-[2px] text-[#6e6e6e] ${
                                    details?.toPay
                                      ? " bg-[#ff6a0028] text-[#ff6a00]"
                                      : " bg-[#00ff0d28] text-[#00ff0d]"
                                  }`}
                                >
                                  {details?.toPay ? "will pay" : "will get"}
                                </div>
                                <div
                                  className={`font-bold text-[14px] text-[#d5d5d5]
                       
                        `}
                                >
                                  ₹{" "}
                                  {formatAmount(
                                    Math.abs(details?.alterAmount).toFixed(2)
                                  )}
                                </div>
                              </div>
                            </div>
                            {details?.balances?.length > 0 && (
                              <div className="w-full mt-[-40px] mb-[10px] flex flex-col justify-center items-end text-[#6e6e6e] p-[20px]">
                                {details?.balances?.map((balance, bIndex) => {
                                  return (
                                    <div
                                      key={bIndex}
                                      className="flex justify-end items-center"
                                    >
                                      <span className="text-[12px]">
                                        ₹ {formatAmount(balance?.amount)}
                                      </span>{" "}
                                      <span className="text-[#454545]">•</span>
                                      <span className="text-[12px]">
                                        {balance?.person}
                                      </span>
                                      <HugeiconsIcon
                                        icon={MoveLeftIcon}
                                        size={16}
                                        strokeWidth={2}
                                        className="ml-[5px]"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showMoreAnimation && (
                <div className="fixed left-[0px] bottom-[70px] flex justify-center items-center  w-full">
                  <div className="w-[40px] h-[40px] bg-[#fff] text-[#000000] rounded-full animate-bounce flex justify-center items-center ">
                    <HugeiconsIcon
                      icon={ArrowDown02Icon}
                      size={24}
                      // fill="currentColor"
                      strokeWidth={4}
                      className="drop-shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col justify-start items-start h-full p-[20px] ">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <TransactionSkeleton key={index} />
                ))}
            </div>
          </>
        )
      ) : (
        <>
          <div
            className={
              "fixed w-full h-[100svh] flex justify-center items-center left-0 top-0 z-[70] text-[#fff] backdrop-blur-sm px-[20px] bg-[#00000000]" +
              (newSpaceModal ? " visible" : " hidden")
            }
            onClick={(e) => {
              setNewSpaceModal(false);
            }}
          >
            <div
              className="w-full max-h-[80%] bg-[#1b1b1b] py-[20px] rounded-3xl flex flex-col justify-end items-start px-[20px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="font-[600] text-[20px] mb-[20px]">
                Create New Split Space
              </div>
              <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full">
                  <NormalInput
                    isEditable={true}
                    label={"Space Name"}
                    isRequired={true}
                    placeholder={"eg: Kashmir Trip_2025"}
                    value={spaceName}
                    setValue={setSpaceName}
                    hasRequirements={false}
                    inputType={"text"}
                    // requirementFunction={field?.requirementFunction}
                    // doValidationCheck={field?.doValidationCheck}
                    // validationCheckWith={field?.validationCheckWith}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start text-[white] text-[14px] mt-[15px]">
                  <label className="mb-[5px] text-[12px] text-[#ababab] font-[500]">
                    Add Members *
                  </label>
                  <div className="w-full flex justify-start items-center">
                    <input
                      className={`w-full h-[42px] bg-[#000] rounded-lg px-[12px] focus:outline-[2.5px] placeholder:text-[#777777] outline-none text-[#ffffff] `}
                      type={"text"}
                      // disabled={!isEditable}
                      placeholder={"Enter member name"}
                      value={memberName}
                      onChange={(e) => {
                        setMemberName(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        console.log(e);
                        if (e.key == "Enter") {
                          if (
                            !memberNameArr?.includes(
                              formatName(memberName?.trim())
                            ) &&
                            memberName?.trim()?.length > 0
                          ) {
                            setMemberNameArr((prev) => [
                              ...prev,
                              formatName(memberName?.trim()),
                            ]);
                            setMemberName("");
                          }
                        }
                      }}
                    ></input>
                    <div
                      className={
                        "h-[30px] w-[50px] ml-[-56px] mr-[6px] rounded-[4px] flex justify-center items-center bg-[#1b1b1b] text-[#d0d0d0]" +
                        (memberName?.trim()?.length > 0
                          ? " visible"
                          : " hidden")
                      }
                      onClick={(e) => {
                        if (
                          !memberNameArr?.includes(
                            formatName(memberName?.trim())
                          ) &&
                          memberName?.trim()?.length > 0
                        ) {
                          setMemberNameArr((prev) => [
                            ...prev,
                            formatName(memberName?.trim()),
                          ]);
                          setMemberName("");
                        }
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start items-start flex-wrap mt-[10px]">
                  {memberNameArr?.map((data, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="px-[10px] py-[3px] flex justify-center items-center text-[14px] bg-[#272727] rounded-md mr-[5px] text-[#d0d0d0] mb-[5px]"
                        >
                          {data}
                          <div
                            className="h-full w-[20px] flex justify-end items-center "
                            onClick={(e) => {
                              setMemberNameArr((prev) =>
                                prev?.filter(
                                  (data, dataIndex) => dataIndex != index
                                )
                              );
                            }}
                          >
                            <HugeiconsIcon
                              icon={Cancel01Icon}
                              size={12}
                              strokeWidth={2.4}
                              className={" "}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="w-full mt-[20px] flex justify-center items-center ">
                  <div
                    className="px-[12px] font-[600] text-[14px] h-[35px] flex justify-center items-center bg-[white] text-[#000] rounded-md"
                    onClick={(e) => {
                      if (
                        spaceName?.trim()?.length > 0 &&
                        memberNameArr?.length > 0
                      ) {
                        createSpace(spaceName, memberNameArr);
                      }
                    }}
                  >
                    Create Space
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              " h-[50px] rounded-full flex justify-center items-center bg-[#ffffff2f] z-[80] backdrop-blur-lg fixed bottom-[70px] left-[50%] translate-x-[-50%] p-[5px] group select-none" +
              (newSpaceModal ? " w-[115px]" : " w-[175px]")
            }
            style={{ transition: ".3s" }}
            onClick={(e) => {
              setNewSpaceModal(!newSpaceModal);
            }}
          >
            <div
              className={
                "w-full h-full rounded-full  flex justify-center items-center text-[#a5a5a5] px-[10px] pr-[15px] group-hover:text-[#fff] group-hover:bg-[#ffffff2f] whitespace-nowrap overflow-hidden " +
                (animate ? " fade-in" : " ") +
                (animate ? " visible" : " hidden")
              }
              style={{ transition: ".0s" }}
            >
              <HugeiconsIcon
                icon={!newSpaceModal ? PlusSignCircleIcon : CancelCircleIcon}
                size={20}
                strokeWidth={2}
                className={"mr-[7px] min-w-[20px] "}
              />
              {newSpaceModal ? "Cancel" : " New Collection"}
            </div>
          </div>
          <SplitSpacesList
            allSpaceInfo={allSpaceInfo}
            setActiveSplitSpace={setActiveSplitSpace}
          />
        </>
      )}
    </>
  );
}

const TransactionCard = ({
  data,
  index,
  onLongPress,
  defaultOptions,
  setShowTransactionDetails,
  showTransactionDetails,
  allTransactions,
  setIsTransactionDeleted,
  isActiveSelectMode,
  selectedDataForBulk,
  setSelectedDataForBulk,
  setIsActiveSelectMode,
}) => {
  const longPressEvent = useLongPress(() => onLongPress(index), defaultOptions);

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <>
      <ShowTransactionDetailModal
        setShowTransactionDetails={setShowTransactionDetails}
        showTransactionDetails={showTransactionDetails}
        index={index}
        allTransactions={allTransactions}
        setIsTransactionDeleted={setIsTransactionDeleted}
      />
      <div
        key={index}
        className={
          "w-full flex justify-between items-center min-h-[60px] mb-[0px] select-none" +
          (isActiveSelectMode
            ? selectedDataForBulk.includes(index)
              ? " opacity-100"
              : " opacity-50"
            : " opacity-100")
        }
        onClick={() => {
          if (isActiveSelectMode) {
            console.log("yes");
            if (selectedDataForBulk.includes(index)) {
              if (selectedDataForBulk?.length == 1) {
                setIsActiveSelectMode(false);
                setSelectedDataForBulk([]);
              } else {
                setSelectedDataForBulk(
                  selectedDataForBulk?.filter((item) => item != index)
                );
              }
            } else {
              setSelectedDataForBulk((prev) => [...prev, index]);
            }
          } else {
            console.log("mo");
            setShowTransactionDetails({
              show: true,
              data: data,
              index: index,
            });
          }
        }}
      >
        <div className="flex justify-start items-center w-[calc(100%-100px)] z-10">
          <div className="w-[40px] aspect-square rounded-full bg-[#1d1d1d] flex justify-center items-center p-[2px]">
            <div
              {...longPressEvent}
              className={
                "w-full h-full aspect-square rounded-full bg-[#fff] text-[black] flex justify-center items-center font-extrabold uppercase text-[14px] z-10  " +
                (isActiveSelectMode && selectedDataForBulk.includes(index)
                  ? " blur-"
                  : "")
              }
            >
              {data?.payeeName.split(" ")[0].charAt(0)}
              {data?.payeeName.split(" ").pop().charAt(0)}
            </div>
            <div
              className={
                "ml-[-36px]  w-full h-full aspect-square rounded-full bg-[#fff] text-[black] flex justify-center items-center font-extrabold uppercase text-[14px] z-20 " +
                (isActiveSelectMode && selectedDataForBulk.includes(index)
                  ? " visible"
                  : " hidden")
              }
            >
              <HugeiconsIcon
                icon={Tick02Icon}
                size={20}
                strokeWidth={5}
                // fill="currentColor"
                className=""
              />
            </div>
          </div>
          <div className="w-[calc(100%-40px)] flex flex-col justify-center items-start px-[15px]">
            <div className="w-full text-[#d5d5d5] overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              {data?.name}
            </div>
            <div className="text-[#6e6e6e] text-[12px] font-semibold">
              {data?.payeeName}
            </div>
          </div>
        </div>
        <div className=" w-[100px] flex flex-col justify-center items-end">
          <div className="font-bold text-[#d5d5d5]">
            ₹ {formatAmount(data?.amount)}
          </div>
          <div className="text-[#6e6e6e] text-[12px]">
            {data?.date?.split("T")[0]}
          </div>
        </div>
      </div>
    </>
  );
};

const TransactionSkeleton = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center min-h-[60px] mb-[0px] animate-pulse">
        <div className="flex justify-start items-center w-[calc(100%-100px)]">
          <div className="w-[40px] aspect-square rounded-full bg-[#3c3c3c] flex justify-center items-center p-[2px]">
            <div className="w-full h-full aspect-square rounded-full bg-[#3c3c3c]"></div>
          </div>
          <div className="w-[calc(100%-40px)] flex flex-col justify-center items-start px-[15px]">
            <div className="w-full h-[14px] bg-[#3c3c3c] mb-[8px] rounded-md"></div>
            <div className="w-[60%] h-[12px] bg-[#3c3c3c] rounded-md"></div>
          </div>
        </div>
        <div className=" w-[100px] flex flex-col justify-center items-end">
          <div className="w-[50px] h-[14px] bg-[#3c3c3c] mb-[8px] rounded-md"></div>
          <div className="w-[70px] h-[12px] bg-[#3c3c3c] rounded-md"></div>
        </div>
      </div>
    </>
  );
};
