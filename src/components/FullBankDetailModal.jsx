import React from "react";

export default function FullBankDetailModal() {
  return (
    <>
      {/* <div class="absolute inset-0 noise pointer-events-none"></div>
      <div className="grad rounded-t-full blur-[200px] w-full h-[200px] fixed left-0 bottom-[0px] -z-[0]"></div> */}
      <div
        className="w-full h-[100svh] flex flex-col justify-start items-start p-[20px] z-[110] fixed top-0 left-0 bg-[#00000000] backdrop-blur-sm font-[geist] text-[#ffffff]"
        onClick={(e) => {
          // setShowModal(false);
        }}
      >
        <div className="w-full flex justify-center items-center">
          <div className="px-[15px] py-[10px] flex justify-center items-center bg-[#ffffff12] rounded-md">
            Track Budget
            <div className="flex justify-start items-center w-[200px] mx-[10px]">
              <div className="w-[87%] h-[10px] rounded-md overflow-hidden flex justify-start items-center">
                <div
                  className="min-w-[200px] h-full bg-[#01c4a0]
"
                ></div>
              </div>
              <div className="min-w-[3px] h-[10px] "></div>
              <div className="w-[13%] h-[10px] rounded-md bg-[#2f2f2f]"></div>
            </div>
            96%
          </div>
        </div>
        {/* <div
        className="w-full bg-[#1b1b1b] rounded-3xl flex flex-col justify-start items-start overflow-hidden text-[#fff] text-[14px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        FullBankDetailModal
      </div> */}
      </div>
    </>
  );
}
