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
  Alert02Icon,
  ArrowDown01Icon,
  ArrowDown04Icon,
  ArrowDownLeft01Icon,
  ArrowUp04Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  Tick02Icon,
  User03Icon,
  UserMultiple02Icon,
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
          {props?.seperateByDate && (
            <>
              <div className="text-[12px] font-[geist] my-[10px] text-[#5c5c5c] bg-[#25252500] px-[12px] py-[2px] rounded-md flex justify-between items-center w-full">
                {/* <div className="w-[15px] h-[15px] flex justify-center items-center bg-[#2d2d2d] rounded-full mr-[10px] ">
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                strokeWidth={3}
                className={" rotate-180"}
              />
            </div>{" "} */}
                <span>{formatTransactionDate(props?.data?.groupDate)} </span>
                <span>{props?.data?.totalTransactions}</span>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <>
            {props?.index != 0 && (
              <div className="w-full border-t-[1.5px] border-[#17171800] my-[.4px]"></div>
            )}
            <div
              className={
                "w-full h-[60px] flex justify-start items-center overflow-visible  font-[geist] bg-[#ffffff10] px-[12px]" +
                (!props?.seperateByDate
                  ? props?.mainDataArr?.length == 2
                    ? " rounded-xl"
                    : props?.index == 1
                    ? " rounded-t-xl rounded-b-sm"
                    : props?.index == props?.mainDataArr?.length - 1
                    ? " rounded-b-xl rounded-t-sm"
                    : " rounded-sm"
                  : props?.mainDataArr[props?.index - 1]?.isGroup &&
                    (props?.mainDataArr[props?.index + 1]?.isGroup ||
                      props?.mainDataArr?.length - 1 == props?.index)
                  ? " rounded-xl"
                  : props?.mainDataArr[props?.index - 1]?.isGroup
                  ? " rounded-t-xl rounded-b-sm"
                  : props?.mainDataArr[props?.index + 1]?.isGroup
                  ? " rounded-b-xl rounded-t-sm"
                  : " rounded-sm")
                // (props?.index == -2 ? " fixed" : " block")
                // (props?.index == 2
                //   ? "fixed top-1/2 left-1/2 z-50 -translate-y-1/2 h-[300px] "
                //   : "relative w-full h-[60px] ")
              }
              key={props?.index}
              style={{ transition: ".5s" }}
              onClick={() => {
                props?.setSelectedData(props?.data);
              }}
            >
              <div
                className="w-[35px] mr-[12px] h-[35px]  rounded-md flex justify-center items-center bg-[#ffffff10] "
                dangerouslySetInnerHTML={{
                  __html:
                    categoryToIconMapping[
                      props?.data?.transactionCategory.toLowerCase()
                    ],
                }}
              ></div>

              <div className="w-[calc(100%-47px)] flex justify-between items-center ">
                <div className="flex flex-col justify-start items-start w-[calc(100%-130px)]">
                  <div className="text-[16px] whitespace-nowrap w-full overflow-hidden text-ellipsis">
                    {props?.data?.transactionName}
                  </div>
                  <div
                    className="text-[12px] mt-[0px] text-[#595959] flex justify-start items-center"
                    //   style={{
                    //     color: props?.theme
                    //       ? themeColor?.darkTextSecondary
                    //       : themeColor?.lightTextSecondary,
                    //   }}
                  >
                    {/* {props?.data?.transactionType == "normal" ? (
                      <></>
                    ) : (
                      <HugeiconsIcon
                        icon={UserMultiple02Icon}
                        size={12}
                        strokeWidth={2}
                        className="mr-[7px] text-[#03e9dad5]"
                      />
                    )} */}
                    {/* <div className="mr-[10px] w-[15px] h-[15px] rounded-full  flex justify-center items-center">
                      {props?.data?.transactionStatus == "Completed" ? (
                        <>
                        </>
                      ) : (
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          size={12}
                          strokeWidth={2}
                          className="text-[#ffae00]"
                        />
                      )}
                    </div> */}
                    <div className=" ">
                      {
                        props?.allBanksInfo?.bankDataObj?.[
                          props?.data?.from
                        ]?.bankName?.split(" ")[0]
                      }
                    </div>
                    --
                    <div>
                      {
                        props?.allBanksInfo?.bankDataObj?.[
                          props?.data?.to
                        ]?.bankName?.split(" ")[0]
                      }
                    </div>
                    {/* {props?.data?.transactionStatus} */}
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
