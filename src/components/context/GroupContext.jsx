import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GroupContext = createContext();

function GroupContextCom({ children }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          let response = await axios.get(
            "https://nt-shopping-list.onrender.com/api/groups",
            {
              headers: {
                "x-auth-token": token,
                "Content-Type": "application/json",
              },
            }
          );
          setGroups(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextCom;
