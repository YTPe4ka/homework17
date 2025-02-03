import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import "./Groups.css"
const GroupDetails = () => {
  const { groupID } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]); 
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, setIsPending] = useState("");
  
  
  
  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          "https://nt-shopping-list.onrender.com/api/groups",
          {
            headers: {
              "x-auth-token": localStorage.getItem("token") ,
            },
          }
        );
        console.log("API Response:", response.data);
        
        console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggg",response);
        
        let resGroup = response.data.find((val) => val._id === groupID);
        if (resGroup) {
          setGroup(resGroup);
          setMembers(resGroup.members); 
          setItems(resGroup.items); 
        } else {
          console.error("Group not found for ID:", groupID);
          console.log("yamitokudassssssssaaaaaaaaaaayyyyyyyyyyyy",groupID);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
        
      }
    })();
  }, [groupID]);


  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          `https://nt-shopping-list.onrender.com/api/groups/${groupID}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("GroupID LOG BRO NAH I'D WIN :>", response);
        let resGroup = response.data; 
        if (resGroup && resGroup._id === groupID) {
          setGroup(resGroup);
          setMembers(resGroup.members || []); 
          setItems(resGroup.items   || []); 
        } else {
          console.log("Group not found for ID:", groupID);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    })();
  }, [groupID]);
  
  
  
  
  
  
  
  const createItem = async (e) => {
    e.preventDefault();
    setInputValue("");
    setIsPending(true);
    const title = e.target[0].value;
    const groupId = groupID;
    const token = localStorage.getItem("token");
    try {
      setIsPending(false);
      const response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/items",
        { title, groupId },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
        
      );
      setItems((prevItems) => [...prevItems, response.data.item]);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  
  const delItem = async (id) => {
    setIsPending(id);
    try {
      const res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ddididididididi", res);
      if (res.status === 200) {
        setItems((prevItems) => prevItems.filter((val) => val._id !== id));
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsPending(false);
    }
  };
  
  
  
  
  
  
  
  // if (!groupID) {
  //   console.error("groupID is missing!");
  //   return;
  // }
  
  
  
  console.log("Extracted groupID:", groupID);
  console.log("УРАААААААААААААААААААААААААААА", group);
  
  return (
    // <div className="GroupDetail">
    //   <h1>{group.name}</h1>
    //   <p>{group.items}</p>
    //   <ul>
    //     {group.members > 0 ? (
    //       members.map((member) => (
    //         <li key={group?.member._id}>{member?.name}</li>
    //       ))
    //     ) : (
    //       <li>No members found</li>
    //     )}
    //   </ul>
    // </div>
<>
      <section className="Items">
        <div className="GroupDetail">
        <h2>{group?.name}</h2>
      <div className="ustoz">
        
      <h3>Items: <span>{items.length}</span></h3>
      <form action="#" className="ustoz" onSubmit={createItem}>
      <input type="text" className="input" /> <button className="btn3">+</button>
      </form>
      
      </div>
      <ul>
        {items?.map((items) => (
          <li key={items?._id}>
            <span className="item-title">{items?.title}<button className="btn1">Buy</button><button className="btn2" onClick={() =>delItem(items?._id)}>{isPending === items._id ? "..." : "delete"}</button></span>
          </li>
        ))}
      </ul>
      </div>
      </section>
      <section className="Member">
        <div className="GroupDetail">
      <h2>{group?.name}</h2>
      <h3>Members:<span>{members.length}</span> <p className="owner">owner:{group?.owner.username}</p></h3>
      <ul>
        {members?.map((member) => (
          <li key={member._id}>{member.name}</li>
        ))}
      </ul>
      </div>
      </section>
    </>
  );
};

export default GroupDetails;
