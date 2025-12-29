import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

export default function NormalInput({
  isEditable,
  label,
  isRequired,
  placeholder,
  value,
  setValue,
  hasRequirements,
  requirementFunction,
  inputType,
  doValidationCheck,
  validationCheckWith,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="flex flex-col justify-start items-start text-[white] text-[14px]">
      <label className="mb-[5px] ml-[12px] text-[12px] text-[#777777] font-[500]">
        {label} {isRequired ? "*" : ""}
      </label>
      <div className="w-full flex justify-start items-center">
        <input
          className={`w-full h-[42px] bg-[#000] rounded-lg px-[12px] focus:outline-[2.5px] placeholder:text-[#777777] ${
            doValidationCheck
              ? validationCheckWith == value
                ? " outline-none"
                : " outline-none"
              : " outline-none"
          } ${isEditable ? " text-[#ffffff] " : " text-[#8d8d8d] "} `}
          type={
            inputType == "password"
              ? !passwordVisible
                ? "password"
                : "text"
              : inputType == "tel"
              ? "tel"
              : "text"
          }
          disabled={!isEditable}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (hasRequirements) {
              setValue(requirementFunction(e.target.value));
            } else {
              setValue(e.target.value);
            }
          }}
        ></input>
        {inputType == "password" && (
          <div className="h-[38px] w-[38px] ml-[-38px] flex justify-center items-center p-[5px]">
            <div
              className="flex justify-center items-center w-full h-full rounded-full hover:bg-[#e5e5e500] cursor-pointer"
              onClick={() => {
                togglePasswordVisibility();
              }}
            >
              {passwordVisible ? (
                <HugeiconsIcon
                  icon={ViewOffIcon}
                  size={16}
                  strokeWidth={2}
                  className=""
                />
              ) : (
                <HugeiconsIcon
                  icon={ViewIcon}
                  size={16}
                  strokeWidth={2}
                  className=""
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
