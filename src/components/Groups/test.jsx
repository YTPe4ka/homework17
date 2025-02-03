// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Box, Button, Typography } from "@mui/material";
// import "./style.css";
// import { FiPlus } from "react-icons/fi";
// import { AiOutlineClose } from "react-icons/ai";
// import { SlBasket } from "react-icons/sl";

// function GroupDetail() {
//   const { groupID } = useParams();
//   const [group, setGroup] = useState(null);
//   const [members, setMembers] = useState([]); 
//   const [isPending, setIsPending] = useState(false);
//   const [items, setItems] = useState([]);
//   const [inputValue, setInputValue] = useState("");



//   const createItem = async (e) => {
//     e.preventDefault();
//     setInputValue("");
//     setIsPending(true);
//     const title = e.target[0].value;
//     const groupId = groupID;
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         "https://nt-shopping-list.onrender.com/api/items",
//         { title, groupId },
//         {
//           headers: {
//             "x-auth-token": token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setItems((prevItems) => [...prevItems, response.data.item]); 
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const delItem = async (id) => {
//     setIsPending(true); 
//     try {
//       const res = await axios.delete(
//         https://nt-shopping-list.onrender.com/api/items/${id},
//         {
//           headers: {
//             "x-auth-token": localStorage.getItem("token"),
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.status === 200) {
//         setItems((prevItems) => prevItems.filter((val) => val._id !== id));
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsPending(false);
//     }
//   };
