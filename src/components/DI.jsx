import { useState } from "react";
import { Music, Phone, Bell } from "lucide-react";
import DynamicIsland from "./smoothui/dynamic-island";

function DI({ selectedData, bankInfo, setSelectedData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // <div className="min-h-screen w-full bg-[#000] flex items-start justify-center p-[20px]">
    <div className="flex h-auto min-w-full items-center justify-center">
      <DynamicIsland
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        bankInfo={bankInfo}
      />
    </div>
    // </div>
  );
}

export default DI;
