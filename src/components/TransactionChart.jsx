import React from "react";
import Chart from "react-apexcharts";

const TransactionChart = ({ transactions }) => {
  // Transform transaction data with dd/mm/yyyy date format
  const chartData = transactions.map((transaction) => {
    // Convert dd/mm/yyyy to mm/dd/yyyy for proper Date parsing
    const [day, month, year] = transaction.transactionDate.split("/");
    const formattedDate = `${month}/${day}/${year}`;

    return {
      x: new Date(formattedDate).getTime(),
      y: transaction.transactionAmount,
    };
  });

  const chartOptions = {
    chart: {
      type: "line",
      height: 400,
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Transaction Amounts Over Time",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#374151",
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
    markers: {
      size: 4,
      colors: ["#3b82f6"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
        style: {
          color: "#6b7280",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Amount ($)",
        style: {
          color: "#6b7280",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#6b7280",
        },
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    colors: ["#3b82f6"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: ["#60a5fa"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: "Transaction Amount",
      data: chartData,
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <Chart options={chartOptions} series={series} type="line" height={400} />
    </div>
  );
};

export default TransactionChart;
