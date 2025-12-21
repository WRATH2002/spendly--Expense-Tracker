import React from "react";
import { categoryToIconMapping } from "../utils/categoryToIconSVGMapping";

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

// --------------- Components related imports / others

export default function ShowCategoryToIcon(props) {
  return (
    <div className="w-[300px] h-auto p-[15px] flex flex-col justify-start items-start font-[ir] bg-[#181818] rounded-xl">
      {Object.keys(props?.categoryToMapping).map(function (key, index) {
        return (
          <div
            key={index}
            className="w-full flex justify-start items-center text-[white]"
          >
            <div
              className="w-[35px] h-[35px] rounded-full flex justify-center items-center text-[white]"
              dangerouslySetInnerHTML={{
                __html: categoryToIconMapping[key],
              }}
            ></div>
            <div className="w-[calc(100%-40px)] ml-[5px] text-[14px] ">
              {key}
            </div>
          </div>
        );
      })}

      {/* {categoryToIconMapping?.map((data, index) => {
        return (
          <div className="w-full flex justify-start items-center">
            <div
              className="w-[35px] h-[35px] rounded-full flex justify-center items-center text-[white]"
              dangerouslySetInnerHTML={{
                __html:
                  categoryToIconMapping[
                    props?.data?.transactionCategory.toLowerCase()
                  ],
              }}
            ></div>
            <div className="w-[calc(100%-35px)]">{}</div>
          </div>
        );
      })} */}
    </div>
  );
}
