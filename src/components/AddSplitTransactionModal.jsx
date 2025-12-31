import React, { useEffect, useState } from "react";
import {
  containInCharacterCount,
  requirementOnlyNumber,
} from "../utils/functions";
import NormalInput from "./NormalInput";
import TextAreaInput from "./TextAreaInput";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "../firebase";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowDownLeft01Icon,
  ArrowMoveDownRightIcon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  Search01Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import DropDownInput from "./DropDownInput";
import { categories } from "../utils/categoryToIconSVGMapping";
import { paymentTypeOptions } from "../utils/constants";
import DateInput from "./DateInput";

const listOfNames = [
  "Groceries",
  "Rent",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Dining Out",
  "Healthcare",
  "Education",
  "Travel",
  "Miscellaneous",
  "other",
];

export default function AddSplitTransactionModal({
  setShowAddTransactionModal,
  activeSplitSpace,
  setActiveSplitSpace,
  activeSection,
  allSpaceInfoTemp,
  setAllSpaceInfoTemp,
  accountInfo,
  setFromBank,
  fromBank,
  toBank,
  setToBank,
  allBanksInfo,
}) {
  const [includeToSplit, setIncludeToSplit] = useState(false);
  const [selectedMember, setSelectedMember] = useState([]);
  const [splitAmongAll, setSplitAmongAll] = useState(true);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState(new Date().toISOString()?.split("T")[0]);
  const [category, setCategory] = useState("");

  const [tempSelectSpace, setTempSelectSpace] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showDropdown, setShowDropdown] = useState("");
  const [isInward, setIsInward] = useState(true);

  useEffect(() => {
    if (activeSection == "split") {
      setIncludeToSplit(true);
    } else {
      setIncludeToSplit(false);
    }
  }, [activeSplitSpace]);

  const formFormat = [
    [
      {
        label: "From Bank",
        isRequired: false,
        placeholder: "",
        value: fromBank?.name,
        setValue: setFromBank,
        isEditable: false,
        // hasRequirements: false,
        inputType: "text",
        inputComponent: "DropdownInput",
        dropDownList: allBanksInfo?.bankDataArr,
        showDropdown: showDropdown,
        setShowDropdown: setShowDropdown,
        // requirementFunction: requirementOnlyNumber,
      },
      {
        label: "To Bank",
        isRequired: false,
        placeholder: "",
        value: toBank?.name,
        setValue: setToBank,
        isEditable: false,
        // hasRequirements: false,
        inputType: "text",
        inputComponent: "DropdownInput",
        dropDownList: allBanksInfo?.bankDataArr,
        showDropdown: showDropdown,
        setShowDropdown: setShowDropdown,
        // requirementFunction: requirementOnlyNumber,
      },
    ],
    [
      {
        label: "Transaction Name",
        isRequired: true,
        placeholder: "eg: Puja Shopping",
        value: name,
        setValue: setName,
        isEditable: true,
        inputType: "text",
        inputComponent: "NormalInput",
      },
    ],
    [
      {
        label: "Amount",
        isRequired: true,
        placeholder: "eg: 1500.89",
        value: amount,
        setValue: setAmount,
        isEditable: true,
        hasRequirements: false,
        inputType: "tel",
        inputComponent: "NormalInput",
        requirementFunction: requirementOnlyNumber,
      },
      {
        label: "Date",
        isRequired: true,
        placeholder: "eg: 1500.89",
        value: date,
        setValue: setDate,
        isEditable: true,
        hasRequirements: false,
        inputType: "tel",
        inputComponent: "DateInput",
        requirementFunction: requirementOnlyNumber,
      },
    ],
    [
      {
        label: "Category",
        isRequired: true,
        placeholder: "eg: Transport",
        value: category,
        setValue: setCategory,
        isEditable: false,
        // hasRequirements: false,
        inputType: "text",
        inputComponent: "DropdownInput",
        dropDownList: categories,
        showDropdown: showDropdown,
        setShowDropdown: setShowDropdown,
        // requirementFunction: requirementOnlyNumber,
      },
      {
        label: "Payment Type",
        isRequired: true,
        placeholder: "eg: Online",
        value: paymentType,
        setValue: setPaymentType,
        isEditable: false,
        // hasRequirements: false,
        inputType: "text",
        inputComponent: "DropdownInput",
        dropDownList: paymentTypeOptions,
        showDropdown: showDropdown,
        setShowDropdown: setShowDropdown,
        // requirementFunction: requirementOnlyNumber,
      },
    ],
    [
      {
        label: "Extra Details",
        isRequired: false,
        placeholder: "eg: Bought groceries from XYZ store...",
        value: detail,
        setValue: setDetail,
        isEditable: true,
        hasRequirements: true,
        inputType: "text",
        inputComponent: "TextAreaInput",
        requirementFunction: containInCharacterCount,
        maxCount: 500,
      },
    ],
  ];

  function addTransaction() {
    // console.log("adding split transaction", generateCurrentDateTime());
    const user = firebase.auth().currentUser;
    console.log("Zf");
    if (includeToSplit) {
      console.log("split");
      // db.collection("userSpace")
      //   .doc(user?.uid)
      //   .collection("AllTransactionsSpace")
      //   .doc("SplitTransactions")
      //   .collection(tempSelectSpace[0]?.spaceName?.toLowerCase())
      //   .doc(tempSelectSpace[0]?.spaceName?.toLowerCase())
      //   .update({
      //     SplitTransactions: arrayUnion({
      //       name: name,
      //       date: new Date().toISOString(),
      //       type: "split",
      //       payeeName: "Himadri Purkait",
      //       amount: amount,
      //       detail: detail,
      //       category: "Food",
      //     }),
      //   });
    } else {
      console.log("normal");
      db.collection("userSpace")
        .doc(user?.uid)
        ?.collection("AllTransactionsSpace")
        .doc("AllTransactions")
        .update({
          AllTransactions: arrayUnion({
            transactionName: name,
            transactionAmount: amount,
            transactionDate: new Date(date).toISOString(),
            transactionCategory: category,
            transactionPaymentType: paymentType,
            transactionType: "normal",
            isInward: !isInward,
            transactionDetail: detail,
            payeeName: accountInfo?.name,
            transactionStatus: "Completed",
            from: fromBank?.code,
            to: toBank?.code,
          }),
        });
    }
    setShowAddTransactionModal(false);
  }

  function checkPreparedness() {
    if (
      name?.length > 0 &&
      (fromBank?.code?.length > 0 || toBank?.code?.length > 0) &&
      amount?.length > 0 &&
      date?.length > 0 &&
      category?.length > 0 &&
      paymentType?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  function filterData() {
    return searchText?.length > 0
      ? allSpaceInfoTemp?.filter((data) =>
          data?.spaceName?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
      : allSpaceInfoTemp;
  }

  return (
    <>
      {showModal ? (
        <div
          className="w-full h-[100svh] flex justify-center items-center p-[20px] z-[110] fixed top-0 left-0 bg-[#0000009e] backdrop-blur-sm"
          onClick={(e) => {
            setShowModal(false);
          }}
        >
          <div
            className="w-full bg-[#1b1b1b] rounded-3xl flex flex-col justify-start items-start overflow-hidden text-[#fff] text-[14px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="w-full pb-[10px] max-h-[500px] bg-[#1b1b1b] rounded-3xl flex flex-col justify-start items-start text-[#fff] text-[14px] overflow-y-scroll pt-[0px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className=" w-[calc(100%)]  mb-[10px] bg-[#1b1b1b] min-h-[50px] px-[20px] sticky top-0 border-b border-[#3a3a3a] flex justify-center items-center">
                <input
                  className="outline-none w-full bg-[#1b1b1b] min-h-full placeholder:text-[#797979]"
                  placeholder="Search here"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                ></input>
                <div
                  className={
                    "w-[35px] ml-[-35px] flex justify-end items-center" +
                    (searchText?.length > 0 ? " visible" : " hidden")
                  }
                  onClick={(e) => {
                    setSearchText("");
                  }}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={2}
                    className=" text-[#939393] "
                  />
                </div>
                {/* <div className="w-[35px]  flex justify-end items-center">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={20}
                    strokeWidth={2}
                    className=" text-[#939393]"
                  />
                </div> */}
              </div>
              {filterData()?.map((data, index) => {
                return (
                  <>
                    <div
                      className={
                        "w-full flex justify-center items-center border-t border-[#292929] my-[5px]" +
                        (index == 0 ? " hidden" : " visible")
                      }
                    ></div>
                    <div
                      className="px-[20px] w-full flex justify-between items-center min-h-[30px] max-h-[30px]"
                      onClick={(e) => {
                        setTempSelectSpace([data]);
                        setShowModal(false);
                      }}
                    >
                      <div>{data?.spaceName}</div>
                      <div className="flex justify-end items-center text-[#939393]">
                        {data?.members?.length}
                        <HugeiconsIcon
                          icon={UserMultiple02Icon}
                          size={14}
                          strokeWidth={2}
                          className=" text-[#939393] ml-[7px]"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className="fixed w-full h-[100svh] flex justify-center items-center left-0 top-0 z-[100] text-[#fff] backdrop-blur-sm px-[20px] bg-[#00000076]"
        onClick={(e) => {
          setShowAddTransactionModal(false);
        }}
      >
        <div
          className="w-full max-h-[80%] bg-[#1b1b1b] rounded-3xl flex flex-col justify-end items-start overflow-hidden border-[1.5px] border-[#232323]"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown("");
          }}
        >
          <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll py-[20px] px-[20px]">
            <div className="font-[600] text-[20px] mb-[10px]">
              Add New Transaction
            </div>
            {/* {listOfNames.map((name, index) => (
            <div
              key={index}
              className="w-full min-h-[60px] border-b border-b-[#3a3a3a] flex justify-start items-center cursor-pointer hover:bg-[#3a3a3a]"
            >
              <span className="text-[16px] font-[500]">{name}</span>
            </div>
          ))} */}
            <div className="w-full flex justify-start items-center flex-wrap mt-[5px]">
              {/* <div className="px-[10px] py-[3px] flex justify-center items-center text-[14px] rounded-md mr-[-5px] text-[#696969] mb-[5px] mt-[-10px] ml-[-5px]">
                <HugeiconsIcon
                  icon={ArrowMoveDownRightIcon}
                  size={20}
                  strokeWidth={2}
                  className=""
                />
              </div> */}
              <div className="p-[1px] flex justify-center items-center text-[14px] bg-gradient-to-br from-[#525252] via-[30%] via-[#383838] to-[#272727] rounded-md mr-[5px] mb-[5px]">
                <div
                  className="px-[10px] py-[3px] flex justify-center items-center text-[14px] bg-[#272727] rounded-[5px] text-[#9b9b9b]"
                  onClick={(e) => {
                    setName("TCS - Salary Credited");
                    setCategory("Salary");
                    setPaymentType("Online");
                  }}
                >
                  Salary
                </div>
              </div>
              <div className="p-[1px] flex justify-center items-center text-[14px] bg-gradient-to-br from-[#525252] via-[30%] via-[#383838] to-[#272727] rounded-md mr-[5px] text-[#d0d0d0] mb-[5px]">
                <div
                  className="px-[10px] py-[3px] flex justify-center items-center text-[14px] bg-[#272727] rounded-[5px] text-[#9b9b9b]"
                  onClick={(e) => {
                    setName("TCS - Lunch at Delta Park");
                    setCategory("Food");
                    setPaymentType("Online");
                  }}
                >
                  Lunch
                </div>
              </div>
              <div className="p-[1px] flex justify-center items-center text-[14px] bg-gradient-to-br from-[#525252] via-[30%] via-[#383838] to-[#272727] rounded-md mr-[5px] text-[#d0d0d0] mb-[5px]">
                <div
                  className="px-[10px] py-[3px] flex justify-center items-center text-[14px] bg-[#272727] rounded-[5px] text-[#9b9b9b]"
                  onClick={(e) => {
                    setName("UBER - Renewed Shuttle Package (Unlimited)");
                    setCategory("Subscription");
                    setPaymentType("Online");
                  }}
                >
                  Shuttle Package
                </div>
              </div>
              <div className="p-[1px] flex justify-center items-center text-[14px] bg-gradient-to-br from-[#7f2f2f] via-[30%] via-[#4e2828] to-[#3b1f1f] rounded-md mr-[5px] text-[#d0d0d0] mb-[5px]">
                <div
                  className="px-[10px] py-[3px] flex justify-center items-center text-[14px] bg-[#3b1f1f] rounded-[5px] text-[#e24a4a]"
                  onClick={(e) => {
                    setName("");
                    setCategory("");
                    setPaymentType("");
                    setAmount("");
                    setDate("");
                    setDetail("");
                  }}
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={14}
                    strokeWidth={2.5}
                    className="mr-[6px] rotate-45"
                  />
                  Clear
                </div>
              </div>
              <div className="p-[1px] flex justify-center items-center text-[14px] bg-gradient-to-br from-[#525252] via-[30%] via-[#383838] to-[#272727] rounded-md mr-[5px] mb-[5px]">
                <div
                  className="px-[6.5px] py-[6.5px] flex justify-center items-center text-[14px] bg-[#272727] rounded-[5px] text-[#9b9b9b]"
                  onClick={(e) => {
                    setName("TCS - Salary Credited");
                    setCategory("Salary");
                  }}
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={14}
                    strokeWidth={2.5}
                    className="mr-[0px]"
                  />
                  {/* Add new */}
                </div>
              </div>
            </div>
            {formFormat.map((row, rowIndex) => {
              return (
                <>
                  {rowIndex == 1 && (
                    <div className="w-full flex justify-between items-center text-[14px] mt-[15px] rounded-md min-h-[44px] px-[15px] pr-[8px] bg-[#3e3e3e] border border-[#464646]">
                      <div>Count this payment in Expense</div>
                      <div
                        className={
                          "w-[40px] h-[28px] rounded-full flex justify-start items-center  " +
                          (isInward
                            ? " ml-[15px] bg-[#000000]"
                            : " bg-[#000000]")
                        }
                        style={{ transition: ".3s" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsInward(!isInward);
                        }}
                      >
                        <div
                          className={
                            "h-[22px] w-[22px] rounded-full flex justify-center items-center  " +
                            (isInward
                              ? " ml-[15px] bg-[#bd4812]"
                              : " ml-[3px] bg-[#87bd12]")
                          }
                          style={{ transition: ".3s" }}
                        >
                          {/* {!isInward ? ( */}
                          <HugeiconsIcon
                            icon={ArrowDownLeft01Icon}
                            size={16}
                            strokeWidth={3}
                            className={
                              "" + (isInward ? " rotate-180" : " rotate-0")
                            }
                            style={{ transition: ".3s" }}
                          />
                          {/* ) : (
                            <HugeiconsIcon
                              icon={ArrowUpRight01Icon}
                              size={16}
                              strokeWidth={3}
                              className=""
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  )}

                  {row.length > 1 ? (
                    <div
                      key={rowIndex}
                      className="w-full mt-[15px] flex justify-between items-start"
                    >
                      {row.map((field, fieldIndex) => {
                        return (
                          <>
                            {field.inputComponent == "TextAreaInput" ? (
                              <div
                                key={`rowIndex_${fieldIndex}`}
                                className="w-[calc((100%-12px)/2)]"
                              >
                                <TextAreaInput
                                  isEditable={field?.isEditable}
                                  label={field?.label}
                                  isRequired={field?.isRequired}
                                  placeholder={field?.placeholder}
                                  value={field?.value}
                                  setValue={field?.setValue}
                                  hasRequirements={field?.hasRequirements}
                                  inputType={field?.inputType}
                                  requirementFunction={
                                    field?.requirementFunction
                                  }
                                  maxCount={field?.maxCount}
                                />
                              </div>
                            ) : field.inputComponent == "NormalInput" ? (
                              <div
                                key={`rowIndex_${fieldIndex}`}
                                className="w-[calc((100%-12px)/2)]"
                              >
                                <NormalInput
                                  isEditable={field?.isEditable}
                                  label={field?.label}
                                  isRequired={field?.isRequired}
                                  placeholder={field?.placeholder}
                                  value={field?.value}
                                  setValue={field?.setValue}
                                  hasRequirements={field?.hasRequirements}
                                  inputType={field?.inputType}
                                  requirementFunction={
                                    field?.requirementFunction
                                  }
                                  doValidationCheck={field?.doValidationCheck}
                                  validationCheckWith={
                                    field?.validationCheckWith
                                  }
                                />
                              </div>
                            ) : field?.inputComponent == "DropdownInput" ? (
                              <>
                                <div
                                  key={`rowIndex_${fieldIndex}`}
                                  className="w-[calc((100%-12px)/2)]"
                                >
                                  <DropDownInput
                                    isEditable={field?.isEditable}
                                    label={field?.label}
                                    isRequired={field?.isRequired}
                                    placeholder={field?.placeholder}
                                    value={field?.value}
                                    setValue={field?.setValue}
                                    // hasRequirements={field?.hasRequirements}
                                    inputType={field?.inputType}
                                    dropDownList={field?.dropDownList}
                                    showDropdown={showDropdown}
                                    setShowDropdown={setShowDropdown}
                                    // requirementFunction={
                                    //   field?.requirementFunction
                                    // }
                                    // doValidationCheck={
                                    //   field?.doValidationCheck
                                    // }
                                    // validationCheckWith={
                                    //   field?.validationCheckWith
                                    // }
                                  />
                                </div>
                              </>
                            ) : field?.inputComponent == "DateInput" ? (
                              <>
                                <div
                                  key={`rowIndex_${fieldIndex}`}
                                  className="w-[calc((100%-12px)/2)]"
                                >
                                  <DateInput
                                    isEditable={field?.isEditable}
                                    label={field?.label}
                                    isRequired={field?.isRequired}
                                    placeholder={field?.placeholder}
                                    value={field?.value}
                                    setValue={field?.setValue}
                                    hasRequirements={field?.hasRequirements}
                                    inputType={field?.inputType}
                                    requirementFunction={
                                      field?.requirementFunction
                                    }
                                    doValidationCheck={field?.doValidationCheck}
                                    validationCheckWith={
                                      field?.validationCheckWith
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      {/* {row[0]?.label == "Extra Details" && (
                        <div className="w-full flex justify-between items-center text-[14px] mt-[15px] rounded-md min-h-[44px] px-[15px] pr-[8px] bg-[#3e3e3e] border border-[#464646]">
                          <div>Count this payment in Expense</div>
                          <div
                            className={
                              "w-[40px] h-[28px] rounded-full flex justify-start items-center  " +
                              (isInward
                                ? " ml-[15px] bg-[#000000]"
                                : " bg-[#000000]")
                            }
                            style={{ transition: ".3s" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsInward(!isInward);
                            }}
                          >
                            <div
                              className={
                                "h-[22px] w-[22px] rounded-full  " +
                                (isInward
                                  ? " ml-[15px] bg-[#87bd12]"
                                  : " ml-[3px] bg-[#909090]")
                              }
                              style={{ transition: ".3s" }}
                            ></div>
                          </div>
                        </div>
                      )} */}
                      <div
                        key={rowIndex}
                        className="w-full mt-[15px] flex justify-between items-start"
                      >
                        {row.map((field, fieldIndex) => {
                          return (
                            <>
                              {field.inputComponent == "TextAreaInput" ? (
                                <div
                                  key={`rowIndex_${fieldIndex}`}
                                  className="w-full"
                                >
                                  <TextAreaInput
                                    isEditable={field?.isEditable}
                                    label={field?.label}
                                    isRequired={field?.isRequired}
                                    placeholder={field?.placeholder}
                                    value={field?.value}
                                    setValue={field?.setValue}
                                    hasRequirements={field?.hasRequirements}
                                    inputType={field?.inputType}
                                    requirementFunction={
                                      field?.requirementFunction
                                    }
                                    maxCount={field?.maxCount}
                                  />
                                </div>
                              ) : field.inputComponent == "NormalInput" ? (
                                <div
                                  key={`rowIndex_${fieldIndex}`}
                                  className="w-full"
                                >
                                  <NormalInput
                                    isEditable={field?.isEditable}
                                    label={field?.label}
                                    isRequired={field?.isRequired}
                                    placeholder={field?.placeholder}
                                    value={field?.value}
                                    setValue={field?.setValue}
                                    hasRequirements={field?.hasRequirements}
                                    inputType={field?.inputType}
                                    requirementFunction={
                                      field?.requirementFunction
                                    }
                                    doValidationCheck={field?.doValidationCheck}
                                    validationCheckWith={
                                      field?.validationCheckWith
                                    }
                                  />
                                </div>
                              ) : field?.inputComponent == "DropdownInput" ? (
                                <>
                                  <div
                                    key={`rowIndex_${fieldIndex}`}
                                    className="w-full"
                                  >
                                    <DropDownInput
                                      isEditable={field?.isEditable}
                                      label={field?.label}
                                      isRequired={field?.isRequired}
                                      placeholder={field?.placeholder}
                                      value={field?.value}
                                      setValue={field?.setValue}
                                      // hasRequirements={field?.hasRequirements}
                                      inputType={field?.inputType}
                                      showDropdown={showDropdown}
                                      setShowDropdown={setShowDropdown}
                                      // requirementFunction={
                                      //   field?.requirementFunction
                                      // }
                                      // doValidationCheck={
                                      //   field?.doValidationCheck
                                      // }
                                      // validationCheckWith={
                                      //   field?.validationCheckWith
                                      // }
                                    />
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              );
            })}

            <div className="w-full flex justify-center items-center border-t border-[#3a3a3a] mt-[30px] mb-[10px]"></div>
            <div className="w-full flex justify-between items-center mt-[15px]">
              <div className="flex flex-col justify-start w-[calc(100%-60px)]">
                <div className="text-[14px] font-[600]">Split Transaction</div>
                <div className="text-[12px] text-[#818181] mt-[5px]">
                  This transaction will be included while splitting amounts
                  among members.
                </div>
              </div>
              <div
                className={
                  "w-[40px] h-[28px] rounded-full flex justify-start items-center  " +
                  (includeToSplit ? " ml-[15px] bg-[#000000]" : " bg-[#000000]")
                }
                style={{ transition: ".3s" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (includeToSplit) {
                    setSplitAmongAll(false);
                    setIncludeToSplit(false);
                  } else {
                    setSplitAmongAll(true);
                    setIncludeToSplit(true);
                  }
                }}
              >
                <div
                  className={
                    "h-[22px] w-[22px] rounded-full  " +
                    (includeToSplit
                      ? " ml-[15px] bg-[#87bd12]"
                      : " ml-[3px] bg-[#909090]")
                  }
                  style={{ transition: ".3s" }}
                ></div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-[15px] ">
              <div className="flex flex-col justify-start w-[calc(100%-60px)]">
                <div className="text-[14px] font-[600]">Split among all</div>
                <div className="text-[12px] text-[#818181] mt-[5px]">
                  This transaction will be split among all members equally.
                  Toggle off to choose specific members.
                </div>
              </div>
              <div
                className={
                  "w-[40px] h-[28px] rounded-full flex justify-start items-center  " +
                  (splitAmongAll ? " ml-[15px] bg-[#000000]" : " bg-[#000000]")
                }
                style={{ transition: ".3s" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (includeToSplit) {
                    setSplitAmongAll(!splitAmongAll);
                  }
                }}
              >
                <div
                  className={
                    "h-[22px] w-[22px] rounded-full  " +
                    (includeToSplit
                      ? splitAmongAll
                        ? " ml-[15px] bg-[#87bd12]"
                        : " ml-[3px] bg-[#909090]"
                      : "ml-[3px] bg-[#2b2b2e]")
                  }
                  style={{ transition: ".3s" }}
                ></div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center border-t border-[#3a3a3a] mt-[30px] mb-[25px]"></div>
            {activeSection == "split" && includeToSplit ? (
              <>
                {activeSplitSpace?.length > 0 ? (
                  <>
                    <div className="w-full flex flex-col justify-start items-start text-[white] text-[14px]">
                      <label className="mb-[5px] text-[12px] text-[#ababab] font-[500]">
                        Choose Split Space *
                      </label>
                      <div className="w-full flex justify-start items-center">
                        <div className="h-[42px] min-w-[42px] rounded-lg bg-[#000] flex justify-center items-center mr-[10px]">
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={20}
                            strokeWidth={2}
                            className=""
                          />
                        </div>
                        <input
                          className={`w-[calc(100%-122px)] h-[42px] bg-[#000] rounded-lg px-[12px] focus:outline-[2.5px] placeholder:text-[#777777] outline-none text-[#ffffff] mr-[10px]`}
                          type={"text"}
                          value={
                            allSpaceInfoTemp?.find(
                              (data) =>
                                data?.spaceName?.toLowerCase() ==
                                activeSplitSpace
                            )?.spaceName
                          }
                          disabled={true}
                          // isEditable={false}
                        ></input>
                        <div
                          className={
                            "h-[42px] w-[60px] rounded-lg bg-[#000] flex justify-center items-center "
                          }
                        >
                          <HugeiconsIcon
                            icon={UserMultiple02Icon}
                            size={14}
                            strokeWidth={2}
                            className=" text-[#939393] mr-[7px]"
                          />
                          {
                            allSpaceInfoTemp?.find(
                              (data) =>
                                data?.spaceName?.toLowerCase() ==
                                activeSplitSpace
                            )?.members?.length
                          }
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full flex flex-col justify-start items-start text-[white] text-[14px]">
                      <label className="mb-[5px] text-[12px] text-[#ababab] font-[500]">
                        Choose Split Space *
                      </label>
                      <div className="w-full flex justify-start items-center">
                        <div
                          className="h-[42px] min-w-[42px] rounded-lg bg-[#000] flex justify-center items-center mr-[10px] z-[130]"
                          onClick={(e) => {
                            setShowModal(true);
                          }}
                        >
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={20}
                            strokeWidth={2}
                            className=""
                          />
                        </div>
                        <input
                          className={
                            `w-[calc(100%-122px)] h-[42px] bg-[#000] rounded-lg px-[12px] focus:outline-[2.5px] placeholder:text-[#777777] outline-none text-[#ffffff] mr-[10px]` +
                            (tempSelectSpace?.length > 0
                              ? " visible"
                              : " hidden")
                          }
                          type={"text"}
                          value={tempSelectSpace[0]?.spaceName}
                          disabled={true}
                          // isEditable={false}
                        ></input>
                        <div
                          className={
                            "h-[42px] w-[60px] rounded-lg bg-[#000] flex justify-center items-center " +
                            (tempSelectSpace?.length > 0
                              ? " visible"
                              : " hidden")
                          }
                        >
                          <HugeiconsIcon
                            icon={UserMultiple02Icon}
                            size={14}
                            strokeWidth={2}
                            className=" text-[#939393] mr-[7px]"
                          />
                          {tempSelectSpace[0]?.members?.length}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              "mt-[0px] rounded-lg w-full min-h-[50px] flex justify-center items-center font-[700] bg-[#fff] text-[#000] text-[14px]" +
              (checkPreparedness() ? " opacity-100" : " opacity-30")
            }
            onClick={(e) => {
              if (checkPreparedness()) {
                addTransaction();
              }
              // ff();
            }}
          >
            Add Transaction
          </div>
        </div>
      </div>
    </>
  );
}
