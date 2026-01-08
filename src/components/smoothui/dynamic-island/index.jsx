"use client";
import { formatAmount } from "@/utils/functions";
import {
  BarChartIcon,
  DrinkIcon,
  Progress02Icon,
  WaterfallUp01Icon,
  WaterfallUp02Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bell,
  CloudLightning,
  Music2,
  Pause,
  Phone,
  Play,
  SkipBack,
  SkipForward,
  Thermometer,
  Timer as TimerIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
};

const DEFAULT_BOUNCE = 0.3;
const TIMER_INTERVAL_MS = 400;

// Idle Component with Weather
const DefaultIdle = ({
  thisMonthExpense = 6591,
  budget = 19000,
  handleViewChange,
  view,
}) => {
  const [showTemp, setShowTemp] = useState(false);

  return (
    <div
      className="w-full flex justify-center items-center px-3 py-3"
      onClick={() => {
        handleViewChange("ring", view);
      }}
    >
      {/* <motion.div
        className="flex w-[100px] items-center gap-2 px-3 py-2"
        layout
        onHoverEnd={() => setShowTemp(false)}
        onHoverStart={() => setShowTemp(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="text-foreground"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            key="storm"
          >
            <CloudLightning className="h-5 w-5 text-white" />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {showTemp && (
            <motion.div
              animate={{ opacity: 1, width: "auto" }}
              className="flex items-center gap-1 overflow-hidden text-white"
              exit={{ opacity: 0, width: 0 }}
              initial={{ opacity: 0, width: 0 }}
            >
              <Thermometer className="h-3 w-3" />
              <span className="pointer-events-none whitespace-nowrap text-white text-xs">
                12°C
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div> */}
      <div className="flex justify-start items-center">
        <div className="w-[40px] h-[18px] rounded-full bg-[#ffffff14] overflow-hidden flex justify-start items-center">
          <div className="w-[43%] h-full rounded-r-[2px] bg-[#4bb202] shadow-sm "></div>
        </div>
        <div className="text-[#acacac] text-[12px] ml-[10px]">
          {`${((thisMonthExpense / budget) * 100).toFixed(1)}`}%
        </div>
      </div>
    </div>
  );
};

// Ring Component
const DefaultRing = ({
  thisMonthExpense = 6591,
  budget = 19000,
  weeklyData = [
    {
      amount: 2024,
    },
    {
      amount: 1500,
    },
    {
      amount: 867,
    },
    {
      amount: 0,
    },
  ],
  handleViewChange,
  view,
}) => (
  <div
    className="flex w-full items-center gap-3 overflow-hidden px-4 py-2 text-foreground font-[geist] "
    onClick={() => {
      handleViewChange("notification", view);
    }}
  >
    {/* <Phone className="h-5 w-5 text-green-500" /> */}
    <HugeiconsIcon
      icon={BarChartIcon}
      size={24}
      strokeWidth={1.3}
      className="text-[#4bb202] rotate-180 mr-[2px]"
    />
    <div className="flex-1">
      <div className="pointer-events-none text-[14px] text-white flex justify-start items-center">
        {/* <div className="mr-[5px] text-[#555] ">JAN</div> */}
        Budget used
      </div>
      <div className="flex justify-start items-center">
        <div className="w-[150px] h-[5px] rounded-full bg-[#ffffff14] mt-[4px] overflow-hidden flex justify-start items-center">
          <div className="w-[43%] h-full rounded-r-[2px] bg-[#4bb202] shadow-sm "></div>
        </div>
        <div className="text-[#fff] text-[12px] ml-[20px] mt-[4px]">
          {`${((thisMonthExpense / budget) * 100).toFixed(1)}`}%
        </div>
      </div>
      <div className="text-[10px] text-[#4c4c4c] mt-[1px]">
        {/* {formatAmount(thisMonthExpense)}/{formatAmount(budget)} */}
        {thisMonthExpense}/{budget}
      </div>
      {/* <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p> */}
    </div>

    {/* <div className="min-w-[80px] h-[50px] flex justify-start items-center p-[5px]">
      <div
        className="w-[calc(100%/4)] h-full border-x-[1px] border-[#2a2a2a] justify-start items-start"
        style={{
          paddingTop: `calc((${weeklyData?.[0]?.amount} / ${thisMonthExpense}) * 50px)`,
          // paddingTop: `calc( ( ${50} / ${200} ) * 50px )`,
        }}
      >
        <div className={`w-full h-[5px] rounded-full bg-slate-500  `}></div>
      </div>
      <div className="w-[calc(100%/4)] h-full border-r-[1px] border-[#2a2a2a] flex justify-start items-end">
        <div></div>
      </div>
      <div className="w-[calc(100%/4)] h-full border-r-[1px] border-[#2a2a2a] flex justify-start items-end">
        <div></div>
      </div>
      <div className="w-[calc(100%/4)] h-full border-r-[1px] border-[#2a2a2a] flex justify-start items-end">
        <div></div>
      </div>
    </div> */}
    {/* <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" /> */}
  </div>
);

// Timer Component
const DefaultTimer = () => {
  const [time, setTime] = useState(60);

  useMemo(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, TIMER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
      <TimerIcon className="h-5 w-5 text-amber-500" />
      <div className="flex-1">
        <p className="pointer-events-none font-medium text-sm text-white">
          {time}s remaining
        </p>
      </div>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20">
        <motion.div
          animate={{ width: "0%" }}
          className="h-full bg-amber-500"
          initial={{ width: "100%" }}
          transition={{ duration: time, ease: "linear" }}
        />
      </div>
    </div>
  );
};

// Notification Component
const Notification = ({
  thisMonthExpense = 6591,
  budget = 19000,
  weeklyData = [
    {
      amount: 2024,
    },
    {
      amount: 1500,
    },
    {
      amount: 867,
    },
    {
      amount: 0,
    },
  ],
  handleViewChange,
  view,
}) => (
  <div
    className="flex w-full items-center gap-3 overflow-hidden px-4 py-2 text-foreground font-[geist] h-[150px]"
    onClick={() => {
      handleViewChange("idle", view);
    }}
  >
    {/* <Phone className="h-5 w-5 text-green-500" /> */}
    <HugeiconsIcon
      icon={BarChartIcon}
      size={24}
      strokeWidth={1.3}
      className="text-[#4bb202] rotate-180 mr-[2px]"
    />
    <div className="flex-1">
      <div className="pointer-events-none text-[14px] text-white flex justify-start items-center">
        {/* <div className="mr-[5px] text-[#555] ">JAN</div> */}
        Budget used
      </div>
      <div className="flex justify-start items-center">
        <div className="w-[150px] h-[5px] rounded-full bg-[#ffffff14] mt-[4px] overflow-hidden flex justify-start items-center">
          <div className="w-[43%] h-full rounded-r-[2px] bg-[#4bb202] shadow-sm "></div>
        </div>
        <div className="text-[#fff] text-[12px] ml-[20px] mt-[4px]">
          {`${((thisMonthExpense / budget) * 100).toFixed(1)}`}%
        </div>
      </div>
      <div className="text-[10px] text-[#4c4c4c] mt-[1px]">
        {/* {formatAmount(thisMonthExpense)}/{formatAmount(budget)} */}
        {thisMonthExpense}/{budget}
      </div>
      {/* <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p> */}
    </div>
  </div>
);

// Music Player Component
const MusicPlayer = ({ selectedData, bankInfo }) => {
  const [playing, setPlaying] = useState(true);
  return (
    // h-[400px]
    <div className="flex flex-col justify-start items-start h-auto w-full overflow-hidden p-[15px]  text-[white] font-[geist]">
      {/* <div className="w-full text-[12px] text-[#5d5d5d] ">Label</div>
      <div className="">{selectedData?.transactionName}</div>
      <div className="w-full flex flex-col justify-start items-start text-[14px] mt-[20px]">
        <div className="w-full flex justify-between items-center h-[30px]">
          <div className="text-[#5d5d5d]">From Bank</div>
          <div>{bankInfo?.bankDataObj?.[selectedData?.from]?.bankName}</div>
        </div>
        <div className="w-full flex justify-between items-center h-[30px]">
          <div className="text-[#5d5d5d]">To Bank</div>
          <div>{bankInfo?.bankDataObj?.[selectedData?.to]?.bankName}</div>
        </div>
      </div> */}
      {/* <div className="w-full flex justify-start items-center">
        <div className="w-[50px] h-[50px] rounded-2xl flex justify-center items-center bg-[#ffffff24]">
          <HugeiconsIcon
            icon={DrinkIcon}
            size={30}
            strokeWidth={1.8}
            className="text-[white]"
          />
        </div>
        <div className="whitespace-nowrap w-[calc(100%-60px)] ml-[15px] text-[20px] font-[600] text-ellipsis overflow-hidden ">
          Salary Credited - By TCS to HDFC Bank for September
        </div>
      </div>
      <Music2 className="h-5 w-5 text-pink-500" />
      <div className="min-w-0 flex-1">
        <p className="pointer-events-none truncate font-medium text-sm text-white">
          Lofi Chill Beats
        </p>
        <p className="pointer-events-none truncate text-white text-xs opacity-70">
          DJ Smooth
        </p>
      </div>
      <button
        className="rounded-full p-1 hover:bg-white/30"
        onClick={() => setPlaying(false)}
        type="button"
      >
        <SkipBack className="h-4 w-4 text-white" />
      </button>
      <button
        className="rounded-full p-1 hover:bg-white/30"
        onClick={() => setPlaying((p) => !p)}
        type="button"
      >
        {playing ? (
          <Pause className="h-4 w-4 text-white" />
        ) : (
          <Play className="h-4 w-4 text-white" />
        )}
      </button>
      <button
        className="rounded-full p-1 hover:bg-white/30"
        onClick={() => setPlaying(true)}
        type="button"
      >
        <SkipForward className="h-4 w-4 text-white" />
      </button> */}
    </div>
  );
};

export default function DynamicIsland({
  view: controlledView,
  onViewChange,
  idleContent,
  ringContent,
  timerContent,
  className = "",
  selectedData,
  bankInfo,
  setSelectedData,
}) {
  const [internalView, setInternalView] = useState("notification");
  const [variantKey, setVariantKey] = useState("timer-notification");
  const [jiggle, setJiggle] = useState(0);

  const view = controlledView ?? internalView;

  const handleViewChange = (newView, view) => {
    console.log(newView);
    if (view === newView) {
      // 🔥 Trigger jiggle if same view clicked
      setJiggle((j) => j + 1);
      return;
    }

    setVariantKey(`${view}-${newView}`);

    if (onViewChange) {
      onViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return (
          ringContent ?? (
            <DefaultRing handleViewChange={handleViewChange} view={view} />
          )
        );
      case "timer":
        return (
          timerContent ?? (
            <DefaultTimer handleViewChange={handleViewChange} view={view} />
          )
        );
      case "notification":
        return <Notification handleViewChange={handleViewChange} view={view} />;
      case "music":
        return (
          <MusicPlayer
            handleViewChange={handleViewChange}
            view={view}
            selectedData={selectedData}
            bankInfo={bankInfo}
          />
        );
      default:
        return (
          idleContent ?? (
            <DefaultIdle handleViewChange={handleViewChange} view={view} />
          )
        );
    }
  }, [view, idleContent, ringContent, timerContent, selectedData]);

  return (
    <div className={`h-auto w-full ${className} `}>
      <div
        className={
          "pt-[20px] z-[200] flex  fixed top-[0px] left-0 min-w-full flex-col items-center justify-start bg-transparent px-[20px]" +
          (selectedData?.transactionName?.length > 0
            ? " h-[100svh] backdrop-blur-md"
            : " h-auto")
        }
        // onClick={() => {
        //   setSelectedData({});
        // }}
      >
        <motion.div
          className=" w-auto overflow-hidden rounded-full bg-[#8f8f8f2f] border border-[#8f8f8f18] z-[60] backdrop-blur-lg drop-shadow-xl"
          layout
          style={{ borderRadius: 20 }}
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey] ?? DEFAULT_BOUNCE,
          }}
        >
          <motion.div
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              originX: 0.5,
              originY: 0.5,
              transition: { delay: 0.05 },
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              originX: 0.5,
              originY: 0.5,
            }}
            key={view}
            transition={{
              type: "spring",
              bounce: BOUNCE_VARIANTS[variantKey] ?? DEFAULT_BOUNCE,
            }}
          >
            {content}
          </motion.div>
        </motion.div>

        <div className="-translate-x-1/2 absolute -bottom-[300px] left-1/2 z-10 flex justify-center gap-1 rounded-full border bg-background p-1 ">
          {[
            { key: "idle", icon: <CloudLightning className="size-3" /> },
            { key: "ring", icon: <Phone className="size-3" /> },
            { key: "timer", icon: <TimerIcon className="size-3" /> },
            { key: "notification", icon: <Bell className="size-3" /> },
            { key: "music", icon: <Music2 className="size-3" /> },
          ].map(({ key, icon }) => (
            <button
              aria-label={key}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full border bg-primary px-2"
              key={key}
              onClick={() => {
                console.log(`${view}-${key}`);
                console.log(key);
                // if (view !== key) {
                // setVariantKey(`${view}-${key}`);
                handleViewChange(key);
                // }
              }}
              type="button"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
