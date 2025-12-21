import {
  ArrowLeft02Icon,
  Bookmark03Icon,
  Cancel01Icon,
  CheckmarkSquare02Icon,
  Edit02Icon,
  MultiplicationSignIcon,
  Tick02Icon,
  Undo02Icon,
  UndoIcon,
  WasteIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "../firebase";
import toast, { Toaster } from "react-hot-toast";

export default function ShowTransactionDetailModal({
  showTransactionDetails,
  setShowTransactionDetails,
  index,
  allTransactions,
  setIsTransactionDeleted,
}) {
  const [includeToSplit, setIncludeToSplit] = useState(false);

  const [tempTransactionData, setTempTransactionData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // ------------ Function to add transaction to firestore database
  function addTransactionInfo(tempData) {
    // console.log("adding split transaction", generateCurrentDateTime());
    const user = firebase.auth().currentUser;
    console.log(
      allTransactions?.map((data, idx) => {
        if (idx == showTransactionDetails?.index) {
          return tempData;
        } else {
          return data;
        }
      })
    );
    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .update({
        SplitTransactions: allTransactions?.map((data, idx) => {
          if (idx == showTransactionDetails?.index) {
            return tempData;
          } else {
            return data;
          }
        }),
      });
  }

  function deleteTransactionInfo() {
    // console.log("adding split transaction", generateCurrentDateTime());
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .update({
        SplitTransactions: allTransactions?.filter((data, idx) => {
          if (idx != showTransactionDetails?.index) {
            return data;
          }
        }),
      });
  }

  useEffect(() => {
    setTempTransactionData(showTransactionDetails?.data || {});
  }, [showTransactionDetails]);

  useEffect(() => {
    console.log(tempTransactionData);
  }, [tempTransactionData]);

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", options);
  }

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      {showTransactionDetails?.show &&
      index == showTransactionDetails?.index ? (
        <div
          className="w-full h-[100svh] fixed bottom-0 left-0 flex flex-col justify-end items-start z-[300] bg-[#00000000] backdrop-blur-sm font-[geist]"
          onClick={(e) => {
            e.stopPropagation();
            setShowTransactionDetails({
              show: false,
              data: {},
              index: null,
            });
          }}
        >
          {/* <div className="w-full flex justify-center items-center h-[0px] overflow-visible z-[301]">
            <div className="w-[90px] h-[90px] bg-[#121212] rounded-full p-[7px] ">
              <div className="w-full h-full bg-[#282828] rounded-full flex justify-center items-center  bg-gradient-to-br from-[#E6CE82] to-[#A67D29] bg-clip-text text-transparent text-[30px] uppercase font-extrabold ">
                {tempTransactionData?.payeeName
                  ?.split(" ")[0]
                  .charAt(0)}
                {tempTransactionData?.payeeName
                  ?.split(" ")
                  .pop()
                  .charAt(0)}
              </div>
            </div>
          </div> */}
          <div
            className="w-full h-full bg-[#090909] p-[20px] flex flex-col justify-start items-start"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="w-full flex justify-center items-center font-[600] text-[18px]">
              Transaction Details
            </div>

            <div className="w-full h-auto rounded-3xl bg-[#151515] mt-[20px] p-[20px]">
              {/* tick mark icon */}
              <div className="w-full flex justify-center items-center mt-[10px]">
                <div className="w-[45px] h-[45px] p-[8px] flex justify-center items-center rounded-full bg-[#5eb70b35]">
                  <div className="w-full h-full flex justify-center items-center rounded-full bg-[#5eb70b] text-[#24282E]">
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      size={20}
                      strokeWidth={5}
                      // fill="currentColor"
                      className=""
                    />
                    {/* <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={20}
                      strokeWidth={5}
                      // fill="currentColor"
                      className=""
                    /> */}
                  </div>
                </div>
              </div>
              {/* transaction status */}
              <div className="w-full flex justify-center items-center">
                <div className="flex justify-center items-center font-[] text-[12px] py-[3px] px-[10px] rounded-lg bg-[#5eb70b17] text-[#5eb70b] mt-[30px]">
                  Transaction Completed Successfuly
                </div>
              </div>
              {/* transaction amount */}
              <div className="w-full flex justify-center items-center text-[22px] font-[600] mt-[20px]">
                {isEditMode ? (
                  <input
                    className="bg-[#202020] py-[5px] px-[12px] rounded-lg outline-none border-[1.5px] border-[#2e2e2e] max-w-[170px] text-center text-[22px] font-[600]"
                    type="tel"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTempTransactionData((prev) => ({
                        ...prev,
                        transactionAmount: e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        ),
                      }));
                    }}
                    value={`₹ ${tempTransactionData?.transactionAmount}`}
                  />
                ) : (
                  <div className="py-[5px] border-[1.5px] border-[#2e2e2e00]">
                    ₹ {formatAmount(tempTransactionData?.transactionAmount)}
                  </div>
                )}
              </div>
              {/* Devider */}
              <div className="w-full border-t-[2px] border-[#1c1c1c] border-dashed my-[30px]"></div>
              {/* transaction info */}
              <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex justify-between items-start py-[8px] rounded-t-[12px] rounded-b-sm">
                  <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                    Payee
                  </span>
                  <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                    {tempTransactionData?.payeeName}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start py-[8px] rounded-t-sm rounded-b-sm mt-[1.5px]">
                  <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                    Label
                  </span>
                  <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                    {tempTransactionData?.transactionName}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start py-[8px] rounded-t-sm rounded-b-sm mt-[1.5px]">
                  <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                    Date
                  </span>
                  <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                    {formatDate(tempTransactionData?.transactionDate)}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start py-[8px] rounded-t-sm rounded-b-sm mt-[1.5px]">
                  <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                    Time
                  </span>
                  <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                    {new Date(
                      tempTransactionData?.transactionDate
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start py-[8px] rounded-t-sm rounded-b-[12px] mt-[1.5px]">
                  <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                    Description
                  </span>
                  <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end text-justify">
                    Hello here the transaction description will be shown and
                    this description can of many words and long enough .
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-[20px]">
              <div className="">Include in split</div>
              <div
                className={
                  "w-[40px] h-[28px] rounded-full flex justify-start items-center bg-[#252525] "
                }
                style={{ transition: ".3s" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIncludeToSplit(!includeToSplit);
                }}
              >
                <div
                  className={
                    "h-[22px] w-[22px] rounded-full drop-shadow-lg bg-gradient-to-br from-[#E6CE82] to-[#A67D29]" +
                    (includeToSplit
                      ? " ml-[15px] bg-[#ffffff]"
                      : " ml-[3px] bg-[#2b2b2e]")
                  }
                  style={{ transition: ".3s" }}
                ></div>
              </div>
            </div>

            {/* /---- */}
            {/* <span className="text-[28px] mt-[10px] mb-[10px] font-[700] w-full flex justify-center tracking-wider">
              <div className="flex flex-col justify-center items-start">
                <div className="text-[14px] font-normal tracking-normal text-[#8d8d8d]">
                  Spent
                </div>
                <div>
                  ₹{" "}
                  {formatAmount(
                    tempTransactionData?.transactionAmount
                  )}
                </div>
                <div className="text-right w-full text-[14px] font-normal tracking-normal text-[#8d8d8d]">
                  20%
                </div>
              </div>
            </span>
            <div className="w-full flex justify-center items-center ">
              <div className="w-auto border-[1.5px] border-[#292929] flex justify-center items-center px-[10px] min-h-[30px] rounded-[16px] text-[14px] pl-[5px] pr-[14px]  bg-gradient-to-br from-[#E6CE82] to-[#A67D29] bg-clip-text text-transparent">
                <span className="text-[20px] mr-[3px]">•</span>{" "}
                {tempTransactionData?.payeeName}
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start mt-[60px]">
              <div className="w-full flex justify-between items-start py-[10px] bg-[#1e1e1e] px-[15px] rounded-t-[12px] rounded-b-sm">
                <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                  Label
                </span>
                <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                  {tempTransactionData?.transactionName}
                </div>
              </div>
              <div className="w-full border-t-[1.5px] border-[#1d1d1d00] h-[2px]"></div>
              <div className="w-full flex justify-between items-start py-[10px] bg-[#1e1e1e] px-[15px] rounded-t-sm rounded-b-sm">
                <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                  Amount
                </span>
                <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                  ₹{" "}
                  {formatAmount(
                    tempTransactionData?.transactionAmount
                  )}
                </div>
              </div>
              <div className="w-full border-t-[1.5px] border-[#1d1d1d00] h-[2px]"></div>
              <div className="w-full flex justify-between items-start py-[10px] bg-[#1e1e1e] px-[15px] rounded-t-sm rounded-b-sm">
                <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                  Date
                </span>
                <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                  {formatDate(tempTransactionData?.transactionDate)}
                </div>
              </div>
              <div className="w-full border-t-[1.5px] border-[#1d1d1d00] h-[2px]"></div>
              <div className="w-full flex justify-between items-start py-[10px] bg-[#1e1e1e] px-[15px] rounded-t-sm rounded-b-[12px]">
                <span className="text-[14px] mb-[0px] text-[#676767] w-[100px]">
                  Time
                </span>
                <div className="text-[14px] mb-[0px] w-[calc(100%-110px)] whitespace-break-spaces flex justify-end">
                  {new Date(
                    tempTransactionData?.transactionDate
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="w-full border-t-[1.5px] border-[#1d1d1d00] h-[2px]"></div>
            </div> */}
            {/* <div className="flex justify-between items-center w-full min-h-[40px] fixed left-0 bottom-[20px] px-[20px] bg-[#090909] font-[geist]">
              {isEditMode ? (
                <>
                  <button
                    className="w-[calc((100%-2px)/2)] flex justify-center items-center min-h-[45px] rounded-[12px] bg-[#ffffff] text-[#000] rounded-r-sm font-[500]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditMode(false);
                    }}
                  >
                    <HugeiconsIcon
                      icon={UndoIcon}
                      size={16}
                      strokeWidth={2.4}
                      className="mr-[12px]"
                    />{" "}
                    Cancel
                  </button>
                  <button
                    className="w-[calc((100%-2px)/2)] flex justify-center items-center min-h-[45px] rounded-[12px] bg-[#519725] text-[#ffffff] rounded-l-sm font-[500] "
                    onClick={(e) => {
                      e.stopPropagation();
                      addTransactionInfo(tempTransactionData);
                      setIsEditMode(false);
                      toast.success("Successfully updated!", {
                        style: {
                          borderRadius: "40px",
                          fontWeight: "500",
                          fontSize: "14px",
                          backgroundColor: "#ffffffd0",
                          backdropFilter: "blur(4px)",
                        },
                      });
                    }}
                  >
                    <HugeiconsIcon
                      icon={Bookmark03Icon}
                      size={16}
                      strokeWidth={2.4}
                      className="mr-[12px]"
                    />{" "}
                    Update
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-[calc((100%-2px)/3)] flex justify-center items-center min-h-[45px] rounded-[12px] bg-[#373737] text-[#fff] rounded-r-sm font-[500]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTransactionDetails({
                        show: false,
                        data: {},
                        index: null,
                      });
                    }}
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft02Icon}
                      size={16}
                      strokeWidth={2.4}
                      className="mr-[12px]"
                    />{" "}
                    Back
                  </button>
                  <button
                    className="w-[calc((100%-2px)/3)] flex justify-center items-center min-h-[45px] bg-[#ffffff] text-[#000] rounded-sm font-[500]"
                    onClick={(e) => {
                      e.stopPropagation();
                      // setShowTransactionDetails({
                      //   show: false,
                      //   data: {},
                      //   index: null,
                      // });
                      setIsEditMode(true);
                    }}
                  >
                    <HugeiconsIcon
                      icon={Edit02Icon}
                      size={16}
                      strokeWidth={2.4}
                      className="mr-[12px]"
                    />{" "}
                    Edit
                  </button>
                  <button
                    className="w-[calc((100%-2px)/3)] flex justify-center items-center min-h-[45px] rounded-[12px] bg-[#972526] text-[#ffffff] rounded-l-sm font-[500]"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTransactionInfo();
                      setIsTransactionDeleted((prev) => true);
                      setShowTransactionDetails({
                        show: false,
                        data: {},
                        index: null,
                      });
                    }}
                  >
                    <HugeiconsIcon
                      icon={WasteIcon}
                      size={16}
                      strokeWidth={2.4}
                      className="mr-[12px]"
                    />{" "}
                    Delete
                  </button>
                </>
              )}
            </div> */}
            <div
              className={
                "w-full flex justify-center items-center left-0  fixed z-50 bottom-[20px]"
              }
              style={{
                transition: ".3s",
              }}
            >
              <div
                className={
                  "bg-[#ffffff2f] h-[45px] flex justify-evenly items-center rounded-3xl  backdrop-blur-sm " +
                  (isEditMode ? " w-[170px]" : " w-[130px]")
                }
                style={{
                  transition: ".3s",
                }}
              >
                <div
                  className={
                    " rounded-full flex justify-center items-center cursor-pointer text-[#ffffff]" +
                    (!isEditMode ? " hidden" : " visible")
                  }
                  style={
                    {
                      // opacity: isActiveSelectMode ? 1 : 0,
                      // transition: isActiveSelectMode ? ".3s" : "0s",
                      // transitionDelay: isActiveSelectMode ? ".25s" : "0s",
                    }
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditMode(false);
                  }}
                >
                  Cancel
                </div>
                <div
                  className={
                    " rounded-full flex justify-center items-center cursor-pointer text-[#ffffff]" +
                    (!isEditMode ? " hidden" : " visible")
                  }
                  style={
                    {
                      // opacity: isActiveSelectMode ? 1 : 0,
                      // transition: isActiveSelectMode ? ".3s" : "0s",
                      // transitionDelay: isActiveSelectMode ? ".25s" : "0s",
                    }
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    addTransactionInfo(tempTransactionData);
                    setIsEditMode(false);
                    toast.success("Successfully updated!", {
                      style: {
                        borderRadius: "40px",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#ffffffd0",
                        backdropFilter: "blur(4px)",
                      },
                    });
                  }}
                >
                  Update
                </div>
                <div
                  className={
                    " rounded-full flex justify-center items-center cursor-pointer" +
                    (isEditMode ? " hidden" : " visible")
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTransactionDetails({
                      show: false,
                      data: {},
                      index: null,
                    });
                  }}
                  style={
                    {
                      // opacity: isActiveSelectMode ? 1 : 0,
                      // transition: isActiveSelectMode ? ".3s" : "0s",
                      // transitionDelay: isActiveSelectMode ? ".2s" : "0s",
                    }
                  }
                >
                  <HugeiconsIcon
                    icon={ArrowLeft02Icon}
                    size={20}
                    // fill="currentColor"
                    strokeWidth={2.2}
                    className=""
                  />
                </div>
                <div
                  className={
                    " rounded-full flex justify-center items-center cursor-pointer" +
                    (isEditMode ? " hidden" : " visible")
                  }
                  style={
                    {
                      // opacity: isActiveSelectMode ? 1 : 0,
                      // transition: isActiveSelectMode ? ".3s" : "0s",
                      // transitionDelay: isActiveSelectMode ? ".25s" : "0s",
                    }
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditMode(true);
                  }}
                >
                  <HugeiconsIcon
                    icon={Edit02Icon}
                    size={20}
                    // fill="currentColor"
                    strokeWidth={2.2}
                    className=""
                  />
                </div>
                <div
                  className={
                    " rounded-full flex justify-center items-center cursor-pointer text-[#e45a2c]" +
                    (isEditMode ? " hidden" : " visible")
                  }
                  style={
                    {
                      // opacity: isActiveSelectMode ? 1 : 0,
                      // transition: isActiveSelectMode ? ".3s" : "0s",
                      // transitionDelay: isActiveSelectMode ? ".3s" : "0s",
                    }
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTransactionInfo();
                    setIsTransactionDeleted((prev) => true);
                    setShowTransactionDetails({
                      show: false,
                      data: {},
                      index: null,
                    });
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
