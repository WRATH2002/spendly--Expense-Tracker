import {
  Alert01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRight04Icon,
  Calendar01Icon,
  Calendar03Icon,
  Calendar04Icon,
  FilterVerticalIcon,
  TradeDownIcon,
  TradeUpIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useState } from "react";
import CountUp from "../animations/CountUp";
import { colorCode, monthName } from "../../utils/constants";
import {
  changeMonthIndex,
  getCategoryWiseCountWithInfoForTheMonth,
  getData,
  getMonthYearDetails,
  getPeriodWiseComparison,
  getTotalExpenseForTheMonth,
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

export default function ChartSection(props) {
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

  useEffect(() => {
    const tempData = getPeriodWiseComparison(
      props?.allTransactions,
      activeSearch,
      activeMonthly,
      activeQuarterly,
      activeYearly
    );
    setCurrDataInfo(tempData[0]);
    setPrevDataInfo(tempData[1]);
  }, [
    props?.allTransactions,
    activeSearch,
    activeMonthly,
    activeYearly,
    activeQuarterly,
  ]);

  function getColor(value) {
    if (value < 40) return "#7ED957"; // green color -> creamy
    else if (value < 75) return "#FFD766"; // yellow color -> creamy
    else if (value < 100) {
      return "#FF6F6F"; // red color -> creamy
    } // green
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center overflow-y-scroll bg-[#000000] p-[15px] text-[#D4D4D4] ">
      <div className="w-full flex flex-col justify-start items-start p-[10px]">
        {/* <div className="font-[ib] text-[24px]">Budget Info</div> */}
        <div className="w-full flex justify-between items-center mt-[0px] font-[tnr]  text-[16px] ">
          <div className="bg-[#151416] rounded-[10px] p-[2px] flex flex-col justify-start items-start ">
            <div className="flex justify-start items-center">
              {options?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={
                      "w-[80px] h-[30px] rounded-[8px] flex justify-center items-center z-[1]" +
                      (activeSearch == data
                        ? " text-[#D4D4D4]"
                        : " text-[#797979]")
                    }
                    onClick={() => {
                      setActiveSearch(data);
                    }}
                  >
                    {data}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-start items-center mt-[-30px]">
              <div
                className={
                  "w-[80px] h-[30px] rounded-[8px] flex justify-center items-center bg-[#29292c]" +
                  (activeSearch == "Monthly"
                    ? " ml-[0px]"
                    : activeSearch == "Quarterly"
                    ? " ml-[80px]"
                    : " ml-[160px]")
                }
                style={{ transition: ".3s" }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#151416] active:bg-[#29292c] border-[1px] border-[#1d1b1e] h-[34px] px-[10px] rounded-[10px]">
            <HugeiconsIcon
              icon={FilterVerticalIcon}
              size={16}
              strokeWidth={2}
              className="mr-[6px]"
            />
            Filter
          </div>
        </div>
        {/* ---- Month, year, quarter navigation */}
        <div className="flex justify-between items-center font-[ir] mb-[20px] mt-[30px] ">
          <div className="text-[#797979] text-[16px] flex justify-start items-center ">
            <div
              className="w-[20px] h-[20px] flex justify-center items-center rounded-lg border-[1.5px] border-[#2c2b2e] mr-[10px] active:bg-[#28272A] active:text-[white] cursor-pointer"
              onClick={() => {
                changeMonthIndex(
                  "previous",
                  activeMonthIndex,
                  activeYear,
                  setActiveMonthIndex,
                  setActiveYear
                );
                getMonthYearDetails(
                  activeSearch, // option means `Monthly` or `Quarterly` or `Yearly`
                  setActiveSearch, // function to change the data
                  "previous", // like it will go up or down; possible values , `Next` or `Previous`
                  activeMonthly,
                  setActiveMonthly,
                  activeQuarterly,
                  setActiveQuarterly,
                  activeYearly,
                  setActiveYearly
                );
              }}
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={14}
                strokeWidth={2.5}
                className=""
              />
            </div>
            {/* <span className="mr-[5px] text-[#D4D4D4] font-[isb]">
              {monthName[activeMonthIndex]?.short},
            </span>
            {activeYear} */}
            <div className="font-[gmm] text-[14px] flex justify-center items-center mt-[1px]">
              <HugeiconsIcon
                icon={Calendar04Icon}
                size={14}
                strokeWidth={2.2}
                className="mr-[5px] mb-[2px]"
              />
              {activeSearch == "Monthly" ? (
                <>{activeMonthly?.showRender}</>
              ) : activeSearch == "Quarterly" ? (
                <>{activeQuarterly?.showRender}</>
              ) : (
                <>{activeYearly?.showRender}</>
              )}
            </div>
            <div
              className={
                "w-[20px] h-[20px] justify-center items-center rounded-lg border-[1.5px] border-[#2c2b2e] ml-[10px] active:bg-[#28272A] active:text-[white] cursor-pointer" +
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
                getMonthYearDetails(
                  activeSearch, // option means `Monthly` or `Quarterly` or `Yearly`
                  setActiveSearch, // function to change the data
                  "next", // like it will go up or down; possible values , `Next` or `Previous`
                  activeMonthly,
                  setActiveMonthly,
                  activeQuarterly,
                  setActiveQuarterly,
                  activeYearly,
                  setActiveYearly
                );
              }}
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                strokeWidth={2.5}
                className=""
              />
            </div>
          </div>
        </div>
        {/* <div className="my-[100px] flex flex-col justify-start items-start">
          <div>{activeMonthly?.showRender}</div>
          <div>{activeQuarterly?.showRender}</div>
          <div>{activeYearly?.showRender}</div>
        </div> */}
        {/* ---- Expense and budget info */}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <div className="text-[#D4D4D4] text-[28px] font-[tnb] flex justify-start items-center ">
              <span className="mr-[10px] text-[24px] mt-[2.5px] font-[tnh]">
                ₹
              </span>
              <CountUp
                from={0}
                to={
                  Object.keys(currDataInfo).length > 0
                    ? (currDataInfo?.totalExpense).toString()
                    : 0
                }
                decimals={2}
                separator=","
                direction="up"
                duration={0.2}
                className="count-up-text  "
              />

              {/* {currDataInfo?.totalExpense} */}
              <div className="mx-[10px]">/</div>
              <div className="flex flex-col justify-center items-start">
                <div className="w-full h-[3px] rounded-full bg-[#28272A] flex justify-start items-center overflow-hidden mb-[2px] mt-[3px]">
                  <div
                    className=" h-full bg-[#7ED957] rounded-r-sm"
                    style={{
                      width: `${Math.round(
                        (currDataInfo?.totalExpense / 60000) * 100
                      )}%`,
                      backgroundColor: `${getColor(
                        Math.round((currDataInfo?.totalExpense / 60000) * 100)
                      )}`,
                      transition: ".3s",
                    }}
                  ></div>
                </div>
                <div className="text-[14px] text-[#797979]">60000</div>
              </div>
            </div>
            <div className="font-[tnm]  text-[16px] flex justify-start items-center">
              {prevDataInfo?.totalExpense - currDataInfo?.totalExpense > 0 ? (
                <div className="flex justify-start items-center text-[#7ED957]">
                  <HugeiconsIcon
                    icon={TradeDownIcon}
                    size={16}
                    strokeWidth={1.6}
                    className="mr-[3px]"
                  />{" "}
                  {prevDataInfo?.totalExpense == 0 ? (
                    <>
                      {(
                        ((prevDataInfo?.totalExpense -
                          currDataInfo?.totalExpense) /
                          1) *
                        100
                      ).toFixed(1)}
                      %
                    </>
                  ) : (
                    <>
                      {(
                        ((prevDataInfo?.totalExpense -
                          currDataInfo?.totalExpense) /
                          prevDataInfo?.totalExpense) *
                        100
                      ).toFixed(1)}
                      % less expense
                    </>
                  )}
                </div>
              ) : (
                <>
                  {prevDataInfo?.totalExpense == 0 ? (
                    <div className="flex justify-start items-center text-[#f9a238]">
                      <HugeiconsIcon
                        icon={Alert01Icon}
                        size={16}
                        strokeWidth={1.6}
                        className="mr-[7px]"
                      />{" "}
                      No previous data
                    </div>
                  ) : (
                    <div className="flex justify-start items-center text-[#FF6F6F]">
                      <HugeiconsIcon
                        icon={TradeUpIcon}
                        size={16}
                        strokeWidth={1.6}
                        className="mr-[7px]"
                      />{" "}
                      {(
                        ((currDataInfo?.totalExpense -
                          prevDataInfo?.totalExpense) /
                          prevDataInfo?.totalExpense) *
                        100
                      ).toFixed(1)}
                      % more expense
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* ---- Category wise distribution in progress bar style */}
        <div className="w-full flex justify-start items-center mt-[20px] h-[6px]">
          {Object?.keys(currDataInfo).length > 0 ? (
            <>
              {Object.entries(currDataInfo?.expenseDistribution[0])?.map(
                ([key, value], index, arr) => {
                  return (
                    <>
                      <div
                        key={index + "01"}
                        className={
                          "min-w-[2px] h-full" +
                          (index > 0 ? " flex" : " hidden")
                        }
                        style={{ transition: ".3s" }}
                      ></div>

                      <div
                        onMouseEnter={() => {
                          setHoveredCategory(value?.categoryName);
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
                          width: `${value?.categoryPercentage}%`,
                          transition: ".3s",
                        }}
                      >
                        <div
                          key={index + "02"}
                          className={
                            " h-full w-full" +
                            (index == 0
                              ? " rounded-l-[4px] rounded-r-[2px]"
                              : index == arr?.length - 1
                              ? " rounded-r-[4px] rounded-l-[2px]"
                              : " rounded-[2px]")
                          }
                          style={{
                            backgroundColor:
                              hoveredCategory === value?.categoryName
                                ? `${colorCode[index]?.primary}`
                                : hoveredCategory.length > 0
                                ? `${colorCode[index]?.secondary}`
                                : `${colorCode[index]?.primary}`,
                            transition: ".3s",
                          }}
                        ></div>
                      </div>
                    </>
                  );
                }
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        {/* ---- Color wise category name show */}
        <div className="w-full flex flex-wrap justify-start items-start mt-[30px]  ">
          {Object?.keys(currDataInfo).length > 0 ? (
            <>
              {Object.entries(currDataInfo?.expenseDistribution[0])?.map(
                ([key, value], index, arr) => {
                  return (
                    <div
                      onMouseEnter={() => {
                        setHoveredCategory(value?.categoryName);
                      }}
                      onMouseLeave={() => {
                        setHoveredCategory("");
                      }}
                      key={index}
                      className={
                        ` flex justify-between select-none items-center h-[20px] w-[50%]  pl-[6px] rounded-l-full bg-gradient-to-r from-[${colorCode[index]?.secondary}] to-transparent` +
                        (index > 1 ? " mt-[10px]" : " mt-[0px]") +
                        (hoveredCategory === value?.categoryName
                          ? " text-[#D4D4D4] opacity-100 "
                          : hoveredCategory.length > 0
                          ? " text-[#D4D4D4] opacity-30"
                          : " text-[#D4D4D4] opacity-100")
                      }
                      style={{
                        transition: ".15s",
                        background:
                          hoveredCategory === value?.categoryName
                            ? `linear-gradient(270deg, transparent 50%, ${colorCode[index]?.secondary} 100%)`
                            : "transparent",
                      }}
                    >
                      <div className="flex justify-start items-center">
                        <div
                          className="w-[8px] aspect-square rounded-full mr-[10px]"
                          style={{
                            backgroundColor:
                              hoveredCategory === value?.categoryName
                                ? `${colorCode[index]?.primary}`
                                : hoveredCategory.length > 0
                                ? `${colorCode[index]?.secondary}`
                                : `${colorCode[index]?.primary}`,
                            transition: ".15s",
                          }}
                        ></div>
                        <div className="font-[tnr] text-[18px]" style={{}}>
                          {value?.categoryName?.charAt(0)?.toUpperCase() +
                            value?.categoryName?.slice(1)}
                        </div>
                        <HugeiconsIcon
                          icon={ArrowRight04Icon}
                          size={12}
                          strokeWidth={2}
                          fill="currentColor"
                          className={
                            "mx-[6px]" +
                            (hoveredCategory == value?.categoryName
                              ? " opacity-100"
                              : " opacity-0")
                          }
                          style={{
                            transition: ".3s",
                            color: `${colorCode[index]?.primary}`,
                          }}
                        />
                        <div
                          className={
                            "font-[ib] text-[10px] bg-[#45454500] py-[2px] rounded-md flex justify-start items-center" +
                            (hoveredCategory == value?.categoryName
                              ? " opacity-100"
                              : " opacity-0")
                          }
                          style={{
                            transition: ".3s",
                            color: `${colorCode[index]?.primary}`,
                          }}
                        >
                          {Math?.round(value?.categoryPercentage)}%
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </>
          ) : (
            <></>
          )}
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
  );
}
