import React from "react";

const tourExpenseSpaces = [
  {
    id: 1,
    name: "Purulia Tour",
    budget: 4050,
    totalExpense: 3850,
    isClosed: false,
    createdDate: "2024-11-15",
    createdBy: "Rajesh Kumar",
    currency: "INR",
    description: "Weekend getaway to Purulia hills",
    memberList: [
      { name: "Rajesh Kumar", phoneNumber: "9876543210", contribution: 1200 },
      { name: "Priya Singh", phoneNumber: "8765432109", contribution: 950 },
      { name: "Amit Das", phoneNumber: "7654321098", contribution: 1100 },
      { name: "Sneha Roy", phoneNumber: "6543210987", contribution: 600 },
    ],
  },
  {
    id: 2,
    name: "Darjeeling Trip",
    budget: 8500,
    totalExpense: 7890,
    isClosed: true,
    createdDate: "2024-10-20",
    createdBy: "Soumya Banerjee",
    currency: "INR",
    description: "5-day Darjeeling tea estate tour",
    memberList: [
      {
        name: "Soumya Banerjee",
        phoneNumber: "9988776655",
        contribution: 2100,
      },
      {
        name: "Riya Chatterjee",
        phoneNumber: "8877665544",
        contribution: 1950,
      },
      { name: "Arjun Mehta", phoneNumber: "7766554433", contribution: 1840 },
      { name: "Deepa Sharma", phoneNumber: "6655443322", contribution: 2000 },
    ],
  },
  {
    id: 3,
    name: "Digha Beach Weekend",
    budget: 3200,
    totalExpense: 2850,
    isClosed: false,
    createdDate: "2024-12-01",
    createdBy: "Kiran Pal",
    currency: "INR",
    description: "Beach resort stay and seafood",
    memberList: [
      { name: "Kiran Pal", phoneNumber: "9123456789", contribution: 950 },
      { name: "Tina Roy", phoneNumber: "8123456789", contribution: 950 },
      { name: "Rohit Sen", phoneNumber: "7123456789", contribution: 950 },
    ],
  },
  {
    id: 4,
    name: "Sundarbans Safari",
    budget: 6700,
    totalExpense: 6200,
    isClosed: true,
    createdDate: "2024-09-10",
    createdBy: "Ananya Ghosh",
    currency: "INR",
    description: "Tiger reserve and mangrove exploration",
    memberList: [
      { name: "Ananya Ghosh", phoneNumber: "9234567890", contribution: 1550 },
      { name: "Vikram Joshi", phoneNumber: "8234567890", contribution: 1550 },
      { name: "Nisha Gupta", phoneNumber: "7234567890", contribution: 1550 },
      { name: "Sanjay Verma", phoneNumber: "6234567890", contribution: 1550 },
    ],
  },
  {
    id: 5,
    name: "Kalimpong Expedition",
    budget: 5400,
    totalExpense: 4950,
    isClosed: false,
    createdDate: "2024-11-28",
    createdBy: "Mohan Lal",
    currency: "INR",
    description: "Monastery visits and local cuisine",
    memberList: [
      { name: "Mohan Lal", phoneNumber: "9345678901", contribution: 1650 },
      { name: "Kavita Iyer", phoneNumber: "8345678901", contribution: 1650 },
      { name: "Rahul Khanna", phoneNumber: "7345678901", contribution: 1650 },
    ],
  },
  {
    id: 6,
    name: "Shantiniketan Cultural Tour",
    budget: 2800,
    totalExpense: 2600,
    isClosed: true,
    createdDate: "2024-10-05",
    createdBy: "Bipasha Dey",
    currency: "INR",
    description: "Tagore's abode and Baul music",
    memberList: [
      { name: "Bipasha Dey", phoneNumber: "9456789012", contribution: 650 },
      { name: "Sumit Bose", phoneNumber: "8456789012", contribution: 650 },
      { name: "Meera Nair", phoneNumber: "7456789012", contribution: 650 },
      { name: "Akash Dubey", phoneNumber: "6456789012", contribution: 650 },
    ],
  },
  {
    id: 7,
    name: "Dooars Tea Garden",
    budget: 7200,
    totalExpense: 6850,
    isClosed: false,
    createdDate: "2024-12-05",
    createdBy: "Pritam Sen",
    currency: "INR",
    description: "Tea plantation stay and wildlife",
    memberList: [
      { name: "Pritam Sen", phoneNumber: "9567890123", contribution: 2280 },
      {
        name: "Ishita Banerjee",
        phoneNumber: "8567890123",
        contribution: 2280,
      },
      { name: "Gaurav Singh", phoneNumber: "7567890123", contribution: 2290 },
    ],
  },
  {
    id: 8,
    name: "Bishnupur Terracotta Trail",
    budget: 2500,
    totalExpense: 2350,
    isClosed: true,
    createdDate: "2024-09-20",
    createdBy: "Supriya Malik",
    currency: "INR",
    description: "Ancient temples and handicrafts",
    memberList: [
      { name: "Supriya Malik", phoneNumber: "9678901234", contribution: 785 },
      { name: "Debashis Roy", phoneNumber: "8678901234", contribution: 785 },
      { name: "Anjali Kapoor", phoneNumber: "7678901234", contribution: 780 },
    ],
  },
  {
    id: 9,
    name: "Mandarmani Beach Party",
    budget: 4800,
    totalExpense: 4650,
    isClosed: false,
    createdDate: "2024-12-10",
    createdBy: "Ranjan Das",
    currency: "INR",
    description: "Beach shacks and bonfire night",
    memberList: [
      { name: "Ranjan Das", phoneNumber: "9789012345", contribution: 1162 },
      { name: "Pooja Agarwal", phoneNumber: "8789012345", contribution: 1162 },
      { name: "Sameer Patel", phoneNumber: "7789012345", contribution: 1162 },
      { name: "Divya Reddy", phoneNumber: "6789012345", contribution: 1164 },
    ],
  },
  {
    id: 10,
    name: "Murshidabad Heritage Walk",
    budget: 3100,
    totalExpense: 2900,
    isClosed: true,
    createdDate: "2024-08-15",
    createdBy: "Tanmay Ghosh",
    currency: "INR",
    description: "Nawabi history and palace tours",
    memberList: [
      { name: "Tanmay Ghosh", phoneNumber: "9890123456", contribution: 725 },
      { name: "Ritika Sen", phoneNumber: "8890123456", contribution: 725 },
      { name: "Kunal Sharma", phoneNumber: "7890123456", contribution: 725 },
      { name: "Swati Jain", phoneNumber: "6890123456", contribution: 725 },
    ],
  },
  {
    id: 11,
    name: "Sikkim Adventure",
    budget: 12000,
    totalExpense: 11500,
    isClosed: false,
    createdDate: "2024-11-01",
    createdBy: "Abhishek Roy",
    currency: "INR",
    description: "Gangtok, Tsomgo Lake, Nathula Pass",
    memberList: [
      { name: "Abhishek Roy", phoneNumber: "9901234567", contribution: 2875 },
      {
        name: "Shreya Mukherjee",
        phoneNumber: "8901234567",
        contribution: 2875,
      },
      { name: "Aditya Kumar", phoneNumber: "7901234567", contribution: 2875 },
      { name: "Neha Sinha", phoneNumber: "6901234567", contribution: 2875 },
    ],
  },
  {
    id: 12,
    name: "Bakkhali Fishing Trip",
    budget: 2200,
    totalExpense: 2050,
    isClosed: true,
    createdDate: "2024-10-12",
    createdBy: "Partha Sarathi",
    currency: "INR",
    description: "Fishing and coastal village tour",
    memberList: [
      { name: "Partha Sarathi", phoneNumber: "9012345678", contribution: 685 },
      { name: "Madhuri Das", phoneNumber: "8012345678", contribution: 685 },
      { name: "Binoy Sen", phoneNumber: "7012345678", contribution: 680 },
    ],
  },
  {
    id: 13,
    name: "Mirik Lake Retreat",
    budget: 5600,
    totalExpense: 5200,
    isClosed: false,
    createdDate: "2024-12-08",
    createdBy: "Sangeeta Rao",
    currency: "INR",
    description: "Serene lake views and orange gardens",
    memberList: [
      { name: "Sangeeta Rao", phoneNumber: "9123450987", contribution: 1733 },
      { name: "Vishal Tiwari", phoneNumber: "8123450987", contribution: 1733 },
      { name: "Pallavi Desai", phoneNumber: "7123450987", contribution: 1734 },
    ],
  },
  {
    id: 14,
    name: "Bankura Terracotta Tour",
    budget: 2900,
    totalExpense: 2750,
    isClosed: true,
    createdDate: "2024-09-05",
    createdBy: "Jayanta Bose",
    currency: "INR",
    description: "Temples and clay horse crafts",
    memberList: [
      { name: "Jayanta Bose", phoneNumber: "9234560987", contribution: 917 },
      { name: "Rupali Dutta", phoneNumber: "8234560987", contribution: 917 },
      { name: "Somnath Pal", phoneNumber: "7234560987", contribution: 916 },
    ],
  },
  {
    id: 15,
    name: "Jaldapara Wildlife Safari",
    budget: 8800,
    totalExpense: 8300,
    isClosed: false,
    createdDate: "2024-11-18",
    createdBy: "Nilanjan Mitra",
    currency: "INR",
    description: "Rhino spotting and forest lodge",
    memberList: [
      { name: "Nilanjan Mitra", phoneNumber: "9345670987", contribution: 2075 },
      { name: "Dipanwita Sen", phoneNumber: "8345670987", contribution: 2075 },
      { name: "Biswajit Roy", phoneNumber: "7345670987", contribution: 2075 },
      { name: "Suchitra Das", phoneNumber: "6345670987", contribution: 2075 },
    ],
  },
  {
    id: 16,
    name: "Kolkata Food Trail",
    budget: 1800,
    totalExpense: 1650,
    isClosed: true,
    createdDate: "2024-10-25",
    createdBy: "Indrajit Ghosh",
    currency: "INR",
    description: "Street food and heritage restaurants",
    memberList: [
      { name: "Indrajit Ghosh", phoneNumber: "9456780987", contribution: 330 },
      { name: "Moumita Sen", phoneNumber: "8456780987", contribution: 330 },
      { name: "Subrata Bose", phoneNumber: "7456780987", contribution: 330 },
      { name: "Tanuja Sharma", phoneNumber: "6456780987", contribution: 330 },
      {
        name: "Arnab Chatterjee",
        phoneNumber: "5456780987",
        contribution: 330,
      },
    ],
  },
  {
    id: 17,
    name: "Garhbeta Forest Camp",
    budget: 3500,
    totalExpense: 3200,
    isClosed: false,
    createdDate: "2024-12-12",
    createdBy: "Sanjukta Ray",
    currency: "INR",
    description: "Camping and nature trails",
    memberList: [
      { name: "Sanjukta Ray", phoneNumber: "9567890987", contribution: 1067 },
      { name: "Prosenjit Das", phoneNumber: "8567890987", contribution: 1067 },
      { name: "Anindita Bose", phoneNumber: "7567890987", contribution: 1066 },
    ],
  },
  {
    id: 18,
    name: "Cooch Behar Palace Tour",
    budget: 4200,
    totalExpense: 3950,
    isClosed: true,
    createdDate: "2024-08-28",
    createdBy: "Siddhartha Kar",
    currency: "INR",
    description: "Royal palace and Madan Mohan temple",
    memberList: [
      { name: "Siddhartha Kar", phoneNumber: "9678900987", contribution: 988 },
      {
        name: "Anwesha Majumdar",
        phoneNumber: "8678900987",
        contribution: 988,
      },
      { name: "Debjit Sen", phoneNumber: "7678900987", contribution: 987 },
      { name: "Priyanka Roy", phoneNumber: "6678900987", contribution: 987 },
    ],
  },
  {
    id: 19,
    name: "Tajpur Beach Escape",
    budget: 2600,
    totalExpense: 2400,
    isClosed: false,
    createdDate: "2024-12-02",
    createdBy: "Ratnadeep Basu",
    currency: "INR",
    description: "Red crab beach and quiet resort",
    memberList: [
      { name: "Ratnadeep Basu", phoneNumber: "9789010987", contribution: 800 },
      {
        name: "Mohua Chatterjee",
        phoneNumber: "8789010987",
        contribution: 800,
      },
      { name: "Chiranjit Das", phoneNumber: "7789010987", contribution: 800 },
    ],
  },
  {
    id: 20,
    name: "Ayodhya Hills Trek",
    budget: 5100,
    totalExpense: 4800,
    isClosed: true,
    createdDate: "2024-09-18",
    createdBy: "Arindam Pal",
    currency: "INR",
    description: "Trekking and tribal village visit",
    memberList: [
      { name: "Arindam Pal", phoneNumber: "9890120987", contribution: 1200 },
      {
        name: "Sohini Banerjee",
        phoneNumber: "8890120987",
        contribution: 1200,
      },
      { name: "Tapas Roy", phoneNumber: "7890120987", contribution: 1200 },
      { name: "Ruma Devi", phoneNumber: "6890120987", contribution: 1200 },
    ],
  },
  {
    id: 21,
    name: "Mayapur Spiritual Tour",
    budget: 2100,
    totalExpense: 1950,
    isClosed: false,
    createdDate: "2024-11-22",
    createdBy: "Gautam Saha",
    currency: "INR",
    description: "ISKCON temple and Ganga Aarti",
    memberList: [
      { name: "Gautam Saha", phoneNumber: "9901230987", contribution: 488 },
      { name: "Soma Ghosh", phoneNumber: "8901230987", contribution: 488 },
      { name: "Biswanath Sen", phoneNumber: "7901230987", contribution: 487 },
      { name: "Kalyani Das", phoneNumber: "6901230987", contribution: 487 },
    ],
  },
  {
    id: 22,
    name: "Mukutmanipur Dam Picnic",
    budget: 3300,
    totalExpense: 3100,
    isClosed: true,
    createdDate: "2024-10-08",
    createdBy: "Sanjib Kumar",
    currency: "INR",
    description: "Boating and lakeside camp",
    memberList: [
      { name: "Sanjib Kumar", phoneNumber: "9012340987", contribution: 775 },
      { name: "Rina Mondal", phoneNumber: "8012340987", contribution: 775 },
      { name: "Pradip Biswas", phoneNumber: "7012340987", contribution: 775 },
      { name: "Mina Halder", phoneNumber: "6012340987", contribution: 775 },
    ],
  },
  {
    id: 23,
    name: "Gopalpur Beach Weekend",
    budget: 4500,
    totalExpense: 4200,
    isClosed: false,
    createdDate: "2024-12-14",
    createdBy: "Subhajit Sinha",
    currency: "INR",
    description: "Odisha coast and lighthouse",
    memberList: [
      { name: "Subhajit Sinha", phoneNumber: "9123460987", contribution: 1400 },
      { name: "Srimoyee Dutta", phoneNumber: "8123460987", contribution: 1400 },
      { name: "Parimal Sen", phoneNumber: "7123460987", contribution: 1400 },
    ],
  },
  {
    id: 24,
    name: "Jhargram Tribal Festival",
    budget: 3800,
    totalExpense: 3550,
    isClosed: true,
    createdDate: "2024-08-20",
    createdBy: "Bhaskar Rao",
    currency: "INR",
    description: "Folk dance and forest stay",
    memberList: [
      { name: "Bhaskar Rao", phoneNumber: "9234570987", contribution: 1183 },
      { name: "Jaya Banerjee", phoneNumber: "8234570987", contribution: 1183 },
      { name: "Ashoke Mitra", phoneNumber: "7234570987", contribution: 1184 },
    ],
  },
  {
    id: 25,
    name: "Siliguri Tea Auction Visit",
    budget: 6200,
    totalExpense: 5850,
    isClosed: false,
    createdDate: "2024-11-30",
    createdBy: "Debasish Guha",
    currency: "INR",
    description: "Tea tasting and Mahananda wildlife",
    memberList: [
      { name: "Debasish Guha", phoneNumber: "9345680987", contribution: 1462 },
      { name: "Chandana Roy", phoneNumber: "8345680987", contribution: 1462 },
      { name: "Arabinda Das", phoneNumber: "7345680987", contribution: 1463 },
      { name: "Payel Sharma", phoneNumber: "6345680987", contribution: 1463 },
    ],
  },
];

const bgColors = [
  // Warm Reds/Pinks
  "#F4E4E0", // Blush cream
  //   "#F5E1DD", // Rose cream
  //   "#F2DDD8", // Dusty rose cream

  // Peach/Orange
  "#F5E5D8", // Peach cream
  //   "#F4E0D0", // Apricot cream
  //   "#F3DCC8", // Soft tangerine cream

  // Yellow/Gold
  "#F5EDD8", // Butter cream
  //   "#F4E8CE", // Pale gold
  //   "#F3E5C8", // Vanilla cream

  // Green
  "#EBE8D8", // Sage cream
  //   "#E6E6D8", // Pistachio cream
  //   "#E2E5D8", // Mint cream

  // Blue
  "#E0E5E8", // Sky cream
  //   "#DCE4E8", // Powder blue cream
  //   "#D8E2E8", // Ice blue cream

  // Purple/Lavender
  "#E8E2E8", // Lavender cream
  //   "#E8DEE5", // Lilac cream
  //   "#E8DCE8", // Mauve cream

  // Neutral/Beige (transition colors)
  "#EDE8DF", // Warm beige
  //   "#E8E3DA", // Cool beige
];

export default function SplitSpacesList({ allSpaceInfo, setActiveSplitSpace }) {
  return (
    <>
      <div className="text-[#fff] w-full max-h-[100vh] font-[geist] select-none ">
        <div className="text-[#fff] w-full h-full overflow-y-scroll">
          <div className="px-[20px] w-full h-[60px] bg-[#000000] border-b-[1.5px] border-[#181818] flex justify-center items-center sticky top-0 ">
            <input
              className="w-full h-[45px] bg-[#18181800] rounded-xl outline-none placeholder:text-[#797979]"
              placeholder="Search here"
            ></input>
          </div>
          <div className="grid grid-cols-2 gap-2 grid-flow-row-dense p-[20px] ">
            {allSpaceInfo?.map((data) => {
              return (
                <>
                  <div
                    className="w-[100%] h-auto bg-[#181818] rounded-lg flex flex-col justify-start items-start pt-[10px] px-[15px] pb-[15px]"
                    onClick={(e) => {
                      setActiveSplitSpace(data?.spaceName?.toLowerCase());
                    }}
                  >
                    <div className="w-full flex justify-between items-center font-[600] text-[16px]">
                      <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                        {data?.spaceName}
                      </div>
                    </div>
                    <div className="w-full flex justify-start items-center mt-[10px]">
                      {data?.members?.map((memberData, index) => {
                        return (
                          <div
                            className={
                              ` text-[#000000] border-[4px] border-[#181818] rounded-full w-[35px] h-[35px] flex justify-center items-center font-[800] text-[12px]` +
                              (index === 0 ? " ml-[0px]" : " ml-[-20px]")
                            }
                            key={index}
                            style={{
                              backgroundColor: `${bgColors[index]}`,
                            }}
                          >
                            {memberData
                              ?.split(" ")[0]
                              ?.charAt(0)
                              ?.toUpperCase()}
                            {memberData
                              ?.split(" ")
                              ?.pop()
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
            {/* <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div>
            <div className="w-[100%] h-[100px] bg-[#181818] rounded-lg"></div> */}
          </div>
        </div>
      </div>
    </>
  );
}
