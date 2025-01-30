import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Sidebar.css"
function Sidebar() {
  const [groups, setGroups] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Register firstfull')
          return; 
        }

        const response = await axios.get('https://nt-shopping-list.onrender.com/api/groups', {
          headers: {
            'x-auth-token': token,
          },
        });

        console.log('Groups data:', response.data); 
        setGroups(response.data); 
      } catch (error) {
        console.error('error in loading group', error);
      } finally {
        setIsLoading(false); 
      }
    };
    

    fetchGroups();
  }, []); 

  return (
    <aside className="sidebar">
      <ul>
        {isLoading ? (
          <li>Loading groups...</li>
        ) : (
          groups.length > 0 ? (
            groups.map((group) => (
              <li key={group._id}>
                <Link to={`/home/group/${group._id}`}>{group.name}</Link>
              </li>
            ))
          ) : (
            <li>No groups available</li>
          )
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
