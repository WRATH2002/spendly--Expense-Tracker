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
  Airplane02Icon,
  ArrowUp04Icon,
  CarrotIcon,
  ShoppingBasket03Icon,
  TaxiIcon,
} from "@hugeicons/core-free-icons";
// import * from "@hugeicons/core-free-icons";
import { themeColor } from "../utils/constants";
import { categoryToIconMapping } from "../utils/categoryToIconSVGMapping";
import ShowCategoryToIcon from "./ShowCategoryToIcon";

// --------------- Components related imports / others

const t = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M8.00001 7.00116H16.75C18.8567 7.00116 19.9101 7.00116 20.6667 7.5069C20.9943 7.72584 21.2756 8.00717 21.4944 8.33484C21.9796 9.06117 21.9992 10.0608 22 12.0026V13.0029M12 7.00116L11.3666 5.73392C10.8418 4.68406 10.3622 3.6273 9.19927 3.19106C8.68991 3 8.10803 3 6.94428 3C5.1278 3 4.21957 3 3.53807 3.38043C3.05227 3.65161 2.65142 4.05257 2.38032 4.53851C2 5.22021 2 6.12871 2 7.94571V11.0023C2 15.7177 2 18.0754 3.46447 19.5403C4.70529 20.7815 6.58688 20.9711 10 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M19 18.5L20.4453 19.4635C21.1297 19.9198 21.4719 20.1479 21.7359 20.0066C22 19.8653 22 19.454 22 18.6315V17.3685C22 16.546 22 16.1347 21.7359 15.9934C21.4719 15.8521 21.1297 16.0802 20.4453 16.5365L19 17.5M19 18.5V17.5M19 18.5C19 19.4346 19 19.9019 18.799 20.25C18.6674 20.478 18.478 20.6674 18.25 20.799C17.9019 21 17.4346 21 16.5 21H16C14.5858 21 13.8787 21 13.4393 20.5607C13 20.1213 13 19.4142 13 18C13 16.5858 13 15.8787 13.4393 15.4393C13.8787 15 14.5858 15 16 15H16.5C17.4346 15 17.9019 15 18.25 15.201C18.478 15.3326 18.6674 15.522 18.799 15.75C19 16.0981 19 16.5654 19 17.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

export default function AllTransactionView(props) {
  const navigate = useNavigate();

  // ------------ Function to navigate to desire path
  function navigateToPage(path) {
    navigate(`${path}`);
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-start items-start border-x-[1.5px] border-[#f2f2f2] text-[white] p-[20px]"
      style={{
        color: props?.theme
          ? themeColor.darkTextPrimary
          : themeColor?.lightTextPrimary,
      }}
    >
      {props?.allTransactions?.map((data, index) => {
        return (
          <TransactionBlock theme={props?.theme} data={data} index={index} />
        );
      })}
      <ShowCategoryToIcon
        theme={props?.theme}
        categoryToMapping={props?.categoryToMapping}
        setCategoryToMapping={props?.setCategoryToMapping}
      />
    </div>
  );
}

const TransactionBlock = (props) => {
  return (
    <>
      <div
        className="w-full h-[40px] flex justify-start items-center overflow-visible mb-[10px]"
        key={props?.index}
      >
        <div
          className="w-[35px] h-[35px] rounded-full flex justify-center items-center "
          dangerouslySetInnerHTML={{
            __html:
              categoryToIconMapping[
                props?.data?.transactionCategory.toLowerCase()
              ],
          }}
        ></div>
        <div
          className="w-[20px] h-[30px] mr-[5px] ml-[-10px]  flex justify-start items-end"
          style={{
            color: props?.theme
              ? themeColor?.darkError
              : themeColor?.lightError,
          }}
        >
          <HugeiconsIcon
            className=""
            icon={ArrowUp04Icon}
            width={14}
            height={14}
            fill="currentColor"
            strokeWidth={1.8}
          />
        </div>
        <div className="w-[calc(100%-50px)] flex justify-between items-start pt-[12px]">
          <div className="flex flex-col justify-start items-start">
            <div className="text-[14px] font-[im]">
              {props?.data?.transactionName}
            </div>
            <div
              className="text-[10px]"
              style={{
                color: props?.theme
                  ? themeColor?.darkTextSecondary
                  : themeColor?.lightTextSecondary,
              }}
            >
              20<sup className="">th</sup> May, 2025
            </div>
          </div>
          <div className="flex flex-col justify-start items-end">
            <div className="text-[14px] font-[im]">
              ₹ {props?.data?.transactionAmount}
            </div>
            <div
              className="text-[10px]"
              style={{
                color: props?.theme
                  ? themeColor?.darkTextSecondary
                  : themeColor?.lightTextSecondary,
              }}
            >
              {props?.data?.transactionMode}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
