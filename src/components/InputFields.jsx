import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export function InputFieldUI(props) {
  const [priorityArr, setPriorityArr] = useState(["High", "Medium", "Low"]);
  const [priorityFlag, setPriorityFlag] = useState(false);
  const [progressArr, setProgressArr] = useState([
    "Todo",
    "InProgress",
    "Pause",
    "Done",
  ]);
  const [progressFlag, setProgressFlag] = useState(false);

  return (
    <>
      <div
        className={" flex flex-col justify-start items-start w-full"}
        style={{ marginTop: `${props?.marginTop}` }}
      >
        <label
          className={
            "text-[12px] h-[2px] flex justify-center items-center px-[6px] mb-[-1.5px] ml-[10px] z-50 font-[im]" +
            (props?.activeInputField === props?.fieldValue
              ? " text-[#747474] bg-[#1D1D1D]"
              : " text-[#595959] bg-[#1D1D1D]")
          }
          style={{ transition: ".1s" }}
        >
          {props?.inputTitle}{" "}
          <span
            className={" ml-[4px]" + (props?.isRequired ? " flex" : " hidden")}
          >
            *
          </span>
        </label>
        <div className="w-full flex flex-col justify-start items-end min-h-[50px] max-h-[50px] overflow-visible">
          <input
            className={
              "w-[calc(100%-0px)] px-[15px] bg-transparent min-h-[50px] outline-none rounded-[10px] border-[1.5px] text-[14px] mt-[0px] font-[isb]" +
              (props?.activeInputField === props?.fieldValue
                ? "  placeholder:text-[#828282] border-[#3c3b3e] "
                : "  placeholder:text-[#828282] border-[#28272A] ")
            }
            type={props?.type}
            style={{ transition: ".1s" }}
            autoFocus={props?.isAutoFocus}
            readOnly={!props?.isEditable}
            onFocus={(e) => {
              props?.setActiveInputField(props?.fieldValue);
            }}
            onBlur={(e) => {
              props?.setActiveInputField("");
            }}
            value={props?.var}
            onKeyDown={(e) => {
              if (props?.inputTitle == "Task tags" && e.key == "Enter") {
                if (!props?.buttonData.includes(props?.var.toLowerCase())) {
                  props?.buttonFunction((prev) => [
                    ...prev,
                    props?.var.toLowerCase(),
                  ]);
                  props?.setVar("");
                }
              }
            }}
            onChange={(e) => {
              // if (props?.inputTitle == "Due date") {
              //   props?.setVar(e.target.value);
              // } else {
              //   if (
              //     !e.target.value.includes(".") &
              //     !e.target.value.includes("/") &
              //     !e.target.value.includes("%")
              //   ) {
              //     if (
              //       props?.inputTitle == "Task tags" ||
              //       props?.inputTitle == "Task assignees"
              //     ) {
              //       if (!e.target.value.includes(" ")) {
              //         props?.setVar(e.target.value);
              //       }
              //     } else {
              props?.setVar(e.target.value);
              //     }
              //   }
              // }
            }}
            placeholder={props?.placeholderText}
          ></input>
          <div
            className={
              "w-[30px] min-h-[40px] justify-center items-center mt-[-40px] cursor-pointer" +
              (props?.inputTitle == "Task progress"
                ? progressFlag
                  ? " rotate-180"
                  : " rotate-0"
                : props?.inputTitle == "Task priority"
                ? priorityFlag
                  ? " rotate-180"
                  : " rotate-0"
                : " ") +
              (props?.inputTitle == "Task progress" ||
              props?.inputTitle == "Task priority"
                ? " flex"
                : " hidden")
            }
            style={{ transition: ".2s" }}
            onClick={(e) => {
              if (props?.inputTitle == "Task progress") {
                setPriorityFlag((prev) => false);
                setProgressFlag(!progressFlag);
              } else {
                setProgressFlag((prev) => false);
                setPriorityFlag(!priorityFlag);
              }
            }}
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={18}
              strokeWidth={1.8}
              className=""
            />
          </div>
          <div
            className={
              "w-auto overflow-hidden  flex-col justify-start items-start rounded-[10px] bg-[white] border-[1.5px]  z-[60] text-[14px] mt-[10px]" +
              (props?.theme ? " border-[#2c2c2c]" : " border-[#ececec]") +
              (props?.inputTitle == "Task progress"
                ? progressFlag
                  ? " flex min-h-[120px] opacity-100"
                  : " flex min-h-[0px] opacity-0"
                : props?.inputTitle == "Task priority"
                ? priorityFlag
                  ? " flex min-h-[95px] opacity-100"
                  : " flex min-h-[0px] opacity-0"
                : " hidden")
            }
            style={{ transition: ".2s" }}
          >
            {priorityArr?.map((data, index) => {
              return (
                <div
                  key={index}
                  className={
                    "min-h-[25px] flex justify-start items-center px-[13px] cursor-pointer " +
                    (index > 0 ? " mt-[0px]" : " mt-[10px]")
                  }
                  onClick={(e) => {
                    // props?.setAddTaskModal([{ forTaskProgress: data }]);
                    props?.setVar(data);
                    setPriorityFlag(false);
                  }}
                >
                  {data}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={
            "h-[0px] overflow-visible w-full justify-end items-center mt-[-20px] mb-[20px] px-[7px]" +
            (props?.addButton ? " flex" : " hidden")
          }
        >
          <div
            className="z-[290] h-[26px] rounded-lg px-[10px] flex justify-center items-center bg-black text-[white] text-[12px] cursor-pointer"
            onClick={(e) => {
              if (props?.inputTitle == "Task progress") {
                if (!props?.buttonData.includes(props?.var.toLowerCase())) {
                  props?.buttonFunction((prev) => [
                    ...prev,
                    props?.var.toLowerCase(),
                  ]);
                  props?.setVar("");
                }
              } else {
                props?.buttonFunction((prev) => [...prev, props?.var]);
              }
            }}
          >
            Add
          </div>
        </div>
      </div>
    </>
  );
}

export function TextAreaFieldUI(props) {
  return (
    <>
      <div
        className={" flex flex-col justify-start items-start w-full"}
        style={{ marginTop: `${props?.marginTop}` }}
      >
        <label
          className={
            "text-[12px] h-[2px]  justify-center items-center px-[6px] mb-[-1.5px] ml-[10px] z-50 " +
            (props?.theme
              ? props?.activeInputField === props?.fieldValue
                ? " text-[#a3a3a3] bg-[#1A1A1A]"
                : " text-[#828282] bg-[#1A1A1A]"
              : props?.activeInputField === props?.fieldValue
              ? " text-[#565656] bg-[#ffffff]"
              : " text-[#999999] bg-[#ffffff]") +
            (props?.noHeading ? " hidden" : " flex")
          }
          style={{ transition: ".1s" }}
        >
          {props?.inputTitle}
          <span className={" ml-[4px]" + (true ? " flex" : " hidden")}>*</span>
        </label>
        <div
          className={
            "w-[calc(100%-0px)] bg-transparent  outline-none rounded-[10px] border-[1.5px] text-[14px] mt-[0px] pt-[5px]" +
            (props?.theme
              ? props?.activeInputField === props?.fieldValue
                ? " text-[white] border-[#636363]"
                : " text-[white] border-[#1a1a1a]"
              : props?.activeInputField === props?.fieldValue
              ? " text-[black] border-[#3a393d] "
              : " text-[black] border-[#28272A] ")
          }
          style={{
            transition: "border .1s",
            background: props?.noHeading ? `${props?.bgColor}` : `transparent`,
          }}
        >
          <textarea
            className={
              "w-[calc(100%-0px)] px-[15px] bg-transparent pt-[4px] outline-none rounded-[10px] text-[14px] mt-[0px] h-[100px] resize-none" +
              (props?.theme
                ? " placeholder:text-[#5b5b5b] chatScrollDark"
                : " placeholder:text-[#828282] chatScrollLight")
            }
            spellcheck="false"
            onFocus={(e) => {
              props?.setActiveInputField(props?.fieldValue);
            }}
            onBlur={(e) => {
              props?.setActiveInputField("");
            }}
            value={props?.title}
            onChange={(e) => {
              props?.setVar(e.target.value);
            }}
            placeholder={props?.placeholderText}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export function InputFieldUIForImageUpload(props) {
  const [priorityArr, setPriorityArr] = useState(["High", "Medium", "Low"]);
  const [priorityFlag, setPriorityFlag] = useState(false);
  const [progressArr, setProgressArr] = useState([
    "Todo",
    "InProgress",
    "Pause",
    "Done",
  ]);
  const [progressFlag, setProgressFlag] = useState(false);

  return (
    <>
      <div
        className={" flex flex-col justify-start items-start w-full"}
        style={{ marginTop: `${props?.marginTop}` }}
      >
        {/* <label
          className={
            "text-[12px] h-[2px] flex justify-center items-center px-[6px] mb-[-1.5px] ml-[10px] z-50 font-[im]" +
            (props?.activeInputField === props?.fieldValue
              ? " text-[#747474] bg-[#1D1D1D]"
              : " text-[#595959] bg-[#1D1D1D]")
          }
          style={{ transition: ".1s" }}
        >
          {props?.inputTitle}{" "}
          <span
            className={" ml-[4px]" + (props?.isRequired ? " flex" : " hidden")}
          >
            *
          </span>
        </label> */}
        <div className="w-full flex flex-col justify-start items-end min-h-[50px] max-h-[50px] overflow-visible">
          <input
            className="w-[calc(100%-0px)] bg-[#131314] min-h-[50px] outline-none rounded-[10px]  text-[14px] mt-[0px] font-[isb] pr-[90px] text-ellipsis pl-[45px]"
            type={props?.type}
            style={{ transition: ".1s" }}
            autoFocus={props?.isAutoFocus}
            readOnly={!props?.isEditable}
            onFocus={(e) => {
              props?.setActiveInputField(props?.fieldValue);
            }}
            onBlur={(e) => {
              props?.setActiveInputField("");
            }}
            value={props?.var?.fileName || ""}
            onKeyDown={(e) => {
              if (props?.inputTitle == "Task tags" && e.key == "Enter") {
                if (!props?.buttonData.includes(props?.var.toLowerCase())) {
                  props?.buttonFunction((prev) => [
                    ...prev,
                    props?.var.toLowerCase(),
                  ]);
                  props?.setVar("");
                }
              }
            }}
            onChange={(e) => {
              props?.setVar(e.target.value);
            }}
            placeholder={props?.placeholderText}
          ></input>
          <div
            className={
              "w-[30px] min-h-[40px] justify-center items-center mt-[-40px] cursor-pointer" +
              (props?.inputTitle == "Task progress"
                ? progressFlag
                  ? " rotate-180"
                  : " rotate-0"
                : props?.inputTitle == "Task priority"
                ? priorityFlag
                  ? " rotate-180"
                  : " rotate-0"
                : " ") +
              (props?.inputTitle == "Task progress" ||
              props?.inputTitle == "Task priority"
                ? " flex"
                : " hidden")
            }
            style={{ transition: ".2s" }}
            onClick={(e) => {
              if (props?.inputTitle == "Task progress") {
                setPriorityFlag((prev) => false);
                setProgressFlag(!progressFlag);
              } else {
                setProgressFlag((prev) => false);
                setPriorityFlag(!priorityFlag);
              }
            }}
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={18}
              strokeWidth={1.8}
              className=""
            />
          </div>
          {/* <div
            className={
              "w-auto overflow-hidden  flex-col justify-start items-start rounded-[10px] bg-[white] border-[1.5px]  z-[60] text-[14px] mt-[10px]" +
              (props?.theme ? " border-[#2c2c2c]" : " border-[#ececec]") +
              (props?.inputTitle == "Task progress"
                ? progressFlag
                  ? " flex min-h-[120px] opacity-100"
                  : " flex min-h-[0px] opacity-0"
                : props?.inputTitle == "Task priority"
                ? priorityFlag
                  ? " flex min-h-[95px] opacity-100"
                  : " flex min-h-[0px] opacity-0"
                : " hidden")
            }
            style={{ transition: ".2s" }}
          >
            {priorityArr?.map((data, index) => {
              return (
                <div
                  key={index}
                  className={
                    "min-h-[25px] flex justify-start items-center px-[13px] cursor-pointer " +
                    (index > 0 ? " mt-[0px]" : " mt-[10px]")
                  }
                  onClick={(e) => {
                    // props?.setAddTaskModal([{ forTaskProgress: data }]);
                    props?.setVar(data);
                    setPriorityFlag(false);
                  }}
                >
                  {data}
                </div>
              );
            })}
          </div> */}
        </div>
        {/* <div
          className={
            "h-[0px] overflow-visible w-full justify-end items-center mt-[-20px] mb-[20px] px-[7px]" +
            (props?.addButton ? " flex" : " hidden")
          }
        >
          <div
            className="z-[290] h-[26px] rounded-lg px-[10px] flex justify-center items-center bg-black text-[white] text-[12px] cursor-pointer"
            onClick={(e) => {
              if (props?.inputTitle == "Task progress") {
                if (!props?.buttonData.includes(props?.var.toLowerCase())) {
                  props?.buttonFunction((prev) => [
                    ...prev,
                    props?.var.toLowerCase(),
                  ]);
                  props?.setVar("");
                }
              } else {
                props?.buttonFunction((prev) => [...prev, props?.var]);
              }
            }}
          >
            Add
          </div>
        </div> */}
      </div>
    </>
  );
}
