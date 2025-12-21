import { TransactionHistoryIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

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

export default function AddTransactionModal({ theme }) {
  const [transactionID, setTransactionID] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionMode, setTransactionMode] = useState("UPI");
  const [transactionType, setTransactionType] = useState("Single");
  const [transactionBillURL, setTransactionBillURL] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [splittedMemberCount, setSplittedMemberCount] = useState("");
  const [splittedMemberIDS, setSplittedMemberIDS] = useState([]);
  const [activeInputField, setActiveInputField] = useState("trName");

  const navigate = useNavigate();

  // ------------ Function to navigate to desire path
  function navigateToPage(path) {
    navigate(`${path}`);
  }

  // ------------ Function to add transaction to firestore database
  function addTransactionInfo() {
    const user = firebase.auth().currentUser;

    db.collection("userSpace")
      .doc(user?.uid)
      .collection("AllTransactionsSpace")
      .doc("AllTransactions")
      .update({
        AllTransactions: arrayUnion({
          transactionName: transactionName,
          transactionID: transactionID,
          transactionDate: transactionDate,
          transactionMode: transactionMode,
          transactionType: transactionType,
          transactionBillURL: transactionBillURL,
          transactionAmount: transactionAmount,
          transactionCategory: transactionCategory,
          splittedMemberCount: splittedMemberCount,
          splittedMemberIDS: splittedMemberIDS,
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

  return (
    <div className="w-full h-[100svh] flex justify-center items-center bg-[#0A0A0A45] fixed left-0 top-0 backdrop-blur-md z-50">
      <div className="w-[400px] min-h-[300px] bg-[#1a1a1a] rounded-2xl border-[1.5px] border-[#242424] flex flex-col justify-start items-start p-[20px] px-[25px]">
        <span className="text-[24px] font-[isb] flex justify-start items-center">
          <HugeiconsIcon
            className="mr-[10px] "
            icon={TransactionHistoryIcon}
            width={22}
            height={22}
            strokeWidth={2}
          />{" "}
          Add Transaction
        </span>
        <InputField
          stateVariable={transactionName}
          setStateVariable={setTransactionName}
          activeInputField={activeInputField}
          setActiveInputField={setActiveInputField}
          theme={theme}
          fieldFlag={"trName"}
          label={"Transaction Name"}
          placeholder={"eg. Amazon Shopping"}
          mt={"30"}
        />
        <InputField
          stateVariable={transactionID}
          setStateVariable={setTransactionID}
          activeInputField={activeInputField}
          setActiveInputField={setActiveInputField}
          theme={theme}
          fieldFlag={"trID"}
          label={"Transaction ID"}
          placeholder={"eg. PPPL17143660546080423204552"}
          mt={"20"}
        />
        <div className="w-full flex justify-between items-center mt-[20px]">
          <div className="w-[calc((100%-20px)/2)] ">
            <InputField
              stateVariable={transactionDate}
              setStateVariable={setTransactionDate}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              theme={theme}
              fieldFlag={"trDate"}
              label={"Transaction Date"}
              placeholder={`eg. 20/04/2025`}
              mt={"0"}
            />
          </div>
          <div className="w-[calc((100%-20px)/2)] ">
            <InputField
              stateVariable={transactionAmount}
              setStateVariable={setTransactionAmount}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              theme={theme}
              fieldFlag={"trAmount"}
              label={"Transaction Amount"}
              placeholder={`eg. 34500.00/-`}
              mt={"0"}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-[20px]">
          <div className="w-[calc((100%-20px)/2)] ">
            <InputField
              stateVariable={transactionMode}
              setStateVariable={setTransactionMode}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              theme={theme}
              fieldFlag={"trMode"}
              label={"Transaction Mode"}
              placeholder={`eg. UPI`}
              mt={"0"}
            />
          </div>
          <div className="w-[calc((100%-20px)/2)] ">
            <InputField
              stateVariable={transactionType}
              setStateVariable={setTransactionType}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              theme={theme}
              fieldFlag={"trType"}
              label={"Transaction Type"}
              placeholder={`eg. Single`}
              mt={"0"}
            />
          </div>
        </div>
        <button
          onClick={() => {
            addTransactionInfo();
          }}
        >
          Add Trn
        </button>
      </div>
    </div>
  );
}

const InputField = (props) => {
  return (
    <>
      <div
        className="flex flex-col justify-start items-start w-full"
        style={{ marginTop: `${props?.mt}px` }}
      >
        <label
          className={
            "text-[12px] h-[2px] flex justify-center items-center px-[6px] mb-[-1.5px] ml-[10px] z-50 " +
            (props?.theme
              ? props?.activeInputField === props?.fieldFlag
                ? " text-[#a3a3a3] bg-[#1A1A1A]"
                : " text-[#6e6e6e] bg-[#1A1A1A]"
              : props?.activeInputField === props?.fieldFlag
              ? " text-[#565656] bg-[#ffffff]"
              : " text-[#999999] bg-[#ffffff]")
          }
          style={{ transition: ".1s" }}
        >
          {props?.label}
        </label>
        <input
          className={
            "w-[calc(100%-0px)] px-[15px] bg-transparent h-[40px] outline-none rounded-[10px] border-[1.5px] text-[14px] mt-[0px]" +
            (props?.theme
              ? props?.activeInputField === props?.fieldFlag
                ? " text-[white] placeholder:text-[#5b5b5b] border-[#636363]"
                : " text-[white] placeholder:text-[#5b5b5b] border-[#2c2c2c]"
              : props?.activeInputField === props?.fieldFlag
              ? " text-[black] placeholder:text-[#828282] border-[#cdcdcd] "
              : " text-[black] placeholder:text-[#828282] border-[#ececec] ")
          }
          style={{ transition: ".1s" }}
          autoFocus
          spellCheck="false"
          onFocus={(e) => {
            props?.setActiveInputField(props?.fieldFlag);
          }}
          onBlur={(e) => {
            props?.setActiveInputField("");
          }}
          value={props?.stateVariable}
          onChange={(e) => {
            if (
              !e.target.value.includes(".") &
              !e.target.value.includes("-") &
              !e.target.value.includes("%")
            ) {
              props?.setStateVariable(e.target.value);
            }
          }}
          placeholder={props?.placeholder}
        ></input>
      </div>
    </>
  );
};
