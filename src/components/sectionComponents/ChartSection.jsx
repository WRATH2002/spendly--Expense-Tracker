import {
  Alert01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRight04Icon,
  BankIcon,
  Calendar01Icon,
  Calendar03Icon,
  Calendar04Icon,
  CircleIcon,
  FilterVerticalIcon,
  TradeDownIcon,
  TradeUpIcon,
  Wallet02Icon,
  Wallet05Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useState } from "react";
import CountUp from "../animations/CountUp";
import { colorCode, monthName } from "../../utils/constants";
import {
  changeMonthIndex,
  formatAmount,
  getBankWiseInfo,
  getCategoryWiseCountWithInfoForTheMonth,
  getData,
  getMonthYearDetails,
  getPeriodWiseComparison,
  getThisMonthExpense,
  getTotalExpenseForTheMonth,
  groupAndSortTransactions,
} from "../../utils/functions";
import { hover } from "framer-motion";
import { AnimatedNumber } from "../animations/AnimatedNumber";
import TransactionChart from "../TransactionChart";

const options = ["Monthly", "Quarterly", "Yearly"];

const sampleTransactions = [
  {
    transactionName: "Grocery Store",
    transactionID: "TXN001",
    transactionDate: "2024-01-15",
    transactionMode: "Card",
    transactionType: "Debit",
    transactionBillURL: "receipt1.jpg",
    transactionAmount: 85.5,
    transactionCategory: "Food",
  },
  {
    transactionName: "Gas Station",
    transactionID: "TXN002",
    transactionDate: "2024-01-16",
    transactionMode: "Card",
    transactionType: "Debit",
    transactionBillURL: "receipt2.jpg",
    transactionAmount: 45.75,
    transactionCategory: "Transportation",
  },
  {
    transactionName: "Coffee Shop",
    transactionID: "TXN003",
    transactionDate: "2024-01-18",
    transactionMode: "Card",
    transactionType: "Debit",
    transactionBillURL: "receipt3.jpg",
    transactionAmount: 12.25,
    transactionCategory: "Food",
  },
];

export default function ChartSection({ allTransactions, allBanksInfo }) {
  const [activeQuarterly, setActiveQuarterly] = useState({
    monthsIndex: getData(new Date().getMonth())?.monthsIndex, // as index number, need to add +1 for actual month number
    showRender: `${
      getData(new Date().getMonth())?.showRender
    }${new Date().getFullYear()}`, // will be rendered on the website screen
    quarterId: getData(new Date().getMonth())?.quarterId, // quarter id out of 4 -> 0,1,2,3
    year: new Date().getFullYear(),
  });
  const [activeYearly, setActiveYearly] = useState({
    year: new Date().getFullYear(), // year to perform operation based on that
    showRender: `${new Date().getFullYear()}`, // will be rendered on the website screen
  });
  const [activeMonthly, setActiveMonthly] = useState({
    monthId: new Date().getMonth(),
    year: new Date().getFullYear(),
    showRender: `${
      monthName[new Date().getMonth()]?.full
    }, ${new Date().getFullYear()}`,
  });
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    parseInt(new Date().getMonth())
  );
  const [activeYear, setActiveYear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState("Monthly");
  const [currDataInfo, setCurrDataInfo] = useState({});
  const [prevDataInfo, setPrevDataInfo] = useState({});

  // useEffect(() => {
  //   const tempData = getPeriodWiseComparison(
  //     props?.allTransactions,
  //     activeSearch,
  //     activeMonthly,
  //     activeQuarterly,
  //     activeYearly
  //   );
  //   setCurrDataInfo(tempData[0]);
  //   setPrevDataInfo(tempData[1]);
  // }, [
  //   props?.allTransactions,
  //   activeSearch,
  //   activeMonthly,
  //   activeYearly,
  //   activeQuarterly,
  // ]);

  function getColor(value) {
    if (value < 40) return "#7ED957"; // green color -> creamy
    else if (value < 75) return "#FFD766"; // yellow color -> creamy
    else if (value < 100) {
      return "#FF6F6F"; // red color -> creamy
    } // green
  }

  function getQuickInfoForBank(bankCode) {}

  function getBankFullDetailsWithInfo(transactions, bankFullInfoWithDetails) {
    let bankDataArr = bankFullInfoWithDetails?.bankDataArr;
    let bankDataObj = bankFullInfoWithDetails?.bankDataObj;
    let activeBankCode = bankFullInfoWithDetails?.activeBankCode;

    // let tempStructure = [
    //   {
    //     bankInfo: {
    //       bankName: "",
    //       bankCode: "",
    //       isActive: false,
    //       isPrimary: false,
    //     },
    //     quickInfo: {
    //       thisMonthExpense: 0,
    //       prevMonthExpense: 0,
    //       conclusion: "",
    //     },
    //     fullInfo: {
    //       totalIncome: 0,
    //       totalExpense: 0,
    //       totalExpenseExceptInternalTransfer: 0,
    //       totalInternalTransfer: 0,
    //       internalTransferMap: [
    //         {
    //           toBankName: "",
    //           toBankCode: "",
    //           totalTransfered: 0,
    //           totalRecieved: 0,
    //         },
    //       ],
    //     },
    //     thisMonthInfo: {
    //       totalIncome: 0,
    //       totalExpense: 0,
    //       totalExpenseExceptInternalTransfer: 0,
    //       totalInternalTransfer: 0,
    //       internalTransferMap: [
    //         {
    //           toBankName: "",
    //           toBankCode: "",
    //           totalTransfered: 0,
    //           totalRecieved: 0,
    //         },
    //       ],
    //     },
    //     prevMonthInfo: {
    //       totalIncome: 0,
    //       totalExpense: 0,
    //       totalExpenseExceptInternalTransfer: 0,
    //       totalInternalTransfer: 0,
    //       internalTransferMap: [
    //         {
    //           toBankName: "",
    //           toBankCode: "",
    //           totalTransfered: 0,
    //           totalRecieved: 0,
    //         },
    //       ],
    //     },
    //   },
    // ];

    let banksInsertedArr = {};
    let bankInfoObjArr = [];
    let bankInfoObj = {
      // ---- this part done
      bankName: "",
      bankCode: "",
      isActive: false,
      isPrimary: false,
      type: "",
    };

    bankDataArr?.forEach((data) => {
      bankInfoObj = {
        bankName: data?.bankName,
        bankCode: data?.code,
        isActive: !data?.deleteFlag,
        isPrimary: activeBankCode == data?.code,
        type: data?.type,
      };
      bankInfoObjArr?.push({ bankInfo: bankInfoObj });
      banksInsertedArr[data?.code] = {
        index: bankInfoObjArr?.length,
      };
    });
    // console.log(banksInsertedArr, bankInfoObjArr);

    // let bankQuickInfoObjArr = [];
    let bankQuickInfoObj = {
      thisMonthExpense: 0,
      prevMonthExpense: 0,
      conclusion: "",
    };

    bankInfoObjArr?.forEach((data, index) => {
      // console.log(
      //   `${data?.bankInfo?.bankCode}`,
      //   getThisMonthExpense(transactions, data?.bankInfo?.bankCode)
      // );
      bankInfoObjArr[index] = {
        ...data,
        quickInfo: getThisMonthExpense(transactions, data?.bankInfo?.bankCode),
      };
    });
    console.log(bankInfoObjArr);

    // let bankFullInfoWithDetailObjArr = [];
    let bankFullInfoWithDetailObj = {
      totalIncome: 0,
      totalExpense: 0,
      totalExpenseExceptInternalTransfer: 0,
      totalInternalTransfer: 0,
      internalTransferMap: [],
    };
    let internalTransferMapObjArr = [];
    let internalTransferMapObjj = {
      toBankName: "",
      toBankCode: "",
      totalTransfered: 0,
      totalRecieved: 0,
    };

    console.log(
      "SDF",
      getBankWiseInfo(allTransactions, "2025-12-01", "2025-12-31")
    );

    return {
      banks: bankInfoObjArr?.filter((data) => data?.bankInfo?.type == "Bank"),
      wallets: bankInfoObjArr?.filter(
        (data) => data?.bankInfo?.type == "Wallet"
      ),
    };
  }

  return (
    <>
      <div class="absolute inset-0 noise pointer-events-none"></div>
      <div className="grad rounded-t-full blur-[200px] w-full h-[200px] fixed left-0 bottom-[0px] -z-[0]"></div>
      <div className="w-full h-full flex flex-col justify-start items-center overflow-y-scroll bg-[#00000000] p-[15px] text-[#D4D4D4] font-[geist] z-0 ">
        <div className="w-full flex flex-col justify-start items-start p-[10px]">
          <div className="w-full flex flex-col justify-start items-start bg-[#ffffff12] rounded-xl p-[15px] px-[20px] font-[geist]">
            <div className="w-full flex justify-between items-center text-[12px] text-[#606060]">
              <div className="font-[500]">My Banks</div>
              {/* <div>See All</div> */}
            </div>
            <div className="w-full border-t border-[#202020] my-[15px]"></div>

            {getBankFullDetailsWithInfo(
              groupAndSortTransactions(allTransactions),
              allBanksInfo
            )?.banks?.map((data, index) => {
              return (
                <>
                  <div
                    className={
                      "w-full border-t border-[#202020] my-[15px]" +
                      (index != 0 ? " visible" : " hidden")
                    }
                  ></div>
                  <div
                    className="w-full flex justify-start items-start"
                    key={index}
                  >
                    <div className="min-w-[40px] h-[40px] mr-[20px] rounded-md flex justify-center items-center bg-[#ffffff12] text-[#999999] mt-[4px] ">
                      <HugeiconsIcon
                        icon={BankIcon}
                        size={18}
                        strokeWidth={2}
                        className=""
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start ">
                      <div className="font-[600]">
                        {data?.bankInfo?.bankName}
                      </div>
                      <div className="text-[12px] text-[#676767] mt-[5px]">
                        This month expense
                      </div>
                      <div className="w-full flex justify-start items-center text-[14px] text-[#a8a8a8] font-[500] ">
                        <span className="mr-[5px]">₹</span>
                        {formatAmount(data?.quickInfo?.thisMonth)}
                      </div>
                      <div
                        className={
                          "px-[6px] py-[1px] rounded-md bg-[#69e90013] border border-[#69e90006] text-[#5ddd02c5] text-[10px] mt-[10px] flex justify-center items-center" +
                          (data?.bankInfo?.isPrimary ? " visible" : " hidden")
                        }
                      >
                        {/* <HugeiconsIcon
                          icon={CircleIcon}
                          size={5}
                          strokeWidth={1}
                          fill="currentColor"
                          className="mr-[5px]"
                        />{" "} */}
                        <span class="relative flex h-[5px] w-[5px] mr-[5px]">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ddd02c5] opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-[5px] w-[5px] bg-[#5ddd02c5]"></span>
                        </span>
                        Primary
                      </div>
                    </div>
                    <div className="mt-auto mb-auto">
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={18}
                        strokeWidth={2}
                        className=""
                      />
                    </div>
                  </div>
                </>
              );
            })}
            {/* <div className="w-full flex justify-start items-start">
              <div></div>
              <div className="w-full flex flex-col justify-start items-start ">
                <div className="font-[600]">HDFC Bank</div>
                <div className="text-[10px] text-[#676767] mt-[5px]">
                  This month expense
                </div>
                <div className="w-full flex justify-start items-center text-[12px] text-[#7e7e7e] font-[600] ">
                  <span className="mr-[5px]">₹</span>38,435.56
                </div>
                <div className="px-[8px] py-[2px] rounded-lg bg-[#69e9001f] border border-[#69e90011] text-[#5ddd02c5] text-[10px] mt-[10px]">
                  Primary
                </div>
              </div>
              <div></div>
            </div>
            <div className="w-full border-t border-[#202020] my-[15px]"></div>
            <div className="w-full flex justify-start items-start">
              <div></div>
              <div className="w-full flex flex-col justify-start items-start ">
                <div className="font-[600]">KOTAK MAHINDRA Bank</div>
                <div className="text-[10px] text-[#676767] mt-[5px]">
                  This month expense
                </div>
                <div className="w-full flex justify-start items-center text-[12px] text-[#7e7e7e] font-[600] ">
                  <span className="mr-[5px]">₹</span>12,395.56
                </div>
               
              </div>
              <div></div>
            </div> */}
          </div>
          <div className="w-full flex flex-col justify-start items-start bg-[#ffffff12] rounded-xl p-[15px] px-[20px] font-[geist] mt-[20px]">
            <div className="w-full flex justify-between items-center text-[12px] text-[#606060]">
              <div className="font-[500]">My Wallets</div>
              {/* <div>See All</div> */}
            </div>
            <div className="w-full border-t border-[#202020] my-[15px]"></div>

            {getBankFullDetailsWithInfo(
              groupAndSortTransactions(allTransactions),
              allBanksInfo
            )?.wallets?.map((data, index) => {
              return (
                <>
                  <div
                    className={
                      "w-full border-t border-[#202020] my-[15px]" +
                      (index != 0 ? " visible" : " hidden")
                    }
                  ></div>
                  <div
                    className="w-full flex justify-start items-start"
                    key={index}
                  >
                    <div className="min-w-[40px] h-[40px] mr-[20px] rounded-md flex justify-center items-center bg-[#ffffff12] text-[#999999] mt-[4px] ">
                      <HugeiconsIcon
                        icon={Wallet05Icon}
                        size={18}
                        strokeWidth={2}
                        className=""
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start ">
                      <div className="font-[600]">
                        {data?.bankInfo?.bankName}
                      </div>
                      <div className="text-[12px] text-[#676767] mt-[5px]">
                        This month expense
                      </div>
                      <div className="w-full flex justify-start items-center text-[14px] text-[#a8a8a8] font-[500] ">
                        <span className="mr-[5px]">₹</span>
                        {formatAmount(data?.quickInfo?.thisMonth)}
                      </div>
                      <div
                        className={
                          "px-[6px] py-[1px] rounded-md bg-[#69e90013] border border-[#69e90006] text-[#5ddd02c5] text-[10px] mt-[10px] flex justify-center items-center" +
                          (data?.bankInfo?.isPrimary ? " visible" : " hidden")
                        }
                      >
                        {/* <HugeiconsIcon
                          icon={CircleIcon}
                          size={5}
                          strokeWidth={1}
                          fill="currentColor"
                          className="mr-[5px]"
                        />{" "} */}
                        <span class="relative flex h-[5px] w-[5px] mr-[5px]">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ddd02c5] opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-[5px] w-[5px] bg-[#5ddd02c5]"></span>
                        </span>
                        Primary
                      </div>
                    </div>
                    <div className="mt-auto mb-auto">
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={18}
                        strokeWidth={2}
                        className=""
                      />
                    </div>
                  </div>
                </>
              );
            })}
            {/* <div className="w-full flex justify-start items-start">
              <div></div>
              <div className="w-full flex flex-col justify-start items-start ">
                <div className="font-[600]">HDFC Bank</div>
                <div className="text-[10px] text-[#676767] mt-[5px]">
                  This month expense
                </div>
                <div className="w-full flex justify-start items-center text-[12px] text-[#7e7e7e] font-[600] ">
                  <span className="mr-[5px]">₹</span>38,435.56
                </div>
                <div className="px-[8px] py-[2px] rounded-lg bg-[#69e9001f] border border-[#69e90011] text-[#5ddd02c5] text-[10px] mt-[10px]">
                  Primary
                </div>
              </div>
              <div></div>
            </div>
            <div className="w-full border-t border-[#202020] my-[15px]"></div>
            <div className="w-full flex justify-start items-start">
              <div></div>
              <div className="w-full flex flex-col justify-start items-start ">
                <div className="font-[600]">KOTAK MAHINDRA Bank</div>
                <div className="text-[10px] text-[#676767] mt-[5px]">
                  This month expense
                </div>
                <div className="w-full flex justify-start items-center text-[12px] text-[#7e7e7e] font-[600] ">
                  <span className="mr-[5px]">₹</span>12,395.56
                </div>
               
              </div>
              <div></div>
            </div> */}
          </div>

          {/* <TransactionChart transactions={sampleTransactions} /> */}

          {/* <div className="w-[calc(100%+50px)] ml-[-25px] flex justify-between items-center font-[im] h-[40px] my-[20px] text-[14px] bg-[repeating-linear-gradient(-45deg,#202020_0_1px,transparent_2px_5px)]"></div> */}
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center font-[ieb] text-[30px] bg-[#1C1C1E] rounded-3xl p-[25px] mb-[10px]"></div> */}
        {/* <div className="w-full flex flex-col justify-center items-center font-[ieb] text-[30px] bg-[#1C1C1E] rounded-3xl p-[25px] mb-[10px] mt-[50px]">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="flex justify-between items-center font-[ir] mb-[20px]">
            <div className="text-[#797979] text-[16px] flex justify-start items-center ">
              <div
                className="w-[26px] h-[26px] flex justify-center items-center rounded-lg border-[1.5px] border-[#2c2b2e] mr-[10px] bg-[#28272A] hover:text-[white] cursor-pointer"
                onClick={() => {
                  changeMonthIndex(
                    "previous",
                    activeMonthIndex,
                    activeYear,
                    setActiveMonthIndex,
                    setActiveYear
                  );
                }}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={18}
                  strokeWidth={2.5}
                  className=""
                />
              </div>
              <span className="mr-[10px] text-[#D4D4D4] uppercase font-[isb]">
                {monthName[activeMonthIndex]?.full},
              </span>
              {activeYear}
              <div
                className={
                  "w-[26px] h-[26px] justify-center items-center rounded-lg border-[1.5px] border-[#2c2b2e] ml-[10px] bg-[#28272A] hover:text-[white] cursor-pointer" +
                  (activeMonthIndex === parseInt(new Date().getMonth()) &&
                  activeYear === parseInt(new Date().getFullYear())
                    ? " hidden"
                    : " flex")
                }
                onClick={() => {
                  changeMonthIndex(
                    "next",
                    activeMonthIndex,
                    activeYear,
                    setActiveMonthIndex,
                    setActiveYear
                  );
                }}
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={2.5}
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col justify-start items-end">
              <div className="text-[#D4D4D4] text-[34px] font-[ieb] flex justify-start items-center ">
                <span className="mr-[10px]">₹</span>
                <CountUp
                  from={0}
                  to={getTotalExpenseForTheMonth(
                    props.allTransactions,
                    activeMonthIndex,
                    activeYear
                  )}
                  // to={12000.34}
                  decimals={2}
                  separator=","
                  direction="up"
                  duration={0.2}
                  className="count-up-text"
                />

              </div>
              <div className="font-[im] text-[#7ED957] text-[12px]">
                +32841.34
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center mt-[20px] h-[8px]">
            {Object.entries(
              getCategoryWiseCountWithInfoForTheMonth(
                props?.allTransactions,
                activeMonthIndex,
                activeYear
              )
            ).map(([key, value], index, arr) => {
              return (
                <>
                  <div
                    key={index + "01"}
                    className={
                      "min-w-[2px] h-full" + (index > 0 ? " flex" : " hidden")
                    }
                    style={{ transition: ".3s" }}
                  ></div>
                  <div
                    onMouseEnter={() => {
                      setHoveredCategory(key);
                    }}
                    onMouseLeave={() => {
                      setHoveredCategory("");
                    }}
                    key={index + "02"}
                    className={
                      " h-full " +
                      (index == 0
                        ? " rounded-l-[4px] rounded-r-[2px]"
                        : index == arr?.length - 1
                        ? " rounded-r-[4px] rounded-l-[2px]"
                        : " rounded-[2px]")
                    }
                    style={{
                      backgroundColor:
                        hoveredCategory === key
                          ? `${colorCode[index]?.primary}`
                          : hoveredCategory.length > 0
                          ? `${colorCode[index]?.secondary}`
                          : `${colorCode[index]?.primary}`,
                      border:
                        hoveredCategory === key
                          ? "1px solid white"
                          : hoveredCategory.length > 0
                          ? "1px solid transparent"
                          : "1px solid transparent",
                      width: `${value?.percentage}%`,
                    }}
                  ></div>
                  <div
                    onMouseEnter={() => {
                      setHoveredCategory(key);
                    }}
                    onMouseLeave={() => {
                      setHoveredCategory("");
                    }}
                    key={index + "02"}
                    className={
                      " h-full flex justify-center items-center  " +
                      (index == 0
                        ? " rounded-l-[4px] rounded-r-[2px]"
                        : index == arr?.length - 1
                        ? " rounded-r-[4px] rounded-l-[2px]"
                        : " rounded-[2px]")
                    }
                    style={{
                      border:
                        hoveredCategory === key
                          ? `1.5px solid ${colorCode[index]?.primary}`
                          : hoveredCategory.length > 0
                          ? "0px solid transparent"
                          : "0px solid transparent",
                      width: `${value?.percentage}%`,
                      padding: hoveredCategory === key ? "1.5px" : "0px",
                      // transition: ".15s",
                    }}
                  >
                    <div
                      onMouseEnter={() => {
                        setHoveredCategory(key);
                      }}
                      onMouseLeave={() => {
                        setHoveredCategory("");
                      }}
                      key={index + "02"}
                      className={
                        " h-full w-full" +
                        (index == 0
                          ? hoveredCategory == key
                            ? " rounded-l-[2px] rounded-r-[1px]"
                            : " rounded-l-[4px] rounded-r-[2px]"
                          : index == arr?.length - 1
                          ? hoveredCategory == key
                            ? " rounded-r-[2px] rounded-l-[1px]"
                            : " rounded-r-[4px] rounded-l-[2px]"
                          : hoveredCategory == key
                          ? " rounded-[1px]"
                          : " rounded-[2px]")
                      }
                      style={{
                        backgroundColor:
                          hoveredCategory === key
                            ? `${colorCode[index]?.primary}`
                            : hoveredCategory.length > 0
                            ? `${colorCode[index]?.secondary}`
                            : `${colorCode[index]?.primary}`,
                        transition: ".15s",
                      }}
                    ></div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="w-full flex flex-wrap justify-start items-start mt-[30px] ">
            {Object.entries(
              getCategoryWiseCountWithInfoForTheMonth(
                props?.allTransactions,
                activeMonthIndex,
                activeYear
              )
            ).map(([key, value], index, arr) => {
              return (
                <div
                  key={index}
                  className={
                    " flex justify-between items-center h-[20px] w-[50%]" +
                    (index > 0 ? " mt-[10px]" : " mt-[0px]") +
                    (hoveredCategory === key
                      ? " text-[#D4D4D4] opacity-100 "
                      : hoveredCategory.length > 0
                      ? " text-[#D4D4D4] opacity-30"
                      : " text-[#D4D4D4] opacity-100")
                  }
                  style={{ transition: ".15s" }}
                >
                  <div className="flex justify-start items-center">
                    <div
                      className="w-[8px] aspect-square rounded-full mr-[10px]"
                      style={{
                        backgroundColor:
                          hoveredCategory === key
                            ? `${colorCode[index]?.primary}`
                            : hoveredCategory.length > 0
                            ? `${colorCode[index]?.secondary}`
                            : `${colorCode[index]?.primary}`,
                        transition: ".15s",
                      }}
                    ></div>
                    <div className="font-[isb] text-[14px]" style={{}}>
                      {key?.charAt(0)?.toUpperCase() + key?.slice(1)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full my-[20px] border-t-[1.5px] border-[#28272A]"></div>

          <div className="w-full flex flex-col justify-start items-start mt-[20px]">
            <div className=""></div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}
