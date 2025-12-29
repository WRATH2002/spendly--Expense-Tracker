import React from "react";

export default function TextAreaInput({
  isEditable,
  label,
  isRequired,
  placeholder,
  value,
  setValue,
  hasRequirements,
  requirementFunction,
  maxCount,
}) {
  return (
    <div className="flex flex-col justify-start items-start text-[14px]">
      <label className="mb-[5px] ml-[12px] text-[12px] text-[#777777] font-[500]">
        {label} {isRequired ? "*" : ""}
      </label>
      <textarea
        className={`w-full h-[38px] bg-[#000] rounded-lg px-[12px] focus:border-[#7ed50c96] focus:outline-[2.5px] outline-none pt-[7px] min-h-[80px] placeholder:text-[#777777] ${
          isEditable ? " text-[#ffffff]" : " text-[#8d8d8d] "
        } `}
        spellCheck="false"
        disabled={!isEditable}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (hasRequirements) {
            setValue(requirementFunction(e.target.value, maxCount));
          } else {
            setValue(e.target.value);
          }
        }}
      ></textarea>
      <div className="w-full flex justify-end items-center mt-[4px]">
        <div
          className={`text-[12px] ${
            value.length == maxCount ? " text-[#c70000]" : " text-[#a9a9a9]"
          } `}
        >
          {value.length}/{maxCount}
        </div>
      </div>
    </div>
  );
}
