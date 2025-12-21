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
import { ArrowDown04Icon, ArrowUp04Icon } from "@hugeicons/core-free-icons";
// import * from "@hugeicons/core-free-icons";
import { themeColor } from "../utils/constants";
import { categoryToIconMapping } from "../utils/categoryToIconSVGMapping";
import { formatNumberWithCommasAndTwoDigits } from "../utils/functions";

// --------------- Components related imports / others

export default function TransactionBlock(props) {
  return (
    <>
      {props?.index != 0 && (
        <div className="w-full border-t-[1.5px] border-[#17171800] my-[5px]"></div>
      )}
      <div
        className="w-full h-[60px] flex justify-start items-center overflow-visible  font-[im]"
        key={props?.index}
      >
        <div
          className="w-[35px] mr-[5px] h-[35px] mt-[-10px] rounded-full flex justify-start items-center font-[em] "
          dangerouslySetInnerHTML={{
            __html:
              categoryToIconMapping[
                props?.data?.transactionCategory.toLowerCase()
              ],
          }}
        ></div>
        {/* <div
          className="w-[20px] h-[35px] mt-[-10px]  mr-[5px] ml-[-10px]  flex justify-start items-end"
          style={{
            color: props?.theme
              ? themeColor?.darkError
              : themeColor?.lightError,
          }}
        >
          {props?.index == 0 ? (
            <>
              <HugeiconsIcon
                icon={ArrowUp04Icon}
                size={16}
                strokeWidth={1.8}
                fill="currentColor"
                className="text-[#4CAF50]"
              />
            </>
          ) : (
            <>
              <HugeiconsIcon
                icon={ArrowDown04Icon}
                size={16}
                strokeWidth={1.8}
                fill="currentColor"
                className="text-[#ff4d24]"
              />
            </>
          )}
        </div> */}
        <div className="w-[calc(100%-40px)] flex justify-between items-center ">
          <div className="flex flex-col justify-start items-start">
            <div className="text-[18px] font-[tnb]">
              {props?.data?.transactionName}
            </div>
            <div
              className="text-[14px] mt-[-2px] font-[tnm] text-[#595959]"
              //   style={{
              //     color: props?.theme
              //       ? themeColor?.darkTextSecondary
              //       : themeColor?.lightTextSecondary,
              //   }}
            >
              03:45 PM
            </div>
          </div>
          <div className="flex flex-col justify-start items-end">
            <div className="text-[18px] font-[tnb] flex justify-end items-center text-[#FF6F6F]">
              <div className="text-[18px] mt-[2px] mr-[4px] ">+</div>{" "}
              {formatNumberWithCommasAndTwoDigits(
                props?.data?.transactionAmount
              )}
            </div>
            <div
              className="text-[14px] mt-[-2px] font-[tnm] text-[#595959]"
              //   style={{
              //     color: props?.theme
              //       ? themeColor?.darkTextSecondary
              //       : themeColor?.lightTextSecondary,
              //   }}
            >
              {props?.data?.transactionMode}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
