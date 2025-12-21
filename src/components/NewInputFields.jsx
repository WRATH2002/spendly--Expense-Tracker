import React from "react";

export default function NewInputFields({
  theme,
  inputTitle,
  data,
  setData,
  activeInputField,
  setActiveInputField,
  fieldValue,
  placeholderText,
  placeholderContentLabel,
  rejectChar,
  charsToReject,
  marginTop,
  paddingLeft,
  isEditable,
  isAutoFocus,
  addButton,
  isRequired,
  type,
}) {
  return (
    <input
      className="w-full h-full bg-transparent placeholder:text-[#797979] outline-none font-[em] text-[15px]"
      style={{ paddingLeft: `${paddingLeft}` }}
      placeholder={placeholderContentLabel}
      type={type}
      value={data}
      autoFocus={isAutoFocus}
      readOnly={!isEditable}
      onFocus={(e) => {
        setActiveInputField(fieldValue);
      }}
      onBlur={(e) => {
        setActiveInputField("");
      }}
      onChange={(e) => {
        if (isEditable) {
          if (rejectChar) {
            // Check if input contains ANY char from charsToReject
            const hasRejectedChar = charsToReject.some((char) =>
              e.target.value.includes(char)
            );

            if (!hasRejectedChar) {
              setData(e.target.value);
            }
          } else {
            setData(e.target.value);
          }
        }
      }}
    ></input>
  );
}
