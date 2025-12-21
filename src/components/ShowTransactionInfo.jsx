import { ArrowUp02Icon, LabelImportantIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default function ShowTransactionInfo() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start text-[#D4D4D4] text-[14px] font-[em] overflow-y-scroll">
      <div className="bg-[#1c1c1ead] w-full h-[100px] rounded-xl p-[15px]">
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-start items-center font-[em] text-[14px] text-[#9e9e9e]">
            in{" "}
            <div className="text-[12px] flex justify-center items-center bg-[#2f2f31] h-[20px] ml-[5px] px-[7px] rounded-lg">
              INR
            </div>
            {/* Songwriter Amazon Puja Shopping Label */}
          </div>
          <div className="text-[30px] font-[eb] mt-[5px] flex justify-start items-center text-[#FF6F6F]">
            <div className=" flex justify-center items-center text-[#FF6F6F]">
              <HugeiconsIcon
                icon={ArrowUp02Icon}
                size={26}
                strokeWidth={4}
                className=" mt-[2px] ml-[-5px] mr-[5px]"
              />
            </div>
            ₹ 3569.35
          </div>
        </div>
      </div>
      <div className="bg-[#1c1c1ead] w-full mt-[20px] rounded-xl flex flex-col justify-start items-start p-[15px]">
        <div className="text-[14px]  flex justify-start items-center font-[eb]">
          <HugeiconsIcon
            icon={LabelImportantIcon}
            size={14}
            fill="currentColor"
            strokeWidth={2}
            className="mr-[8px]"
          />
          Important Note
        </div>
        <div className="text-[13px] mt-[10px] text-[#797979] ">
          This transaction done from my end but the 30% payment is given to me
          through cash and it got used in other shopping so not including that
          in another expense.
        </div>
      </div>
      <div className="mt-[20px] pl-[15px] mb-[5px] uppercase w-full flex justify-start items-center font-[eb] text-[12px] text-[#797979]">
        Related to Expense
      </div>
      <div className="w-full flex flex-col justify-start items-start rounded-xl overflow-hidden bg-[#1c1c1ead]">
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={SavingsIcon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction Label
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            Amazon Puja Shopping-Family
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
          </div>
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={ChartRoseIcon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction Amount
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
            30,000
          </div>
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={ChartRoseIcon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction ID
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
            30,000
          </div>
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={Wallet04Icon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction Date
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            <span className="text-[16px] mt-[2px] mr-[4px]">₹</span> 50,000
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
          </div>
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={MoneyBag01Icon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction Time
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
          </div>
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-between items-center h-[50px] active:bg-[#1C1C1E]">
          <div className="flex justify-start items-center">
            {/* <HugeiconsIcon
              icon={ChartRoseIcon}
              size={20}
              strokeWidth={1.7}
              className="mr-[10px]"
            /> */}
            Transaction ID
          </div>
          <div className="flex justify-end items-center text-[#797979]">
            {/* <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.7}
              className="ml-[5px]"
            /> */}
          </div>
        </div>
      </div>
      <div className="mt-[40px] pl-[15px] mb-[5px] uppercase w-full flex justify-start items-center font-[tnr] text-[16px] text-[#797979]">
        Other
      </div>
      <div className="w-full flex flex-col justify-start items-start rounded-xl overflow-hidden bg-[#1c1c1ead]">
        <div className="w-full px-[15px] flex justify-start items-center h-[50px] active:bg-[#1C1C1E] ">
          {/* <HugeiconsIcon
            icon={UserBlock01Icon}
            size={20}
            strokeWidth={1.7}
            className="mr-[10px]"
          /> */}
          Delete Account
        </div>
        <div className="w-[calc(100%-30px)] ml-[15px] border-t-[1px] border-[#1f1f21] "></div>
        <div className="w-full px-[15px] flex justify-start items-center h-[50px] text-[#FF6F6F] active:text-[#e73939] active:bg-[#1C1C1E]">
          {/* <HugeiconsIcon
            icon={Logout01Icon}
            size={20}
            strokeWidth={1.7}
            className="mr-[10px]"
          /> */}
          Log Out
        </div>
      </div>
    </div>
  );
}
