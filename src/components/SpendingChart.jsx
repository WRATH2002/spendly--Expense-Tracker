import { FullSignalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { themeColor } from "../utils/constants";
import FinancialChart from "./FinancialChart";
import AddTransactionModal from "./AddTransactionModal";

export default function SpendingChart({ theme }) {
  return (
    <div
      className={
        "w-[700px] h-[400px] rounded-2xl flex flex-col justify-start items-start p-[20px] font-[ir]"
      }
      style={{
        // backgroundColor: theme
        //   ? themeColor?.darkSecondary
        //   : themeColor?.lightSecondary,
        color: theme
          ? themeColor?.darkTextPrimary
          : themeColor?.lightTextPrimary,
      }}
    >
      {/* <AddTransactionModal theme={theme} /> */}
      <div className="w-full flex justify-start items-center">
        <span className="">
          <HugeiconsIcon
            className="mr-[7px]"
            style={{
              color: theme ? themeColor?.darkAccent : themeColor?.lightAccent,
            }}
            icon={FullSignalIcon}
            width={26}
            height={26}
            strokeWidth={1}
            fill="currentColor"
          />
        </span>
        <span className="text-[24px] font-[im]">Spending</span>
      </div>
      <div
        className="text-[16px] mt-[5px] "
        style={{
          color: theme
            ? themeColor?.darkTextSecondary
            : themeColor?.lightTextSecondary,
        }}
      >
        See your expense history from 01 May - 31 May
      </div>
      <div className="w-full h-[250px] mt-[20px]">
        <FinancialChart theme={theme} />
      </div>
      <div
        className="w-full flex justify-between items-center text-[16px] mt-[5px]"
        style={{
          color: theme
            ? themeColor?.darkTextSecondary
            : themeColor?.lightTextSecondary,
        }}
      >
        <span>1 Jan</span>
        <span>Today</span>
      </div>
    </div>
  );
}
