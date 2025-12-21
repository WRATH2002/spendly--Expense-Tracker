import {
  Add01Icon,
  Add02Icon,
  CreditCardPosIcon,
  Home02Icon,
  Invoice02Icon,
  Payment01Icon,
  Payment02Icon,
  PieChartIcon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default function BottomNavbar({
  activeSection,
  setActiveSection,
  showAddTransactionModal,
  setShowAddTransactionModal,
  activeSplitSpace,
  setActiveSplitSpace,
  // allSpaceArray,
  // setAllSpaceArray,
  // allSpaceInfo,
  // setAllSpaceInfo,
  allSpaceInfoTemp,
  setAllSpaceInfoTemp,
}) {
  return (
    <div className="w-[250px] h-[50px] rounded-full flex flex-col justify-center items-center text-[#858585] bg-[#ffffff2f] z-[60] backdrop-blur-lg ">
      <div className="w-full h-full flex justify-evenly items-center z-[70]">
        <HugeiconsIcon
          icon={Home02Icon}
          size={20}
          strokeWidth={2.2}
          className={
            "active:text-[#ffffff] ml-[-10px] " +
            (activeSection == "home" ? " text-[#ffffff]" : " text-[#858585]")
          }
          onClick={() => {
            if (activeSection !== "home") {
              setActiveSection("home");
              setActiveSplitSpace("");
            }
          }}
        />
        <HugeiconsIcon
          icon={PieChartIcon}
          size={20}
          strokeWidth={2.2}
          className={
            "active:text-[#ffffff]  " +
            (activeSection == "chart" ? " text-[#ffffff]" : " text-[#858585]")
          }
          onClick={() => {
            if (activeSection !== "chart") {
              setActiveSection("chart");
              setActiveSplitSpace("");
            }
          }}
        />
        <HugeiconsIcon
          icon={Add01Icon}
          size={20}
          strokeWidth={2.2}
          className={
            "active:text-[#ffffff]  " +
            (activeSection == "addNew" ? " text-[#ffffff]" : " text-[#858585]")
          }
          onClick={() => {
            //   if (activeSection !== "addNew") {
            //     setActiveSection("addNew");
            //   }
            setShowAddTransactionModal(true);
          }}
          // fill="currentColor"
        />
        <HugeiconsIcon
          icon={Invoice02Icon}
          size={20}
          strokeWidth={2.2}
          className={
            "active:text-[#ffffff]  " +
            (activeSection == "split" ? " text-[#ffffff]" : " text-[#858585]")
          }
          onClick={() => {
            if (activeSection !== "split") {
              setActiveSection("split");
            }
          }}
        />
        <HugeiconsIcon
          icon={Settings03Icon}
          size={20}
          strokeWidth={2.2}
          className={
            "active:text-[#ffffff] mr-[-10px] " +
            (activeSection == "settings"
              ? " text-[#ffffff]"
              : " text-[#858585]")
          }
          onClick={() => {
            if (activeSection !== "settings") {
              setActiveSection("settings");
              setActiveSplitSpace("");
            }
          }}
        />
      </div>
      <div className="w-full h-full flex justify-start items-center mt-[-50px] py-[5px] px-[5px] ">
        <div
          className={
            "h-full w-[calc(100%/5)] bg-[#ffffff2f] rounded-full " +
            (activeSection == "home"
              ? " ml-[calc((100%/5)*0)]"
              : activeSection == "chart"
              ? " ml-[calc((100%/5)*1)]"
              : activeSection == "addNew"
              ? " ml-[calc((100%/5)*2)]"
              : activeSection == "split"
              ? " ml-[calc((100%/5)*3)]"
              : " ml-[calc((100%/5)*4)]")
          }
          style={{
            transition: ".3s",
          }}
        ></div>
      </div>
    </div>
  );
}
