import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar04Icon,
  CircleArrowDown01Icon,
  CircleArrowDown02Icon,
  FilterVerticalIcon,
  Search01Icon,
  TradeUpIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { act, useEffect, useState } from "react";

// --------------- Firebase related imports
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "../../firebase";

// --------------- React Router DOM related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  changeMonthIndex,
  formatNumberWithCommasAndTwoDigits,
  formatNumberWithOnlyTwoDigits,
  getCategoryWiseCountWithInfoForTheMonth,
  getData,
  getExpensesForTheMonth,
  getMonthYearDetails,
  getPeriodWiseComparison,
  getTopCategoryForTheMonth,
  getTotalExpenseForTheMonth,
} from "../../utils/functions";
import { colorCode, creamyCoolColors, monthName } from "../../utils/constants";
import TransactionBlock from "../TransactionBlock";
import CountUp from "../animations/CountUp";
import ShowTransactionInfo from "../ShowTransactionInfo";

const getColor = (value) => {
  if (value < 45) return "#7ED957"; // green color -> creamy
  else if (value < 75) return "#FFD766"; // yellow color -> creamy
  else {
    return "#FF6F6F"; // red color -> creamy
  } // green
};

export default function HomeSection(props) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [categoryToMapping, setCategoryToMapping] = useState([]);

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
  const [currDataInfo, setCurrDataInfo] = useState({});
  const [prevDataInfo, setPrevDataInfo] = useState({});
  const [activeSearch, setActiveSearch] = useState("Monthly");

  // const color = getColor(
  //   (getTotalExpenseForTheMonth(
  //     props.allTransactions,
  //     activeMonthIndex,
  //     activeYear
  //   ) /
  //     budget) *
  //     100
  // );
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    parseInt(new Date().getMonth())
  );
  const [activeYear, setActiveYear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [showSearch, setShowSearch] = useState(false);
  const [budget, setBudget] = useState(30000);
  const [showAllDistribution, setShowAllDistribution] = useState(false);

  const navigate = useNavigate();

  // ------------ Function to navigate to desire path
  function navigateToPage(path) {
    navigate(`${path}`);
  }

  // --------- Checking if User is logged in and performing task based on that state
  useEffect(() => {
    const authUserLoginState = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAllTransactions();
      } else {
        navigateToPage(`/user/login`);
      }
    });

    return () => authUserLoginState();
  }, [activeMonthIndex]);

  // ---------- Function to get AllTransactions from Firestore Database
  function fetchAllTransactions() {
    const user = firebase.auth().currentUser;

    const transactionsRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("AllTransactionsSpace")
      .doc("AllTransactions");

    const categoryMappingRef = db
      .collection("userSpace")
      .doc(user?.uid)
      ?.collection("CategoryToIcon")
      .doc("CategoryToIcon");

    onSnapshot(transactionsRef, (snapshot) => {
      console.log(
        "Fetched %cTransactions%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      console.table(snapshot?.data()?.AllTransactions);
      setAllTransactions(snapshot?.data()?.AllTransactions);
    });

    onSnapshot(categoryMappingRef, (snapshot) => {
      console.log(
        "Fetched %cCategory To Icon Mapping%c Info =>",
        "color: #1caee8; font-weight: bold;",
        "color: #ffffff;"
      );
      console.log(snapshot?.data()?.categoryToIconMappingInfo);
      setCategoryToMapping(snapshot?.data()?.categoryToIconMappingInfo);
    });
  }

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

  useEffect(() => {
    getCategoryWiseCountWithInfoForTheMonth(
      allTransactions,
      activeMonthIndex,
      activeYear
    );
  }, [activeMonthIndex]);
  return (
    <div className="w-full h-full flex flex-col justify-start items-center overflow-y-scroll bg-[#000000] p-[25px] text-[#D4D4D4] ">
      {/* <ShowTransactionInfo /> */}
      {/* <div className="w-full min-h-[30px] bg-[#0e0e0e] rounded-xl bg-[repeating-linear-gradient(-45deg,#191919_0_1px,transparent_2px_4px)]"></div> */}
      <div className="w-full flex flex-col justify-center items-center font-[ieb] text-[30px] mb-[10px]">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="flex justify-between items-center font-[ir] mb-[20px]">
            <div className="text-[#797979] text-[14px] font-[ib] flex justify-start items-center ">
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
              <div className="font-[gmm] text-[14px] flex justify-center items-center mt-[1px]">
                <HugeiconsIcon
                  icon={Calendar04Icon}
                  size={14}
                  strokeWidth={2.2}
                  className="mr-[5px] mb-[2px]"
                />
                {monthName[activeMonthIndex]?.full},{activeYear}
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
          <div className="w-full flex justify-between items-center">
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
            </div>
            <div className="max-h-[30px] aspect-square rounded-full font-[ieb] ">
              <CircularProgressbar
                value={
                  (getTotalExpenseForTheMonth(
                    props.allTransactions,
                    activeMonthIndex,
                    activeYear
                  ) /
                    budget) *
                  100
                }
                text={
                  Math.round(
                    (getTotalExpenseForTheMonth(
                      props.allTransactions,
                      activeMonthIndex,
                      activeYear
                    ) /
                      budget) *
                      100
                  ) < 100
                    ? `${Math.round(
                        (getTotalExpenseForTheMonth(
                          props.allTransactions,
                          activeMonthIndex,
                          activeYear
                        ) /
                          budget) *
                          100
                      )}%`
                    : "100%"
                }
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: getColor(
                    (getTotalExpenseForTheMonth(
                      props.allTransactions,
                      activeMonthIndex,
                      activeYear
                    ) /
                      budget) *
                      100
                  ),
                  textColor: getColor(
                    (getTotalExpenseForTheMonth(
                      props.allTransactions,
                      activeMonthIndex,
                      activeYear
                    ) /
                      budget) *
                      100
                  ),
                  trailColor: "#28272A",
                  textSize: "20px",
                })}
              />
            </div>
          </div>

          <div className="w-full flex justify-start items-center my-[20px] h-[6px]">
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
                          // onMouseEnter={() => {
                          //   setHoveredCategory(value?.categoryName);
                          // }}
                          // onMouseLeave={() => {
                          //   setHoveredCategory("");
                          // }}
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
                                // hoveredCategory === value?.categoryName
                                //   ? `${colorCode[index]?.primary}`
                                //   : hoveredCategory.length > 0
                                //   ? `${colorCode[index]?.secondary}`
                                //   :
                                `${colorCode[index]?.primary}`,
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
          <div className="w-full flex justify-start items-start">
            <div className="text-[#D4D4D4] text-[34px] flex flex-col justify-start items-start ">
              <div className="text-[14px] text-[#797979] font-[ir]">
                Transactions
              </div>
              <div className="text-[14px] font-[isb] mt-[7px] flex justify-start items-center">
                {
                  getExpensesForTheMonth(
                    props.allTransactions,
                    activeMonthIndex,
                    activeYear
                  ).length
                }{" "}
                <div className="flex justify-start items-center  text-[#7ED957] font-[im] text-[10px] ml-[10px]">
                  <HugeiconsIcon
                    icon={TradeUpIcon}
                    size={16}
                    strokeWidth={1.6}
                    className="mr-[3px]"
                  />
                  23%
                </div>
              </div>
            </div>
            <div className="text-[#D4D4D4] text-[34px] flex flex-col justify-start items-start ml-[30px] ">
              <div className="text-[14px] text-[#797979] font-[ir]">
                Top Category
              </div>
              <div className="text-[14px] font-[isb] mt-[7px]">
                {getTopCategoryForTheMonth(
                  getExpensesForTheMonth(
                    props.allTransactions,
                    activeMonthIndex,
                    activeYear
                  ),
                  activeMonthIndex,
                  activeYear
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[50px] w-full bg-gradient-to-b from-[#000000] to-transparent z-[1] mb-[-50px] backdrop-blur-[8px] flex justify-end items-center mt-[0px] text-[#797979]">
        <input
          className={
            "outline-none text-[14px] h-[40px] mr-[-35px] rounded-3xl bg-[#1C1C1E] px-[15px] font-[im] transition-all duration-300 ease-in-out " +
            (showSearch
              ? "opacity-100 w-[calc(100%-40px)] "
              : "opacity-0 w-[calc(0px)] ")
          }
          placeholder="Search here ..."
        ></input>
        <div
          className="w-[35px] aspect-square flex justify-center items-center hover:text-[white] z-[1]"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            strokeWidth={2.5}
            className="mr-[5px]"
          />
        </div>
        <div className="w-[35px] aspect-square flex justify-center items-center hover:text-[white] ml-[5px]">
          <HugeiconsIcon
            icon={FilterVerticalIcon}
            size={18}
            strokeWidth={2.5}
            className="mr-[5px]"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start pt-[50px]">
        <div className="text-[#595959] font-[im] text-[14px] mb-[10px]">
          Today
        </div>
        {getExpensesForTheMonth(
          props?.allTransactions,
          activeMonthIndex,
          activeYear
        )?.map((data, index) => {
          return <TransactionBlock data={data} index={index} />;
        })}
      </div>
      <div className=""></div>
    </div>
  );
}

//  <div className="flex flex-col justify-center items-end">
//    {/* ---- Budget Usage ProgressBar */}
//    <div className="w-full flex justify-center items-center mb-[10px]">
//      <div className="w-[calc(100%/2)] h-[6px] rounded-full bg-[#f6f6f6] flex justify-start items-center overflow-hidden shadow-inner">
//        <div className="h-full w-[48%] bg-[#91B150] drop-shadow-md rounded-full transition-all duration-300 ease-in-out"></div>
//      </div>
//    </div>
//    {/* ---- Total Expense in current month */}
//    <div className="flex justify-center items-center">
//      <span className="mr-[10px]">₹</span>30245.20
//    </div>
//    {/* ---- Extra or Less usage indication with usage percentage */}
//    <div className="flex justify-end items-center text-[14px] font-[isb] text-[#D25340]">
//      <HugeiconsIcon
//        icon={CircleArrowDown01Icon}
//        size={14}
//        strokeWidth="2.5"
//        className="mr-[5px]"
//      />
//      20%
//    </div>
//  </div>
