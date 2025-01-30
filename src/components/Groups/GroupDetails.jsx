import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Groups.css"

const GroupDetails = () => {
  const { groupID } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]); 
  const [isPending, setIsPending] = useState(false);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          `https://nt-shopping-list.onrender.com/api/group/${groupID}`,
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data);
        console.log(response);
        
        let resGroup = response.data; 
        if (resGroup && resGroup._id === groupID) {
          setGroup(resGroup);
          setMembers(resGroup.members || []); 
        } else {
          console.error("Group not found for ID:", groupID);
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
    setIsPending(true);
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
      if (res.status === 200) {
        setItems((prevItems) => prevItems.filter((val) => val._id !== id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  
  if (!group) {
    return <p>Loading group details...</p>;
  }
  
  return (
    <div className="GroupDetail">
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      <ul>
        {group.members > 0 ? (
          members.map((member) => (
            <li key={group.member._id}>{member.name}</li>
          ))
        ) : (
          <li>No members found</li>
        )}
      </ul>
    </div>
  );
};

export default GroupDetails;
