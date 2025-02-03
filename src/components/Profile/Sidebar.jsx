import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import "./Sidebar.css"
function Sidebar() {
  const [groups, setGroups] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [Create , setCreate] = useState(false);

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

  const onCreateGroup = async (e) => {
    e.preventDefault();
    let response = await axios.post('https://nt-shopping-list.onrender.com/api/groups',{
      name: e.target[0].value,
      password: e.target[1].value,
    },{
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    if(response.status === 201){
      alert("Group created successfully");
      setCreate(!Create);
    }else{
      alert('Failed to create group');
    }
  }
  
  return (
    <aside className="sidebar">
      <button className="bta" onClick={() => {
        setCreate(!Create);
      }}>{Create ? "Cancel" : "Create" }</button>

      {
        Create? 
        
        <form action="" onSubmit={onCreateGroup}>
          <input type="text" placeholder='Name'  className='odnoitojeo' />
          <input type="password" placeholder='Password' className='odnoitojeo'/>
          <div>
          <button type='submit' className='oncl'>create</button>
          <button onClick={()=>{setCreate(!Create)}} className='oncl'>Cancel</button>
          </div>        
        </form>
        
        
        : ""
      }


      
      <ul className='groups'>
        {isLoading ? (
          <li>Loading groups...</li>
        ) : (
          groups.length > 0 ? (
            groups.map((group) => (
              <li key={group._id}>
                <Link to={`/home/group/${group?._id}`}>{group.name}</Link>
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