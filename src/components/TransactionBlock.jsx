import React from "react";

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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown04Icon,
  ArrowDownLeft01Icon,
  ArrowUp04Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
// import * from "@hugeicons/core-free-icons";
import { themeColor } from "../utils/constants";
import { categoryToIconMapping } from "../utils/categoryToIconSVGMapping";
import {
  formatNumberWithCommasAndTwoDigits,
  formatTransactionDate,
} from "../utils/functions";

// --------------- Components related imports / others
function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function TransactionBlock(props) {
  return (
    <>
      {props?.data?.isGroup ? (
        <>
          <div className="text-[12px] font-[geist]">
            {formatTransactionDate(props?.data?.groupDate)}{" "}
            {props?.data?.totalTransactions}
          </div>
        </>
      ) : (
        <>
          <>
            {props?.index != 0 && (
              <div className="w-full border-t-[1.5px] border-[#17171800] my-[5px]"></div>
            )}
            <div
              className="w-full h-[60px] flex justify-start items-center overflow-visible  font-[geist]"
              key={props?.index}
            >
              <div
                className="w-[35px] mr-[5px] h-[35px] mt-[-10px] rounded-full flex justify-start items-center  "
                dangerouslySetInnerHTML={{
                  __html:
                    categoryToIconMapping[
                      props?.data?.transactionCategory.toLowerCase()
                    ],
                }}
              ></div>

              <div className="w-[calc(100%-40px)] flex justify-between items-center ">
                <div className="flex flex-col justify-start items-start w-[calc(100%-130px)]">
                  <div className="text-[16px] whitespace-nowrap w-full overflow-hidden text-ellipsis">
                    {props?.data?.transactionName}
                  </div>
                  <div
                    className="text-[12px] mt-[0px] text-[#595959]"
                    //   style={{
                    //     color: props?.theme
                    //       ? themeColor?.darkTextSecondary
                    //       : themeColor?.lightTextSecondary,
                    //   }}
                  >
                    {props?.data?.transactionPaymentType}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-end w-[130px]">
                  <div className="text-[16px]  flex justify-end items-center whitespace-nowrap ">
                    {/* <div className="text-[18px] mt-[2px] mr-[4px] ">+</div>{" "} */}
                    ₹ {formatAmount(props?.data?.transactionAmount)}
                  </div>
                  <div
                    className="text-[12px] mt-[0px]  text-[#595959] flex justify-end items-center"
                    //   style={{
                    //     color: props?.theme
                    //       ? themeColor?.darkTextSecondary
                    //       : themeColor?.lightTextSecondary,
                    //   }}
                  >
                    {new Date(props?.data?.transactionDate?.split("T")[0])
                      ?.toGMTString()
                      ?.split(" ")
                      ?.slice(1, 4)
                      .join(" ")}
                    {props?.data?.isInward ? (
                      <div className="min-w-[12px] max-w-[15px] rounded-full aspect-square flex justify-center items-center bg-[#00ff083f] text-[#43e907] ml-[7px]">
                        <HugeiconsIcon
                          icon={ArrowDownLeft01Icon}
                          size={8}
                          strokeWidth={3}
                          className=""
                        />
                      </div>
                    ) : (
                      <div className="min-w-[12px] max-w-[15px] rounded-full aspect-square flex justify-center items-center bg-[#ff8c003f] text-[#e95207] ml-[7px]">
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          size={8}
                          strokeWidth={3}
                          className=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
