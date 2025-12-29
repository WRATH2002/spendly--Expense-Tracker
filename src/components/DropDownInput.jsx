import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import {
  categoryToIconMapping,
  categoryToIconMappingSmall,
} from "../utils/categoryToIconSVGMapping";

export default function DropDownInput({
  isEditable,
  label,
  isRequired,
  placeholder,
  value,
  setValue,
  //   hasRequirements,
  //   requirementFunction,
  inputType,
  dropDownList,
  //   doValidationCheck,
  //   validationCheckWith,
  showDropdown,
  setShowDropdown,
}) {
  return (
    <div className="flex flex-col justify-start items-start text-[white] text-[14px]">
      <label className="mb-[5px] ml-[12px] text-[12px] text-[#777777] font-[500] ">
        {label} {isRequired ? "*" : ""}
      </label>
      <div className="w-full flex justify-start items-center">
        <div
          className={`w-full h-[42px] bg-[#000] rounded-lg px-[12px] placeholder:text-[#777777] outline-none active:outline-none text-[#ffffff] pr-[35px] text-ellipsis whitespace-nowrap overflow-hidden flex justify-start items-center`}
          type={"text"}
          //   disabled={!isEditable}
          readOnly
          placeholder={placeholder}
          value={value}
          onClick={(e) => {
            e?.stopPropagation();
            setShowDropdown(label);
          }}
          onBlur={() => {
            // setShowDropdown(false);
          }}
        >
          <div
            className={`w-full   text-ellipsis whitespace-nowrap overflow-hidden `}
          >
            {value}
          </div>
        </div>
        {inputType == "text" && (
          <div className="h-[38px] w-[38px] ml-[-38px] flex justify-center items-center p-[5px]">
            <div
              className="flex justify-center items-center w-full h-full rounded-full hover:bg-[#e5e5e500] cursor-pointer text-[#8d8d8d]"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(label);
              }}
            >
              {showDropdown == label ? (
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={16}
                  strokeWidth={2}
                  className=""
                />
              ) : (
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={16}
                  strokeWidth={2}
                  className="-rotate-180"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={
          "w-full flex justify-start items-start max-h-0" +
          (showDropdown == label ? " visible" : " hidden")
        }
      >
        <div className="w-full flex flex-col justify-start items-start mt-[5px] bg-gradient-to-br from-[#525252] via-[30%] via-[#383838] to-[#272727] p-[1px] rounded-lg overflow-hidden max-h-[220px] z-50 drop-shadow-2xl">
          <div className="w-full flex flex-col bg-[#272727] justify-start items-start overflow-y-scroll rounded-lg px-[12px] py-[5px] h-full">
            {dropDownList?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="min-h-[30px] w-full flex justify-start items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (label == "From Bank" || label == "To Bank") {
                      setValue({ name: data?.name, code: data?.code });
                      setShowDropdown("");
                    } else {
                      setValue(data?.name);
                      setShowDropdown("");
                    }
                  }}
                >
                  {label == "Category" && (
                    <div
                      className="mr-[10px] rounded-full flex justify-start items-center font-[em] "
                      dangerouslySetInnerHTML={{
                        __html:
                          categoryToIconMappingSmall[data?.name?.toLowerCase()],
                      }}
                    ></div>
                  )}
                  <div
                    key={index}
                    className=" w-full  whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {data?.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
