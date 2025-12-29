import React, { useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Eye, EyeOff } from "lucide-react";
import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
// import { toolbarItems } from "../../utils/constant";
// import { processStringEncrypt } from "../../utils/functions";
// import { formatDate } from "../../utils/functionsConstant";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameField, setNameField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [errorInfo, setErrorInfo] = useState({
    Name: false,
    email: false,
    password: false,
    errorDetails: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    statusInitial: "Validating login credentials ...",
    error: false,
    statusError: "Oops ! Invalid login credentials",
    success: false,
    statusSuccess: "Credentials validated ! Redirecting ...",
  });

  const provider = new GoogleAuthProvider();

  // ---------- Function to format the given name Properly
  function formattedName() {
    let words = name.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
  }

  // ---------- Function to get a proper formatted date -> Date Month, Year ; with time -> Hour : Minute AM/PM
  function formatDateTime(dateTimeStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const suffixes = ["st", "nd", "rd", "th"];

    const dateObj = new Date(dateTimeStr);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const hour = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const period = dateObj.getHours() >= 12 ? "PM" : "AM";

    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      return suffixes[(day % 10) - 1] || "th";
    };

    return {
      Date: `${day}${getDaySuffix(day)} ${month}, ${year}`,
      Time: `${hour}:${minutes} ${period}`,
    };
  }

  // ---------- Function to create user space in Firebase
  function createUserCollection(user) {
    let tempCreationTime = formatDateTime(new Date().toLocaleString());
    let nameAfterFormating = formattedName();

    // ---------- Adding user to allUsers List
    db.collection("allUsers")
      .doc("allUsers")
      .update({
        allUsers: arrayUnion({
          name: nameAfterFormating,
          email: email,
          phoneNo: "",
          password: password,
          photoURL: "",
          userID: user?.uid,
        }),
      });

    // ---------- Creating User Space
    db.collection("userSpace").doc(user.uid).set({
      name: nameAfterFormating,
      email: email,
      phoneNo: "",
      password: password,
      photoURL: "",
      userID: user?.uid,
      theme: false,
      showDateWiseGrouped: true,
    });

    // ---------- Inside User Space creating All Transaction Space
    db.collection("userSpace")
      .doc(user.uid)
      .collection("AllTransactionsSpace")
      .doc("AllTransactions")
      .set({
        AllTransactions: [],
      });

    // ---------- Inside User Space creating All Transaction Space
    db.collection("userSpace")
      .doc(user.uid)
      .collection("AllTransactionsSpace")
      .doc("SplitTransactions")
      .set({
        splitSpaceInfo: [],
      });

    db.collection("userSpace")
      .doc(user.uid)
      .collection("AllTransactionsSpace")
      .doc("AllSplitSpaceName")
      .set({
        AllSplitSpaceName: [],
      });

    db.collection("userSpace")
      .doc(user.uid)
      .collection("AllTransactionsSpace")
      .doc("Banks")
      .set({
        AllBanks: [],
        activeBankCode: "",
      });

    console.log(
      `%cYou have successfuly %cSigned Up%c !\n%cUserID :%c ${user?.uid}\n%cName :%c ${nameAfterFormating}\n%cEmail :%c ${email}`,
      "color: #21da0f;",
      "color: #21da0f; font-weight: bold;",
      "color: #21da0f;",
      "color: #ffffff; font-weight: bold;",
      "color: #ffffff;",
      "color: #ffffff; font-weight: bold;",
      "color: #ffffff;",
      "color: #ffffff; font-weight: bold;",
      "color: #ffffff;"
    );
    navigateToLoggedInPage(user.uid);
  }

  // const signUp = () => {
  //   const letterPattern = /[a-zA-Z]/;
  //   // e.preventDefault();
  //   if (name.length == 0) {
  //     setError("Name can't be empty");
  //   } else if (email.length === 0 || !email.includes("@gmail.com")) {
  //     setError("Email must contain '@gmail.com'");
  //   } else if (password.length < 8) {
  //     setError("Password should be atleast 8 characters");
  //   } else {
  //     createUserWithEmailAndPassword(
  //       auth,
  //       email.trim().split("@gmail.com")[0] + ".splitwise@gmail.com",
  //       password
  //     )
  //       .then((userCredential) => {
  //         // console.log(userCredential.user.uid);
  //         // console.log(userCredential.user.email);
  //         // console.log(userCredential);
  //         createUserCollection(userCredential.user);
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "%cOops, %cEmail already in use%c !",
  //           "color: red;",
  //           "color: red; font-weight: bold;",
  //           "color: red;"
  //         );
  //         setError("Oops! Email already in use");
  //       });
  //   }
  // };

  const signUp = () => {
    const letterPattern = /[a-zA-Z]/;

    let obj = errorInfo;

    if (
      email?.toLowerCase()?.includes("@gmail.com") &&
      password?.length >= 8 &&
      name.length > 0
    ) {
      setLoading((prev) => ({
        ...prev,
        state: true,
      }));
    }

    if (name.length == 0) {
      obj = {
        Name: true,
        email: obj.email,
        password: obj.password,
        errorDetails: "",
      };
    }
    if (!email?.toLowerCase()?.includes("@gmail.com")) {
      obj = {
        Name: obj.Name,
        email: true,
        password: obj.password,
        errorDetails: "",
      };
    }
    if (password?.length < 8) {
      obj = {
        Name: obj.Name,
        email: obj.email,
        password: true,
        errorDetails: "",
      };
    }

    if (
      email?.toLowerCase()?.includes("@gmail.com") &&
      password?.length >= 8 &&
      name.length > 0
    ) {
      createUserWithEmailAndPassword(
        auth,
        email.trim().split("@gmail.com")[0] + ".splitwise@gmail.com",
        password
      )
        .then((userCredential) => {
          setLoading((prev) => ({
            ...prev,
            success: true,
          }));
          createUserCollection(userCredential.user);
        })
        .catch((error) => {
          setErrorInfo({
            name: false,
            email: false,
            password: false,
            errorDetails: "Oops! Invalid Login Credentials",
          });
          setLoading((prev) => ({
            ...prev,
            error: true,
          }));

          setTimeout(() => {
            setLoading((prev) => ({
              ...prev,
              state: false,
              error: false,
            }));
          }, 1500);
        });
    }

    setErrorInfo(obj);
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In Success");
        console.log("User ID:", user.uid);
        console.log("Email:", user.email);

        // Optionally, create a user collection in your database
        createUserCollection(user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        setError("Google Sign-In failed");
      });
  };

  const navigate = useNavigate();
  function navigateToSection() {
    navigate(`/user/login`);
  }

  function navigateToLoggedInPage(id) {
    navigate(`/user/welcomeUser/user?ID=${id}`);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        console.log("We are verifying details !");
        signUp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-[100svh] flex justify-center items-center font-[geist]">
      <div
        className="w-full lg:w-[400px] md:w-[400px] p-[40px] py-[20px] rounded-none md:rounded-xl lg:rounded-xl min-h-[100svh] md:min-h-[75%] lg:min-h-[75%]  flex flex-col justify-center md:justify-center lg:justify-center items-start bg-[white] px-[50px] text-[14px] max-h-full md:max-h-[100%] lg:max-h-[100%]"
        // style={{ zIndex: "0" }}
      >
        <div
          style={{ zIndex: "10" }}
          className="w-full flex justify-center items-center mb-[30px]"
        >
          <button
            className="w-[80px] h-[80px] p-[13px] rounded-lg bg-[#f7f7f7]"
            onClick={() => {
              // navigateToHome();
            }}
          >
            {/* <img src={logo} className=" w-full h-full object-fill "></img> */}
          </button>
        </div>
        <div
          style={{ zIndex: "10" }}
          className="text-[30px] mb-[5px] w-full flex justify-center font-[600]"
        >
          Hey , join us today!
        </div>
        <div
          style={{ zIndex: "10" }}
          className=" w-full flex justify-center items-center text-[#00000078] mb-[20px]"
        >
          Already have an account ?{" "}
          <button
            className="px-[3px] mx-[2px] text-[black] cursor-pointer"
            onClick={() => {
              navigateToSection();
            }}
          >
            Log In here
          </button>
        </div>

        <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[20px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (nameField || name.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[13px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px] flex justify-center items-center px-[3px] text-[#0000004d]" +
                (nameField || name.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: nameField || name.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Name
            </div>
          </div>
          <input
            id="nameField"
            className="w-full h-[40px] border-[1px] border-[#d5d5d500] rounded-lg bg-transparent px-[12px] "
            style={{
              zIndex: "5",
              outline: errorInfo?.name
                ? "2px solid #ce3d00"
                : "1px solid #d5d5d5" /* Force an outline */,
              outlineOffset: "0px",
            }}
            value={name}
            onChange={(e) => {
              if (errorInfo?.name) {
                setErrorInfo({
                  Name: false,
                  email: errorInfo?.email,
                  password: errorInfo?.password,
                  errorDetails: "",
                });
              }
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (name.length == 0) {
                  console.log("Please enter your name !");
                  document.getElementById("nameField").focus();
                } else if (email.length == 0) {
                  console.log("Please enter your email !");
                  document.getElementById("emailField").focus();
                } else if (password.length == 0) {
                  console.log("Please choose any password !");
                  document.getElementById("passwordField").focus();
                } else if (
                  name.length > 0 &&
                  email.length > 0 &&
                  password.length > 0
                ) {
                  console.log("We are processing the details !");
                  signUp();
                }

                // signUp();
              }
            }}
            onFocus={() => {
              setNameField(true);
            }}
            onBlur={() => {
              setNameField(false);
            }}
          ></input>
        </div>
        <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[15px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (emailField || email.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[13px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px]  flex justify-center items-center px-[3px] text-[#0000004d]" +
                (emailField || email.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: emailField || email.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Email
            </div>
          </div>
          <input
            id="emailField"
            className="w-full h-[40px] border-[1px] border-[#d5d5d500] rounded-lg bg-transparent px-[12px]"
            style={{
              zIndex: "5",
              outline: errorInfo?.email
                ? "2px solid #ce3d00"
                : "1px solid #d5d5d5" /* Force an outline */,
              outlineOffset: "0px",
            }}
            value={email}
            onChange={(e) => {
              if (errorInfo?.email) {
                setErrorInfo({
                  Name: errorInfo?.Name,
                  email: false,
                  password: errorInfo?.password,
                  errorDetails: "",
                });
              }
              setEmail(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (name.length == 0) {
                  console.log("Please enter your name !");
                  document.getElementById("nameField").focus();
                } else if (email.length == 0) {
                  console.log("Please enter your email !");
                  document.getElementById("emailField").focus();
                } else if (password.length == 0) {
                  console.log("Please choose any password !");
                  document.getElementById("passwordField").focus();
                } else if (
                  name.length > 0 &&
                  email.length > 0 &&
                  password.length > 0
                ) {
                  console.log("We are processing the details !");
                  signUp();
                }

                // signUp();
              }
            }}
            onFocus={() => {
              setEmailField(true);
            }}
            onBlur={() => {
              setEmailField(false);
            }}
          ></input>
        </div>
        <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[15px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (passwordField || password.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[13px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px]  flex justify-center items-center px-[3px] text-[#0000004d]" +
                (passwordField || password.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: passwordField || password.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Password
            </div>
          </div>
          <div
            className="w-full h-[40px]  bg-transparent flex justify-start items-center "
            style={{ zIndex: "5" }}
          >
            <input
              id="passwordField"
              className="w-full h-[40px] border-[1px] border-[#d5d5d500] rounded-lg bg-transparent px-[12px]"
              style={{
                zIndex: "5",
                outline: errorInfo?.password
                  ? "2px solid #ce3d00"
                  : "1px solid #d5d5d5" /* Force an outline */,
                outlineOffset: "0px",
              }}
              value={password}
              type={!showPass ? "password" : "text"}
              onChange={(e) => {
                if (errorInfo?.password) {
                  setErrorInfo({
                    Name: errorInfo?.Name,
                    email: errorInfo?.email,
                    password: false,
                    errorDetails: "",
                  });
                }
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (name.length == 0) {
                    console.log("Please enter your name !");
                    document.getElementById("nameField").focus();
                  } else if (email.length == 0) {
                    console.log("Please enter your email !");
                    document.getElementById("emailField").focus();
                  } else if (password.length == 0) {
                    console.log("Please choose any password !");
                    document.getElementById("passwordField").focus();
                  } else if (
                    name.length > 0 &&
                    email.length > 0 &&
                    password.length > 0
                  ) {
                    console.log("We are processing the details !");
                    signUp();
                  }

                  // signUp();
                }
              }}
              onFocus={() => {
                setPasswordField(true);
              }}
              onBlur={() => {
                setPasswordField(false);
              }}
            ></input>
            <button
              className="w-[40px] h-full ml-[-40px] flex justify-center items-center cursor-pointer z-20"
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? (
                <EyeOff width={15} height={15} strokeWidth={1.7} />
              ) : (
                <Eye width={15} height={15} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
        <div
          className={
            "w-full flex justify-end items-center text-[12px] mt-[5px] text-[#ff3b00]" +
            (error.length > 0 ? " flex" : " hidden")
          }
        >
          <div>{error} *</div>
        </div>

        {/* <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[20px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (nameField || name.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[14px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px]  flex justify-center items-center px-[3px] text-[#9ba6aa]" +
                (nameField || name.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: nameField || name.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Name
            </div>
          </div>
          <input
            className="w-full h-[40px] border-[1.5px] border-[#ededed] rounded-lg bg-transparent px-[12px] outline-none "
            style={{ zIndex: "5" }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onFocus={() => {
              setNameField(true);
            }}
            onBlur={() => {
              setNameField(false);
            }}
          ></input>
        </div>
        <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[15px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (emailField || email.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[14px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px]  flex justify-center items-center px-[3px] text-[#9ba6aa]" +
                (emailField || email.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: emailField || email.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Email
            </div>
          </div>
          <input
            className="w-full h-[40px] border-[1.5px] border-[#ededed] rounded-lg bg-transparent px-[12px] outline-none "
            style={{ zIndex: "5" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onFocus={() => {
              setEmailField(true);
            }}
            onBlur={() => {
              setEmailField(false);
            }}
          ></input>
        </div>
        <div className="w-full h-[40px] flex flex-col justify-start items-start mt-[15px] ">
          <div
            className={
              "w-full min-h-full max-h-full mb-[-40px] flex items-start justify-start pl-[10px] " +
              (passwordField || password.length > 0
                ? " pt-[0px] text-[11px]"
                : " pt-[20px] text-[14px]")
            }
            style={{ transition: ".3s" }}
          >
            <div
              className={
                "bg-[#ffffff] h-[4px] mt-[-2px]  flex justify-center items-center px-[3px] text-[#9ba6aa]" +
                (passwordField || password.length > 0 ? " z-[10]" : " z-[0]")
              }
              style={{
                zIndex: passwordField || password.length > 0 ? "100" : "0",
                // transition: ".3s",
              }}
            >
              Password
            </div>
          </div>
          <div
            className="w-full h-[40px]  bg-transparent flex justify-start items-center "
            style={{ zIndex: "5" }}
          >
            <input
              className="w-full h-[40px] border-[1.5px] border-[#ededed] rounded-lg bg-transparent px-[12px] pr-[52px] outline-none "
              style={{ zIndex: "5" }}
              value={password}
              type={!showPass ? "password" : "text"}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onFocus={() => {
                setPasswordField(true);
              }}
              onBlur={() => {
                setPasswordField(false);
              }}
            ></input>
            <div
              className="w-[40px] h-full ml-[-40px] flex justify-center items-center cursor-pointer z-20"
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? (
                <EyeOff width={15} height={15} strokeWidth={1.9} />
              ) : (
                <Eye width={15} height={15} strokeWidth={1.9} />
              )}
            </div>
          </div>
        </div>
        <div
          className={
            "w-full flex justify-end items-center text-[12px] mt-[5px] text-[#ff3b00]" +
            (error.length > 0 ? " flex" : " hidden")
          }
        >
          <div>{error} *</div>
        </div> */}

        {/* <div
          className="w-full h-[40px] mt-[30px] rounded-lg bg-[#27344c] text-[white] text-[14px] flex justify-center items-center cursor-pointer"
          onClick={() => {
            signUp();
          }}
        >
          Sign Up
        </div> */}

        <div
          style={{ zIndex: "10" }}
          className="w-full h-[40px] mt-[30px] rounded-lg font-[500] tracking-wider bg-[#000000] hover:bg-[#252525] text-[white] text-[14px] flex justify-center items-center cursor-pointer"
          onClick={() => {
            signUp();
          }}
        >
          Sign Up
        </div>

        <div className="w-full h-[40px] mt-[0px] rounded-lg text-[12px] flex justify-between items-center text-[#9ba6aa]">
          <div className="w-[calc((100%-40px)/2)] border-t-[1.5px] border-t-[#ededed]"></div>
          <div className="">or</div>
          <div className="w-[calc((100%-40px)/2)] border-t-[1.5px] border-t-[#ededed]"></div>
        </div>
        <div
          style={{ zIndex: "10" }}
          className="w-full h-[40px] border-[1.5px] border-[#ededed] rounded-lg bg-transparent px-[12px] flex justify-center items-center  cursor-pointer"
          onClick={() => {
            signUpWithGoogle();
          }}
        >
          <span>
            <FcGoogle className="text-[18px] mr-[10px]" />
          </span>
          <span>Sign up with Google</span>
        </div>
        <div className="text-[12px] text-center text-[#b3b3b3] mt-[30px] w-full z-[2]">
          You acknowledge that you read, and agree, to our
        </div>
        <div className="text-[12px] text-center text-[#b3b3b3] mt-[0px] w-full z-[2]">
          <button className="text-[#454545] mx-[0px] underline underline-offset-[2px]">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-[#454545] mx-[0px] underline underline-offset-[2px]">
            Privacy Policy
          </button>
          .
        </div>

        {/* <div className="w-full h-[40px] mt-[0px] rounded-lg text-[12px] flex justify-center items-center text-[#9ba6aa]">
          Already have an account ?{" "}
          <span
            className="text-[black] ml-[5px] cursor-pointer"
            onClick={() => {
              navigateToSection();
            }}
          >
            {" "}
            Sign In
          </span>
        </div>

        <div className="w-full h-[40px] mt-[0px] rounded-lg text-[12px] flex justify-between items-center text-[#9ba6aa]">
          <div className="w-[calc((100%-40px)/2)] border-t-[1.5px] border-t-[#ededed]"></div>
          <div className="">or</div>
          <div className="w-[calc((100%-40px)/2)] border-t-[1.5px] border-t-[#ededed]"></div>
        </div>
        <div
          className="w-full h-[40px] border-[1.5px] border-[#ededed] rounded-lg bg-transparent px-[12px] flex justify-center items-center  cursor-pointer"
          onClick={() => {
            signUpWithGoogle();
          }}
        >
          <span>
            <FcGoogle className="text-[18px] mr-[10px]" />
          </span>
          <span>Sign up with Google</span>
        </div> */}
      </div>{" "}
    </div>
  );
}
