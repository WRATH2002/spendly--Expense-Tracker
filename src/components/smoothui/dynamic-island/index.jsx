"use client";
import {
  Add01Icon,
  DrinkIcon,
  Home02Icon,
  Invoice02Icon,
  PieChartIcon,
  Settings03Icon,
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
const DefaultIdle = () => {
  const [showTemp, setShowTemp] = useState(false);

  return (
    <div className="w-[250px] flex justify-center items-center rounded-full">
      <div className="w-full h-[50px] flex justify-evenly items-center  rounded-full z-[70]">
        <HugeiconsIcon
          icon={Home02Icon}
          size={20}
          strokeWidth={2.2}
          // className={
          //   "active:text-[#ffffff] ml-[-10px] " +
          //   (activeSection == "home" ? " text-[#ffffff]" : " text-[#bcbcbc]")
          // }
          // onClick={() => {
          //   if (activeSection !== "home") {
          //     setActiveSection("home");
          //     setActiveSplitSpace("");
          //   }
          // }}
        />
        <HugeiconsIcon
          icon={PieChartIcon}
          size={20}
          strokeWidth={2.2}
          // className={
          //   "active:text-[#ffffff]  " +
          //   (activeSection == "chart" ? " text-[#ffffff]" : " text-[#bcbcbc]")
          // }
          // onClick={() => {
          //   if (activeSection !== "chart") {
          //     setActiveSection("chart");
          //     setActiveSplitSpace("");
          //   }
          // }}
        />
        <HugeiconsIcon
          icon={Add01Icon}
          size={20}
          strokeWidth={2.2}
          // className={
          //   "active:text-[#ffffff]  " +
          //   (activeSection == "addNew" ? " text-[#ffffff]" : " text-[#bcbcbc]")
          // }
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
          // className={
          //   "active:text-[#ffffff]  " +
          //   (activeSection == "split" ? " text-[#ffffff]" : " text-[#bcbcbc]")
          // }
          // onClick={() => {
          //   if (activeSection !== "split") {
          //     setActiveSection("split");
          //   }
          // }}
        />
        <HugeiconsIcon
          icon={Settings03Icon}
          size={20}
          strokeWidth={2.2}
          // className={
          //   "active:text-[#ffffff] mr-[-10px] " +
          //   (activeSection == "settings"
          //     ? " text-[#ffffff]"
          //     : " text-[#bcbcbc]")
          // }
          // onClick={() => {
          //   if (activeSection !== "settings") {
          //     setActiveSection("settings");
          //     setActiveSplitSpace("");
          //   }
          // }}
        />
      </div>
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
    </div>
  );
};

// Ring Component
const DefaultRing = () => (
  <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
    <Phone className="h-5 w-5 text-green-500" />
    <div className="flex-1">
      <p className="pointer-events-none font-medium text-sm text-white">
        Incoming Call
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p>
    </div>
    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
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
const Notification = () => (
  <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
    <Bell className="h-5 w-5 text-yellow-400" />
    <div className="flex-1">
      <p className="pointer-events-none font-medium text-sm text-white">
        New Message
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        You have a new notification!
      </p>
    </div>
    <span className="rounded-full bg-yellow-400/40 px-2 py-0.5 text-xs text-yellow-500">
      1
    </span>
  </div>
);

// Music Player Component
const MusicPlayer = ({ selectedData, bankInfo }) => {
  const [playing, setPlaying] = useState(true);
  return (
    // h-[400px]
    <div className="flex flex-col justify-start items-start h-auto w-full overflow-hidden p-[15px]  text-[white] font-[geist]">
      <div className="w-full text-[12px] text-[#5d5d5d] ">Label</div>
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
      </div>
      {/* <div className="w-full flex justify-start items-center">
        <div className="w-[50px] h-[50px] rounded-2xl flex justify-center items-center bg-[#ffffff24]">
        <HugeiconsIcon
          icon={DrinkIcon}
          size={30}
          strokeWidth={1.8}
          className="text-[white]"
        />
      </div>
      <div className="whitespace-nowrap w-[calc(100%-60px)] ml-[15px] text-[20px] font-[600] text-ellipsis overflow-hidden ">Salary Credited - By TCS to HDFC Bank for September</div>
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
  const [internalView, setInternalView] = useState("idle");
  const [variantKey, setVariantKey] = useState("timer-idle");
  const [stretchKey, setStretchKey] = useState(0);

  const view = controlledView ?? internalView;

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return ringContent ?? <DefaultRing />;
      case "timer":
        return timerContent ?? <DefaultTimer />;
      case "notification":
        return <Notification />;
      case "music":
        return <MusicPlayer selectedData={selectedData} bankInfo={bankInfo} />;
      default:
        return idleContent ?? <DefaultIdle />;
    }
  }, [view, idleContent, ringContent, timerContent, selectedData]);

  const handleViewChange = (newView) => {
    if (view === newView) {
      // 🔥 Trigger stretch animation
      setStretchKey((k) => k + 1);
      return;
    }

    setVariantKey(`${view}-${newView}`);

    if (onViewChange) {
      onViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  return (
    <div className={`h-auto w-full ${className} `}>
      <div
        className={
          "pt-[20px] z-50 flex  fixed bottom-[90px] left-0 min-w-full flex-col items-center justify-start bg-transparent px-[20px]" +
          (selectedData?.transactionName?.length > 0
            ? " h-[100svh] backdrop-blur-md"
            : " h-auto")
        }
        onClick={() => {
          setSelectedData({});
        }}
      >
        <motion.div
          key={stretchKey} // 👈 forces replay
          className="w-fit overflow-hidden rounded-full bg-[#8f8f8f2f] border border-[#8f8f8f18] z-[60] backdrop-blur-lg drop-shadow-xl"
          layout
          style={{ borderRadius: 40 }}
          animate={{
            scaleX: stretchKey ? [1, 1.12, 0.96, 1] : 1,
          }}
          transition={{
            scaleX: {
              duration: 0.35,
              ease: "easeInOut",
            },
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

        <div className="-translate-x-1/2 absolute bottom-[300px] left-1/2 z-10 flex justify-center gap-1 rounded-full border bg-background p-1 ">
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
